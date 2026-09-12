import { createPrivateKey } from 'node:crypto'
import { pathToFileURL } from 'node:url'

export function normalizePrivateKey(value) {
  return String(value ?? '').replace(/\\n/g, '\n').trim()
}

export function inspectServiceAccountEnv(env = process.env) {
  const email = String(env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '').trim()
  const rawKey = String(env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? '')
  const normalizedKey = normalizePrivateKey(rawKey)

  const result = {
    emailSet: email.length > 0,
    emailLooksLikeServiceAccount: email.endsWith('.iam.gserviceaccount.com'),
    rawLength: rawKey.length,
    literalBackslashN: rawKey.includes('\\n'),
    newlineCount: (normalizedKey.match(/\n/g) ?? []).length,
    begin: normalizedKey.startsWith('-----BEGIN PRIVATE KEY-----'),
    end: normalizedKey.endsWith('-----END PRIVATE KEY-----'),
    keyType: null,
    error: null,
  }

  if (!result.emailSet) {
    result.error = 'GOOGLE_SERVICE_ACCOUNT_EMAIL is empty'
    return result
  }

  if (!normalizedKey) {
    result.error = 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is empty'
    return result
  }

  try {
    const key = createPrivateKey(normalizedKey)
    result.keyType = key.asymmetricKeyType ?? null
    if (result.keyType !== 'rsa') {
      result.error = `Expected RSA private key, got ${result.keyType ?? 'unknown'}`
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error)
  }

  return result
}

function printResult(result) {
  console.log('Google service-account credential check')
  console.log(`- emailSet: ${result.emailSet}`)
  console.log(`- emailLooksLikeServiceAccount: ${result.emailLooksLikeServiceAccount}`)
  console.log(`- rawLength: ${result.rawLength}`)
  console.log(`- literalBackslashN: ${result.literalBackslashN}`)
  console.log(`- newlineCount: ${result.newlineCount}`)
  console.log(`- begin: ${result.begin}`)
  console.log(`- end: ${result.end}`)
  console.log(`- keyType: ${result.keyType ?? 'unavailable'}`)
  console.log(`- status: ${result.error ? 'ERROR' : 'OK'}`)
  if (result.error) console.log(`- error: ${result.error}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = inspectServiceAccountEnv(process.env)
  printResult(result)
  process.exitCode = result.error ? 1 : 0
}
