export const DRIVE_FOLDER_MIME = "application/vnd.google-apps.folder"

export type DriveFileMetadata = {
	id: string
	name: string
	mimeType: string
	parents?: string[]
	trashed?: boolean
	modifiedTime?: string
}

export type DriveChange = {
	fileId: string
	removed?: boolean
	file?: DriveFileMetadata
}

type FetchInput = string | URL | Request

type DriveRequestOptions = {
	token: string
	wait: () => Promise<void>
	fetchImpl?: typeof fetch
}

async function requestJson<T>(
	url: string,
	{ token, wait, fetchImpl = fetch }: DriveRequestOptions,
): Promise<T> {
	await wait()
	const response = await fetchImpl(url, {
		headers: { Authorization: `Bearer ${token}` },
	})
	if (!response.ok) {
		const detail = await response.text()
		throw new Error(`Google Drive API failed (${response.status} ${response.statusText}): ${detail}`)
	}
	return (await response.json()) as T
}

export async function listDriveChildren({
	token,
	parentId,
	pageToken,
	pageSize = 25,
	wait,
	fetchImpl = fetch,
}: DriveRequestOptions & {
	parentId: string
	pageToken?: string
	pageSize?: number
}): Promise<{ files: DriveFileMetadata[]; nextPageToken?: string }> {
	const params = new URLSearchParams({
		q: `'${parentId}' in parents and trashed = false`,
		fields: "nextPageToken,files(id,name,mimeType,parents,trashed,modifiedTime)",
		pageSize: String(pageSize),
		includeItemsFromAllDrives: "true",
		supportsAllDrives: "true",
	})
	if (pageToken) params.set("pageToken", pageToken)
	return requestJson(
		`https://www.googleapis.com/drive/v3/files?${params.toString()}`,
		{ token, wait, fetchImpl },
	)
}

export async function downloadDriveText({
	token,
	fileId,
	wait,
	fetchImpl = fetch,
}: DriveRequestOptions & { fileId: string }): Promise<string> {
	await wait()
	const response = await fetchImpl(
		`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true`,
		{ headers: { Authorization: `Bearer ${token}` } },
	)
	if (!response.ok) {
		const detail = await response.text()
		throw new Error(`Google Drive download failed (${response.status} ${response.statusText}): ${detail}`)
	}
	return response.text()
}

export async function getDriveFileMetadata({
	token,
	fileId,
	wait,
	fetchImpl = fetch,
}: DriveRequestOptions & { fileId: string }): Promise<DriveFileMetadata> {
	const params = new URLSearchParams({
		fields: "id,name,mimeType,parents,trashed,modifiedTime",
		supportsAllDrives: "true",
	})
	return requestJson(
		`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?${params.toString()}`,
		{ token, wait, fetchImpl },
	)
}

export async function getDriveStartPageToken({
	token,
	wait,
	fetchImpl = fetch,
}: DriveRequestOptions): Promise<string> {
	const result = await requestJson<{ startPageToken: string }>(
		"https://www.googleapis.com/drive/v3/changes/startPageToken?supportsAllDrives=true",
		{ token, wait, fetchImpl },
	)
	if (!result.startPageToken) throw new Error("Google Drive did not return a start page token")
	return result.startPageToken
}

export async function listDriveChanges({
	token,
	pageToken,
	wait,
	fetchImpl = fetch,
}: DriveRequestOptions & { pageToken: string }): Promise<{
	changes: DriveChange[]
	nextPageToken?: string | null
	newStartPageToken?: string | null
}> {
	const params = new URLSearchParams({
		pageToken,
		pageSize: "100",
		includeItemsFromAllDrives: "true",
		supportsAllDrives: "true",
		fields:
			"nextPageToken,newStartPageToken,changes(fileId,removed,file(id,name,mimeType,parents,trashed,modifiedTime))",
	})
	return requestJson(
		`https://www.googleapis.com/drive/v3/changes?${params.toString()}`,
		{ token, wait, fetchImpl },
	)
}
