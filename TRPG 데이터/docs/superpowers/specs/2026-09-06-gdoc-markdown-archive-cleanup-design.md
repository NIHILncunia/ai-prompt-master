# Google Docs Markdown 전환 및 정비 아카이브 정리 설계

## 목적

남아 있는 Google Docs 3개의 본문을 실제 Markdown 파일로 보존한 뒤 원본 Google Docs를 제거하고, 마스터의 명시 지시에 따라 `작업 정비/정비 아카이브/` 내부를 완전히 비운다.

## 대상

- `_temp_gdoc_scag.gdoc.gdoc` → `_temp_gdoc_scag.md`
- `_temp_gdoc_upload.gdoc.gdoc` → `_temp_gdoc_upload.md`
- `지침  주문(spell) 템플릿.gdoc` → `지침  주문(spell) 템플릿.md`
- `작업 정비/정비 아카이브/` 내부 파일 18개와 하위 폴더 2개

## 처리 원칙

- Google Docs 원문은 커넥터에서 읽고 단일 탭 문서임을 확인한다.
- 변환본은 UTF-8 Markdown으로 작성하고 원본과 같은 Drive 부모 폴더에 `text/markdown`으로 업로드한다.
- 업로드본을 다시 읽어 내용과 MIME 유형을 확인한 뒤에만 원본 Google Docs를 영구 삭제한다.
- 아카이브 안에서 생성한 임시 Markdown 2개는 변환 검증을 마친 뒤 아카이브 전체 정리 범위에 포함한다.
- 아카이브 폴더 자체는 남기고 내부 항목만 제거한다.
- 삭제 사실과 범위를 `작업 정비/작업 정비 현황.md`에 새 완료 이력으로 누적한다.
- `docs/superpowers` 운영 문서와 작업 정비 기록은 아카이브 밖에 두어 삭제 대상과 분리한다.

## 삭제 전 기준선

- 기존 파일: 18개
- 기존 하위 폴더: 2개
- 구성: Markdown 11개, ZIP 2개, Google Docs 플레이스홀더 2개, `desktop.ini` 3개
- `2026-09-03-0138_scag_indexing_update.zip` SHA-256: `D8CE86E62846A5651815ABCDE76C2D886A096F6B2945631290E345F3E86A86F8`
- `작업 정비 및 Superpowers 전역 지침 적용 패치.zip` SHA-256: `99F4ECB1EB9592B7D1B79150FA04FA94F4212EA5CDE03E478EE4C8C161AD64E3`

## 완료 조건

- 루트에 `지침  주문(spell) 템플릿.md`가 존재하고 Drive의 MIME 유형이 `text/markdown`이다.
- Google Docs 원본 3개가 더 이상 존재하지 않는다.
- `작업 정비/정비 아카이브/`가 존재하면서 내부 항목 수가 0이다.
- 작업 정비 현황, 작업별 정비 문서, Superpowers 레지스트리와 검증 보고서가 실제 결과와 일치한다.
