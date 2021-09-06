use nodeDB;

DROP table tbl_table_orders;
DROP table tbl_products;
DESC tbl_products;

-- 벌크 insert
INSERT INTO tbl_products(p_code, p_name, p_price)
VALUES 
('P0001','1000원 깁밥',1000),
('P0002','참치깁밥',2000),
('P0003','라볶이',3000),
('P0004','어묵탕',3500),
('P0005','돈까스',5000),
('P0006','열무냉면',5000),
('P0007','김치볶음밥',5000),
('P0008','순두부찌개',6000),
('P0009','치즈라면',3000),
('P0010','코카콜라 500ml',2000);

SELECT * from tbl_products;

SELECT to_table_id, count(to_table_id)
FROM tbl_table_orders
WHERE to_pay IS NULL
GROUP BY to_table_id;