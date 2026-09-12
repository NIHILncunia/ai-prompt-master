import { spawnSync } from "node:child_process"

const DEFAULT_DATA_SOURCE_ID = "36679aac-ce3d-464a-9b97-06a133554c75"
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function parseArgs(argv) {
	const [command, ...rest] = argv
	const flags = new Map()
	for (let index = 0; index < rest.length; index += 1) {
		const token = rest[index]
		if (!token.startsWith("--")) throw new Error(`Unexpected argument: ${token}`)
		const key = token.slice(2)
		if (key === "yes") {
			flags.set(key, true)
			continue
		}
		const value = rest[index + 1]
		if (!value || value.startsWith("--")) throw new Error(`Missing value for --${key}`)
		flags.set(key, value)
		index += 1
	}
	return { command, flags }
}

function normalizeUuid(value) {
	const normalized = String(value ?? "").trim().toLowerCase()
	if (!UUID_PATTERN.test(normalized)) throw new Error("A valid --uuid is required")
	return normalized
}

function runNtn(args, { capture = false } = {}) {
	const command = process.platform === "win32" ? "ntn.cmd" : "ntn"
	const env = { ...process.env }
	if (process.platform !== "win32") {
		if (env.NOTION_KEYRING === undefined) env.NOTION_KEYRING = "0"
		if (env.NOTION_HOME === undefined && env.HOME) env.NOTION_HOME = `${env.HOME}/.notion`
	}
	const result = spawnSync(command, args, {
		env,
		encoding: "utf8",
		stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
	})
	if (result.error) throw result.error
	if (result.status !== 0) {
		const detail = capture ? `${result.stderr || result.stdout}`.trim() : ""
		throw new Error(`ntn ${args.join(" ")} failed${detail ? `: ${detail}` : ""}`)
	}
	return capture ? result.stdout : ""
}

function dataSourceId(flags) {
	return String(flags.get("data-source") ?? process.env.SETTINGS_DATA_SOURCE_ID ?? DEFAULT_DATA_SOURCE_ID)
}

function queryByUuid(uuid, flags) {
	const filter = JSON.stringify({ property: "UUID", rich_text: { equals: uuid } })
	const raw = runNtn(
		["datasources", "query", dataSourceId(flags), "--filter", filter, "--limit", "2", "--json"],
		{ capture: true },
	)
	return JSON.parse(raw).results ?? []
}

function propertyText(property) {
	const values = property?.title ?? property?.rich_text ?? []
	return Array.isArray(values) ? values.map((item) => item?.plain_text ?? "").join("") : ""
}

function summarize(row) {
	return {
		pageId: row.id,
		uuid: propertyText(row.properties?.UUID),
		title: propertyText(row.properties?.["이름"]),
		category: row.properties?.["카테고리"]?.select?.name ?? "",
		subcategory: row.properties?.["서브카테고리"]?.select?.name ?? "",
		status: propertyText(row.properties?.["상태"]),
	}
}

function requireSingle(uuid, rows) {
	const matches = rows.map(summarize).filter((row) => row.uuid === uuid)
	if (matches.length !== 1) {
		throw new Error(`Expected exactly one setting for UUID ${uuid}, found ${matches.length}`)
	}
	return matches[0]
}

function main() {
	const { command, flags } = parseArgs(process.argv.slice(2))
	if (!command) throw new Error("Command required: find | list | get | delete | resync")

	if (command === "list") {
		runNtn(["datasources", "query", dataSourceId(flags), "--limit", String(flags.get("limit") ?? 100), "--json"])
		return
	}

	const uuid = normalizeUuid(flags.get("uuid"))
	const rows = queryByUuid(uuid, flags)

	if (command === "find") {
		console.log(JSON.stringify(rows.map(summarize), null, 2))
		return
	}

	const target = requireSingle(uuid, rows)
	if (command === "get") {
		runNtn(["pages", "get", target.pageId, "--json"])
		return
	}

	if (command === "delete") {
		if (!flags.get("yes")) {
			console.log(JSON.stringify({ dryRun: true, action: "trash", target }, null, 2))
			console.log("No changes made. Re-run with --yes to execute the deletion.")
			return
		}
		runNtn(["pages", "trash", target.pageId, "--yes"])
		console.log(JSON.stringify({ deleted: true, target }, null, 2))
		return
	}

	if (command === "resync") {
		runNtn(["workers", "sync", "state", "reset", "settingsBackfill"])
		runNtn(["workers", "sync", "trigger", "settingsBackfill", "--json"])
		console.log(`Full settings backfill triggered; verify UUID ${uuid} after completion.`)
		return
	}

	throw new Error(`Unknown command: ${command}`)
}

try {
	main()
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error))
	process.exitCode = 1
}
