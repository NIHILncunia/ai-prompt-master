import { getServiceAccountAccessToken } from "../dist/google-service-account.js"
import { classifySettingMarkdown } from "../dist/settings-drive.js"

const ROOT = process.env.GOOGLE_SETTINGS_ROOT_FOLDER_ID
if (!ROOT) throw new Error("GOOGLE_SETTINGS_ROOT_FOLDER_ID is required")

const token = await getServiceAccountAccessToken({
	email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
	privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "",
})

async function request(url) {
	const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
	if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`)
	return response
}

async function listChildren(parentId) {
	const all = []
	let pageToken
	do {
		const params = new URLSearchParams({
			q: `'${parentId}' in parents and trashed = false`,
			fields: "nextPageToken,files(id,name,mimeType,parents,modifiedTime)",
			pageSize: "1000",
			includeItemsFromAllDrives: "true",
			supportsAllDrives: "true",
		})
		if (pageToken) params.set("pageToken", pageToken)
		const data = await (await request(`https://www.googleapis.com/drive/v3/files?${params}`)).json()
		all.push(...(data.files ?? []))
		pageToken = data.nextPageToken
	} while (pageToken)
	return all
}

async function download(fileId) {
	return (await request(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true`)).text()
}

const queue = [{ id: ROOT, path: "" }]
const markdownFiles = []
let folderCount = 0
while (queue.length) {
	const folder = queue.shift()
	folderCount += 1
	for (const file of await listChildren(folder.id)) {
		const relative = folder.path ? `${folder.path}/${file.name}` : file.name
		if (file.mimeType === "application/vnd.google-apps.folder") {
			queue.push({ id: file.id, path: relative })
		} else if (file.mimeType === "text/markdown" || file.name.toLowerCase().endsWith(".md")) {
			markdownFiles.push({ ...file, path: relative })
		}
	}
}

const settings = []
const invalid = []
let cursor = 0
const workers = Array.from({ length: 20 }, async () => {
	while (true) {
		const index = cursor++
		if (index >= markdownFiles.length) return
		const file = markdownFiles[index]
		try {
			const source = await download(file.id)
			const parsed = classifySettingMarkdown(source)
			if (parsed.kind === "setting") {
				settings.push({ path: file.path, fileId: file.id, uuid: parsed.meta.uuid, title: parsed.meta.title })
			}
		} catch (error) {
			invalid.push({ path: file.path, fileId: file.id, error: error instanceof Error ? error.message : String(error) })
		}
	}
})
await Promise.all(workers)

const uuidCounts = new Map()
for (const item of settings) uuidCounts.set(item.uuid, (uuidCounts.get(item.uuid) ?? 0) + 1)
const duplicates = [...uuidCounts].filter(([, count]) => count > 1).map(([uuid, count]) => ({ uuid, count }))
console.log(JSON.stringify({ root: ROOT, folderCount, markdownCount: markdownFiles.length, settingCount: settings.length, invalid, duplicates }, null, 2))
