# 이미지 생성 모듈 최종 전환 구 이미지 기능 제거 보고서

## 작업 ID

`2026-08-08-image-generation-module`

## 삭제 전 재검증

삭제 직전 구 이미지 폴더 8개와 백업 폴더 8개를 다시 대조했다.

```text
PREDELETE_BACKUP_MATCH=True
```

각 폴더는 원본·백업 모두 존재했고, 상대 경로별 SHA-256 비교 차이는 0건이었다.

## 신규 포트레이트 프리셋 보정

삭제 전 검증에서 발견한 신규 포트레이트 프리셋의 과거 3D 렌더링 정체성을 보정했다.

| 항목 | 이전 | 이후 |
| --- | --- | --- |
| 프리셋 제목 | `AAA Cinematic 3D Character Render` | `Cinematic Signature Character Portrait` |
| 정체성 | fully three-dimensional promotional render | painterly semi-realistic portrait |
| 직접 프롬프트 | 3D·AAA·2D 금지 강제 | 붓터치·입체 광원·회화적 표면 유지, photorealistic 3D CGI 강제 금지 |

재검사 결과:

```text
LEGACY_PRESET_LOCKS=0
NEW_PRESET_CONTRACT_MATCHES=2
```

## 제거 대상

다음 8개 구 이미지 기능 폴더를 `1. 프롬프트` 루트에서 제거했다.

- `1. 포트레이트 생성 프롬프트`
- `2. 배틀맵 생성 프롬프트`
- `3. 캐릭터 레퍼런스 시트 생성 프롬프트`
- `5. 세션 하이라이트 이미지 생성 프롬프트`
- `10. 토큰 프레임 생성 프롬프트`
- `12. 풍경 일러스트 생성 프롬프트`
- `13. 게임 아이콘 생성 프롬프트`
- `14. 월드 지도 생성 프롬프트`

## 삭제 후 검증

```text
DELETED_TARGETS=8
LEGACY_REMAINING=0
NEW_IMAGE_MODULE_PRESENT=True
```

삭제 뒤 프롬프트 루트에는 신규 `1. 이미지 생성 모듈`, 비이미지 기능 4·6·7·8·9·11·15번, `공통`, `보관`만 남아 있다.

## 복구 가능성

제거한 8개 폴더의 검증된 백업은 다음 경로에 유지한다.

`TRPG 데이터/docs/superpowers/backups/2026-08-08-image-generation-module-final-cutover/`

## 판정

Task 4의 구 이미지 기능 폴더 제거를 완료했다. 다음 Task 5에서는 남은 비이미지 기능 7개를 2~8번으로 일괄 재번호한다.
