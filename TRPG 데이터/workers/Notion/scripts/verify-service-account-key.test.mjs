import test from 'node:test'
import assert from 'node:assert/strict'
import { generateKeyPairSync } from 'node:crypto'
import { inspectServiceAccountEnv } from './verify-service-account-key.mjs'

function makePrivateKey() {
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 })
  return privateKey.export({ type: 'pkcs8', format: 'pem' }).toString()
}

test('accepts a valid RSA PKCS#8 private key and reports safe metadata only', () => {
  const privateKey = makePrivateKey()
  const env = {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: 'worker@example.iam.gserviceaccount.com',
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: privateKey.replace(/\n/g, '\\n'),
  }
  const result = inspectServiceAccountEnv(env)
  assert.equal(result.emailSet, true)
  assert.equal(result.emailLooksLikeServiceAccount, true)
  assert.equal(result.begin, true)
  assert.equal(result.end, true)
  assert.equal(result.keyType, 'rsa')
  assert.equal(result.error, null)
  assert.equal('privateKey' in result, false)
})

test('rejects malformed private key without echoing the secret', () => {
  const result = inspectServiceAccountEnv({
    GOOGLE_SERVICE_ACCOUNT_EMAIL: 'worker@example.iam.gserviceaccount.com',
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: 'not-a-key',
  })
  assert.equal(result.keyType, null)
  assert.ok(result.error)
  assert.equal('privateKey' in result, false)
})
