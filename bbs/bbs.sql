-- % : 어디에서나 접근가능
CREATE USER 'node'@'%'
identified by'12341234';

-- 모든 권한 부여
GRANT ALL privileges ON *.* TO 'node'@'%';

-- 데이터베이스만 생성하고 나머지는 vs코드의 se어쩌구에서 만들도록 한다.
CREATE DATABASE nodeDB;
USE nodedb;
DESC tbl_bbs;
DROP TABLE tbl_bbs;

SELECT * FROM tbl_bbs;