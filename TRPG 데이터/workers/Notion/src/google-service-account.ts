import { createSign } from "node:crypto"

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
const DRIVE_READONLY_SCOPE = "https://www.googleapis.com/auth/drive.readonly"
const JWT_BEARER_GRANT = "urn:ietf:params:oauth:grant-type:jwt-bearer"

export function normalizePrivateKey(value: string): string {
  return value.replace(/\\n/g, "\n")
}

function base64Url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url")
}

export function createServiceAccountJwt({
  email,
  privateKey,
  now = Math.floor(Date.now() / 1000),
}: {
  email: string
  privateKey: string
  now?: number
}): string {
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const payload = base64Url(
    JSON.stringify({
      iss: email,
      scope: DRIVE_READONLY_SCOPE,
      aud: GOOGLE_TOKEN_ENDPOINT,
      iat: now,
      exp: now + 3600,
    }),
  )

  const unsigned = `${header}.${payload}`
  const signer = createSign("RSA-SHA256")
  signer.update(unsigned)
  signer.end()
  const signature = signer.sign(normalizePrivateKey(privateKey))

  return `${unsigned}.${base64Url(signature)}`
}

export async function getServiceAccountAccessToken({
  email,
  privateKey,
  now,
  fetchImpl = fetch,
}: {
  email: string
  privateKey: string
  now?: number
  fetchImpl?: typeof fetch
}): Promise<string> {
  if (!email.trim()) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL is required")
  }
  if (!privateKey.trim()) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is required")
  }

  const assertion = createServiceAccountJwt({ email, privateKey, now })
  const body = new URLSearchParams({
    grant_type: JWT_BEARER_GRANT,
    assertion,
  })

  const response = await fetchImpl(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  })

  const data = (await response.json()) as {
    access_token?: string
    error?: string
    error_description?: string
  }

  if (!response.ok || !data.access_token) {
    const detail = data.error_description ?? data.error ?? response.statusText
    throw new Error(`Google service-account token exchange failed: ${detail}`)
  }

  return data.access_token
}
