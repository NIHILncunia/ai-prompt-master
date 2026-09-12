# 작업 폴더 라우팅 전환 설계

## 목표

기존 Google Drive 작업 폴더를 가리키는 활성 설정 지침과 사용자 전역 지침을 신규 작업 폴더 및 Git 로컬 저장소 기준으로 전환한다.

## 전환 기준

- 작업 폴더 ID: `1U3rtzfeyDNFTYCGpBXIUH7Z5yln7i07V` → `15dR_0fhsY5RwmsJkr18FERKLMvqjTJaH`
- 프롬프트 루트 ID: `1FZ9O-dXplSIQqbFXwLZW2nIJdt-tF7op` → `1PDa8TO0BdKrPaNWTfImJTcYoYY3gpj8N`
- 설정 관련 요청 폴더 ID: `13sjkPbVTM_w5Jcz6pY_G2gq0hY-HGN8S` → `1YFLnQS2k9hcjeEHrDEpSVFQ4dk_Qhj4C`
- 설정 관련 요청 기능 번호: `8번` → `5번`
- Codex CLI 작업 폴더: `G:\내 드라이브\TRPG 데이터` → `C:\Users\nihil\coding\ai\ai-prompt-master\TRPG 데이터`
- 설정 폴더 ID와 로컬 경로는 변경하지 않는다.

## 적용 범위

- 신규 Git 작업 저장소의 현재 활성 라우팅·룰북·설정 지침
- 설정 폴더의 현재 활성 공통·시리즈 지침
- `C:\Users\nihil\.codex\AGENTS.md`
- Codex 메모리의 향후 작업 폴더 라우팅 규칙

## 보존 범위

- 과거 Superpowers 계획·보고서에 기록된 당시 경로
- 메모리의 과거 세션 `cwd`, 당시 산출물 경로와 검증 기록
- 사용자가 진행 중인 설정 문서 변경

## 메모리 처리

메모리 원본은 직접 편집하지 않는다. 새 정본 경로와 ID, 과거 기록 보존 원칙을 `memories/extensions/ad_hoc/notes/`에 수정 요청 노트로 기록한다.

## 완료 조건

- 신규 작업 저장소·활성 설정 지침·사용자 전역 지침에서 기존 작업 폴더 ID 267개가 모두 사라진다.
- 활성 지침에서 기존 CLI 경로와 구 기능 번호가 사라진다.
- 설정 폴더 ID는 그대로 유지된다.
- 과거 계획·보고서와 메모리 이력은 변경하지 않는다.
- 메모리 수정 요청 노트가 생성되고 내용이 검증된다.
