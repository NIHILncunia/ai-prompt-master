-- PostgreSQL 초기 시드
-- 이 스크립트는 빈 대상 DB에서 한 번 실행한다. 기존 활성 프로젝트·월드·카테고리를 자동 갱신하거나 중복 생성하지 않는다.

DROP TABLE IF EXISTS tmp_common_category_seed;
DROP TABLE IF EXISTS tmp_world_category_seed;
DROP TABLE IF EXISTS tmp_seed_config;

CREATE TEMP TABLE tmp_common_category_seed (
  level SMALLINT NOT NULL,
  parent_name TEXT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TEMP TABLE tmp_world_category_seed (
  world_name TEXT NOT NULL,
  level SMALLINT NOT NULL,
  parent_name TEXT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

INSERT INTO tmp_common_category_seed (level, parent_name, name, sort_order) VALUES
  (1, NULL, '개념', 1),
  (1, NULL, '신격', 2),
  (1, NULL, '국가', 3),
  (1, NULL, '도시', 4),
  (1, NULL, '단체', 5),
  (1, NULL, '종족', 6),
  (1, NULL, '인물', 7),
  (1, NULL, '아이템', 8),
  (1, NULL, '사건', 9),
  (1, NULL, '설화', 10),
  (1, NULL, '지형', 11),
  (2, '개념', '주요', 1),
  (2, '개념', '보조', 2),
  (2, '신격', '정령성 신위', 1),
  (2, '신격', '용성 신위', 2),
  (2, '국가', '왕국', 1),
  (2, '국가', '제국', 2),
  (2, '국가', '공화국', 3),
  (2, '국가', '연맹', 4),
  (2, '국가', '연방', 5),
  (2, '국가', '막부', 6),
  (2, '도시', '국가', 1),
  (2, '도시', '항구', 2),
  (2, '단체', '길드', 1),
  (2, '단체', '클랜', 2),
  (2, '단체', '부족', 3),
  (2, '단체', '부족국가', 4),
  (2, '단체', '교단', 5),
  (2, '단체', '문파', 6),
  (2, '단체', '결사', 7),
  (2, '단체', '범죄조직', 8),
  (2, '단체', '의회', 9),
  (2, '단체', '연합체', 10),
  (2, '종족', '인류', 1),
  (2, '종족', '유사인류', 2),
  (2, '종족', '비인류', 3),
  (2, '인물', '주요 인물', 1),
  (2, '인물', '보조인물', 2),
  (2, '인물', '엑스트라', 3),
  (2, '인물', '단역', 4),
  (2, '아이템', '무기', 1),
  (2, '아이템', '방어구', 2),
  (2, '아이템', '의상', 3),
  (2, '아이템', '장신구', 4),
  (2, '아이템', '도구', 5),
  (2, '아이템', '소비품', 6),
  (2, '아이템', '재료', 7),
  (2, '아이템', '보석·결정체', 8),
  (2, '아이템', '마법 도구', 9),
  (2, '아이템', '유물·성물', 10),
  (2, '아이템', '장치', 11),
  (2, '아이템', '문서·기록물', 12),
  (2, '아이템', '열쇠·증표', 13),
  (2, '아이템', '운송·보관품', 14),
  (2, '아이템', '생활용품', 15),
  (2, '아이템', '특수 아이템', 16),
  (2, '사건', '전쟁·분쟁', 1),
  (2, '사건', '재난', 2),
  (2, '사건', '정치 변동', 3),
  (2, '사건', '건국·창설', 4),
  (2, '사건', '멸망·붕괴', 5),
  (2, '사건', '발견·탐사', 6),
  (2, '사건', '변칙 현상', 7),
  (2, '사건', '의식·현현', 8),
  (2, '설화', '민담', 1),
  (2, '설화', '소문', 2),
  (2, '설화', '전승', 3),
  (2, '설화', '신화', 4),
  (2, '지형', '대륙', 1),
  (2, '지형', '육상:숲', 2),
  (2, '지형', '육상:정글', 3),
  (2, '지형', '육상:평원', 4),
  (2, '지형', '육상:황야', 5),
  (2, '지형', '육상:사막', 6),
  (2, '지형', '육상:설원', 7),
  (2, '지형', '육상:빙원', 8),
  (2, '지형', '육상:습지', 9),
  (2, '지형', '육상:늪지', 10),
  (2, '지형', '육상:산', 11),
  (2, '지형', '육상:산맥', 12),
  (2, '지형', '육상:고원', 13),
  (2, '지형', '육상:분지', 14),
  (2, '지형', '육상:화산', 15),
  (2, '지형', '육상:협곡', 16),
  (2, '지형', '육상:절벽', 17),
  (2, '지형', '육상:동굴', 18),
  (2, '지형', '육상:지하', 19),
  (2, '지형', '수계 해양:강', 20),
  (2, '지형', '수계 해양:호수', 21),
  (2, '지형', '수계 해양:내해', 22),
  (2, '지형', '수계 해양:해협', 23),
  (2, '지형', '수계 해양:해안', 24),
  (2, '지형', '수계 해양:군도', 25),
  (2, '지형', '수계 해양:수중', 26),
  (2, '지형', '특수:오염지대', 27),
  (2, '지형', '특수:봉인지대', 28),
  (2, '지형', '특수:변칙지형', 29);

INSERT INTO tmp_world_category_seed (world_name, level, parent_name, name, sort_order) VALUES
  ('룩스테라', 1, NULL, '용종', 12),
  ('룩스테라', 2, '용종', '조룡종', 1),
  ('룩스테라', 2, '용종', '비룡종', 2),
  ('룩스테라', 2, '용종', '수룡종', 3),
  ('룩스테라', 2, '용종', '해룡종', 4),
  ('룩스테라', 2, '용종', '아룡종', 5),
  ('룩스테라', 2, '용종', '어룡종', 6),
  ('룩스테라', 2, '용종', '사룡종', 7),
  ('룩스테라', 2, '용종', '익룡종', 8),
  ('룩스테라', 2, '용종', '초식종', 9),
  ('룩스테라', 2, '용종', '아수종', 10),
  ('룩스테라', 2, '용종', '양서종', 11),
  ('룩스테라', 2, '용종', '갑각종', 12),
  ('룩스테라', 2, '용종', '갑충종', 13),
  ('룩스테라', 2, '용종', '협각종', 14),
  ('룩스테라', 2, '용종', '두족종', 15),
  ('룩스테라', 2, '용종', '식생종', 16),
  ('엘드로스', 1, NULL, '클래스', 11),
  ('엘드로스', 2, '클래스', '기본 클래스', 1),
  ('엘드로스', 2, '클래스', '서브클래스', 2);

BEGIN;

-- 실행 전 아래 0을 활성 ADMIN 계정의 실제 admins.id로 바꾼다.
CREATE TEMP TABLE tmp_seed_config (project_owner_admin_id BIGINT NOT NULL);
INSERT INTO tmp_seed_config (project_owner_admin_id) VALUES (0);

-- 유효한 활성 ADMIN이 없으면 이 검증 결과가 0건이므로 ROLLBACK 한다.
SELECT a.id, a.email, a.name
FROM admins a
JOIN tmp_seed_config cfg ON cfg.project_owner_admin_id = a.id
WHERE a.role = 'ADMIN' AND a.use_yn = 'Y' AND a.del_yn = 'N';

INSERT INTO projects (admin_id, name, description)
SELECT cfg.project_owner_admin_id, '프로젝트 위그드라실', NULL
FROM tmp_seed_config cfg
JOIN admins a ON a.id = cfg.project_owner_admin_id
WHERE a.role = 'ADMIN' AND a.use_yn = 'Y' AND a.del_yn = 'N';

INSERT INTO worlds (project_id, name, description)
SELECT p.id, seed.name, NULL
FROM projects p
JOIN tmp_seed_config cfg ON cfg.project_owner_admin_id = p.admin_id
CROSS JOIN (VALUES ('룩스테라'), ('엘드로스')) AS seed(name)
WHERE p.name = '프로젝트 위그드라실';
-- 공통 메인 카테고리. 엘드로스에서는 클래스가 11번이므로 지형을 12번으로 정렬한다.
INSERT INTO categories (world_id, upper_category_id, template_id, name, level, sort_order)
SELECT w.id, NULL, NULL, s.name, s.level,
  CASE WHEN w.name = '엘드로스' AND s.name = '지형' THEN 12 ELSE s.sort_order END
FROM worlds w
CROSS JOIN tmp_common_category_seed s
JOIN projects projectSeed ON projectSeed.id = w.project_id
WHERE projectSeed.name = '프로젝트 위그드라실'
  AND projectSeed.admin_id = (SELECT project_owner_admin_id FROM tmp_seed_config)
  AND s.level = 1;

-- 세계별 메인 카테고리.
INSERT INTO categories (world_id, upper_category_id, template_id, name, level, sort_order)
SELECT w.id, NULL, NULL, s.name, s.level, s.sort_order
FROM worlds w
JOIN tmp_world_category_seed s ON s.world_name = w.name
JOIN projects projectSeed ON projectSeed.id = w.project_id
WHERE projectSeed.name = '프로젝트 위그드라실'
  AND projectSeed.admin_id = (SELECT project_owner_admin_id FROM tmp_seed_config)
  AND s.level = 1;

-- 공통 서브 1 카테고리.
INSERT INTO categories (world_id, upper_category_id, template_id, name, level, sort_order)
SELECT w.id, parent.id, NULL, s.name, s.level, s.sort_order
FROM worlds w
CROSS JOIN tmp_common_category_seed s
JOIN categories parent
  ON parent.world_id = w.id
 AND parent.upper_category_id IS NULL
 AND parent.name = s.parent_name
JOIN projects projectSeed ON projectSeed.id = w.project_id
WHERE projectSeed.name = '프로젝트 위그드라실'
  AND projectSeed.admin_id = (SELECT project_owner_admin_id FROM tmp_seed_config)
  AND s.level = 2;

-- 세계별 서브 1 카테고리.
INSERT INTO categories (world_id, upper_category_id, template_id, name, level, sort_order)
SELECT w.id, parent.id, NULL, s.name, s.level, s.sort_order
FROM worlds w
JOIN tmp_world_category_seed s ON s.world_name = w.name
JOIN categories parent
  ON parent.world_id = w.id
 AND parent.upper_category_id IS NULL
 AND parent.name = s.parent_name
JOIN projects projectSeed ON projectSeed.id = w.project_id
WHERE projectSeed.name = '프로젝트 위그드라실'
  AND projectSeed.admin_id = (SELECT project_owner_admin_id FROM tmp_seed_config)
  AND s.level = 2;

COMMIT;

-- 실행 결과 검증: 프로젝트 1개, 월드 2개, 룩스테라 114개, 엘드로스 100개, 최대 깊이 2를 확인한다.
SELECT p.id, p.name, p.admin_id
FROM projects p
JOIN tmp_seed_config cfg ON cfg.project_owner_admin_id = p.admin_id
WHERE p.name = '프로젝트 위그드라실'
  AND p.use_yn = 'Y'
  AND p.del_yn = 'N';

SELECT w.id, w.name
FROM worlds w
JOIN projects projectSeed ON projectSeed.id = w.project_id
WHERE projectSeed.name = '프로젝트 위그드라실'
  AND projectSeed.admin_id = (SELECT project_owner_admin_id FROM tmp_seed_config)
  AND w.use_yn = 'Y'
  AND w.del_yn = 'N'
ORDER BY w.id;

SELECT w.name, COUNT(c.id) AS categoryCount, MAX(c.level) AS maxCategoryLevel,
  CASE w.name WHEN '룩스테라' THEN 114 WHEN '엘드로스' THEN 100 END AS expectedCategoryCount
FROM worlds w
LEFT JOIN categories c
  ON c.world_id = w.id
 AND c.use_yn = 'Y'
 AND c.del_yn = 'N'
JOIN projects projectSeed ON projectSeed.id = w.project_id
WHERE projectSeed.name = '프로젝트 위그드라실'
  AND projectSeed.admin_id = (SELECT project_owner_admin_id FROM tmp_seed_config)
  AND w.name IN ('룩스테라', '엘드로스')
GROUP BY w.id, w.name
ORDER BY w.name;

SELECT w.name, c.level, c.name, parent.name AS upper_category_name, c.sort_order
FROM categories c
JOIN worlds w ON w.id = c.world_id
LEFT JOIN categories parent ON parent.id = c.upper_category_id
JOIN projects projectSeed ON projectSeed.id = w.project_id
WHERE projectSeed.name = '프로젝트 위그드라실'
  AND projectSeed.admin_id = (SELECT project_owner_admin_id FROM tmp_seed_config)
  AND c.use_yn = 'Y'
  AND c.del_yn = 'N'
ORDER BY w.name, c.level, c.sort_order, c.name;

DROP TABLE IF EXISTS tmp_common_category_seed;
DROP TABLE IF EXISTS tmp_world_category_seed;
DROP TABLE IF EXISTS tmp_seed_config;



