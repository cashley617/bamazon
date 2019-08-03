DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(4) NOT NULL,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
    price DECIMAL (10,2),
    stock_quantity INTEGER(20),
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
(32, "apples", "fruit", 19.34, 4),
(45, "bananas", "fruit", 34.56, 3),
(43, "pears", "fruit", 99.54, 12),
(20, "carrots", "vegetables", 22.22, 2),
(87, "chocolate", "candy", 2.22, 1),
(85, "socks", "clothes", 43.12, 9),
(98, "undies", "clothes", 1.11, 9),
(55, "potatoes", "vegetables", 43.99, 3),
(77, "water", "liquid", 43.98, 7),
(89, "gum", "candy", 32.23, 2);

