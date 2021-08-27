-- User생성

CREATE USER 'gimbap'@'%' IDENTIFIED by '12341234';

GRANT ALL PRIVILEGES ON *.* TO 'gimbap'@'%';

CREATE DATABASE gimbapDB;

DESC tbl_orders;
DESC tbl_products;

DROP TABLE tbl_orders;
DROP TABLE tbl_products;

INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0001','기본김밥',2000,'기본김밥은 기본에 충실해요');



