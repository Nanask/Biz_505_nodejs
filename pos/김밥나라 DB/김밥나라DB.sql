-- User생성

CREATE USER 'gimbap'@'%' IDENTIFIED by '12341234';

GRANT ALL PRIVILEGES ON *.* TO 'gimbap'@'%';

CREATE DATABASE gimbapDB;

DESC tbl_orders;
DESC tbl_products;

use gimbapDB;

SELECT * FROM tbl_orders;

DROP TABLE tbl_orders;
DROP TABLE tbl_products;

INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0001','기본김밥',2000,'김,밥,단무지,시금치,햄,맛살');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0002','참치김밥',3000,'김,밥,단무지,시금치,참치,깻잎');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0003','돈까스김밥',3500,'김,밥,단무지,돈까스');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0004','돈까스',7000,'바삭바삭');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0005','치즈돈까스',7000,'바삭바삭,치즈');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0006','떡볶이',4000,'떡,오뎅');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0007','오뎅','4000','다양한 오뎅');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0008','라볶이','5000','떡,오뎅,라면');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0009','김치볶음밥','6500','김치와 볶음밥');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0010','새우볶음밥','6500','새우와 볶음밥');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0011','순두부찌개','7000','순두부가 들어간 빨간 찌개');
INSERT INTO tbl_products(p_code,p_name,p_price,p_rem) VALUES('0012','된장찌개','7000','애호박이 들어간 된장찌개');



