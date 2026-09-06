# Task 1 Fix Round 1 Review Package
- Fix base: task-1-fix1-before snapshot
- Head: current non-Git workspace after fix round 1

## 1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\정식 스타일 호출 규칙.md
```diff
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\.superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-fix1-before\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\정식 스타일 호출 규칙.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\정식 스타일 호출 규칙.md', LF will be replaced by CRLF the next time Git touches it
```

## .superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-report.md
```diff
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\.superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-fix1-before\.superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-report.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\.superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-report.md', LF will be replaced by CRLF the next time Git touches it
diff --git "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-fix1-before\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-report.md" "b/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-report.md"
index 8d11ebc..93f46d3 100644
--- "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-fix1-before\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-report.md"	
+++ "b/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-report.md"	
@@ -42,10 +42,31 @@
 - 붓터치 반실사 앵커는 얼굴·연령·전신 비례·마감으로 역할을 분리했고, 산출물 조합과 참조 한도 축소 판단을 중앙 문서에만 두었다.
 - 제공 이미지 그림체 보존은 정식 앵커와 두 고정 영어 블록을 자동 삽입하지 않도록 명시했다.
 - 정식 스타일 적용은 실제 픽셀 확인, 마감 앵커 유지, 그림체 블록 뒤의 공통 마감 블록 단일 삽입을 필수로 명시했다.
 - 애니 페인팅은 기존 세 활성 파일과 얼굴·전신·마감 역할을 보존했으며, 이번 작업에서 4앵커 체계로 변환하지 않았다.
 - 스타일 앵커의 인물·의상·팔레트·포즈·카메라·배경·장면 구성 복제를 금지했다.
 
 ## 우려 사항
 
 - 보고서 작성 직전 보관본 SHA-256의 초기 콘솔 출력이 열 너비 때문에 잘려, 잘린 값을 수동 전사한 첫 재검증이 실패했다. 실제 파일을 다시 해시해 정확한 값으로 재검증했으며, 이동 직후의 원본 대비 해시 검증도 통과했다.
 - Task 1 범위 밖의 모듈 루트·공통 승인·점검·내부 1~8번 기능 문서는 수정하지 않았다. 이후 Task에서 중앙 호출 규칙을 해당 문서들에 연결해야 전체 설계의 모듈 전파 기준을 충족한다.
+
+## 수정 라운드 1
+
+### 수정 내용
+
+- 캐릭터 중심 세션 하이라이트의 반실사 조합 적용을 `붓터치 반실사를 명시적으로 선택한 경우`로 한정했다. 제공 이미지가 있고 명시적 정식 스타일 변환 요청이 없으면 `제공 이미지 그림체 보존`을 적용하며 정식 앵커 조합을 적용하지 않는다고 명시했다.
+- 디자인 기준 이미지와 마감 앵커 뒤에 참조 한 자리만 남을 때의 3·4순위 예외를 명시했다. 명시 연령이 미성년·고령이거나 연령 오차가 핵심 위험이면 나이 표현 앵커를 우선하고 주 구도 앵커를 제외하며, 그 밖의 경우에는 주 구도 앵커를 우선한다.
+
+### 검증 명령과 실제 결과
+
+```powershell
+$target = '1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\정식 스타일 호출 규칙.md'
+rg -n -C 2 '붓터치 반실사를 명시적으로 선택한 경우|명시적 정식 스타일 변환 요청이 없는 세션 하이라이트|디자인 기준 이미지와 마감 앵커 뒤에 한 자리만 남고|3·4순위를 뒤집어 나이 표현 앵커를 우선|그 밖의 경우에는 주 구도 앵커를 우선' $target
+$fenceCount = (Select-String -LiteralPath $target -Pattern '^```' -AllMatches).Count
+if (($fenceCount % 2) -ne 0) { throw "코드 펜스 짝이 맞지 않습니다: $fenceCount" }
+```
+
+실제 결과:
+
+- `rg -n -C 2`가 65행의 세션 하이라이트 조건과 75행의 한 자리 참조 예산 예외·기본 규칙을 모두 반환했다.
+- 코드 펜스 검사 결과는 `CODE_FENCES: balanced (0)`이었다.
```
