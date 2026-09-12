import { cpSync, existsSync, mkdtempSync, rmSync } from "node:fs"
import { execFileSync, spawnSync } from "node:child_process"
import { homedir, tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDir, "..")
const stageRoot = mkdtempSync(join(tmpdir(), "notion-worker-deploy-"))

const requiredEntries = [
	"package.json",
	"package-lock.json",
	"tsconfig.json",
	"workers.json",
	"src",
]

function isV9fs(path) {
	if (process.platform === "win32") return false
	try {
		return execFileSync("stat", ["-f", "-c", "%T", path], { encoding: "utf8" }).trim() === "v9fs"
	} catch {
		return false
	}
}

try {
	for (const entry of requiredEntries) {
		const source = join(projectRoot, entry)
		if (!existsSync(source)) {
			throw new Error(`Missing required deployment entry: ${entry}`)
		}
		cpSync(source, join(stageRoot, entry), { recursive: true })
	}

	const env = { ...process.env }
	if (isV9fs(projectRoot)) {
		if (env.NOTION_KEYRING === undefined) env.NOTION_KEYRING = "0"
		if (env.NOTION_HOME === undefined) env.NOTION_HOME = join(homedir(), ".notion")
	}

	console.log(`Staged Notion Worker outside the shared filesystem: ${stageRoot}`)
	const command = process.platform === "win32" ? "ntn.cmd" : "ntn"
	const result = spawnSync(command, ["workers", "deploy", "--no-git", ...process.argv.slice(2)], {
		cwd: stageRoot,
		env,
		stdio: "inherit",
	})

	if (result.error) throw result.error
	if (result.status !== 0) process.exitCode = result.status ?? 1
} finally {
	rmSync(stageRoot, { recursive: true, force: true })
}
