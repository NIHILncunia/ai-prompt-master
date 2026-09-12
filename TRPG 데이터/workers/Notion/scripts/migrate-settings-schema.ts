import { spawnSync } from "node:child_process"
import { buildNativeSettingsSchemaPatch } from "../src/settings-schema.js"

const DEFAULT_DATA_SOURCE_ID = "36679aac-ce3d-464a-9b97-06a133554c75"

function notionCliToken(): string {
	const command = process.platform === "win32" ? "ntn.cmd" : "ntn"
	const env = { ...process.env }
	if (process.platform !== "win32") {
		env.NOTION_HOME ??= "/root/.notion"
		env.NOTION_KEYRING ??= "0"
	}
	const result = spawnSync(command, ["auth", "token"], {
		env,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	})
	if (result.error) throw result.error
	if (result.status !== 0) throw new Error(result.stderr.trim() || "Unable to read Notion CLI token")
	const token = result.stdout.trim()
	if (!token) throw new Error("Notion CLI token is empty")
	return token
}

const dataSourceId =
	process.env.SETTINGS_DATA_SOURCE_ID?.trim() || DEFAULT_DATA_SOURCE_ID
const token = notionCliToken()
const headers = {
	Authorization: `Bearer ${token}`,
	"Content-Type": "application/json",
	"Notion-Version": "2026-03-11",
}
const currentResponse = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}`, { headers })
const current = (await currentResponse.json()) as {
	properties?: Record<string, { name?: string }>
	code?: string
	message?: string
}
if (!currentResponse.ok) {
	throw new Error(`Notion schema read failed (${currentResponse.status}): ${current.code ?? "unknown"} ${current.message ?? ""}`.trim())
}
const existingPropertyNames = new Set(
	Object.values(current.properties ?? {}).map((property) => property.name ?? "").filter(Boolean),
)
const response = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}`, {
	method: "PATCH",
	headers,
	body: JSON.stringify(buildNativeSettingsSchemaPatch(existingPropertyNames)),
})
const data = (await response.json()) as {
	object?: string
	status?: number
	code?: string
	message?: string
	properties?: Record<string, { name?: string; type?: string; select?: { options?: unknown[] } }>
}
if (!response.ok) {
	throw new Error(`Notion schema migration failed (${response.status}): ${data.code ?? "unknown"} ${data.message ?? ""}`.trim())
}
const properties = Object.values(data.properties ?? {})
	.map((property) => ({
		name: property.name ?? "",
		type: property.type ?? "",
		...(property.type === "select"
			? { optionCount: property.select?.options?.length ?? 0 }
			: {}),
	}))
	.sort((a, b) => a.name.localeCompare(b.name, "ko"))
console.log(JSON.stringify({ dataSourceId, properties }, null, 2))
