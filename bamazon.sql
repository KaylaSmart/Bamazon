DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE   bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT default 0,
    stock_quantitiy INT default 0,
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantitiy)
VALUES ("EG Record Player", "Electronics", 345, 60 ), 
("iPod Touch", "Electronics", 200, 108), ("Smart Water Bottle", "Home", 50, 200), 
("Leather Bookbag", "Travel", 80, 70), ("Wooden Desk", "Home",215, 200), ("Love Seat", "Home", 500, 100),
("Dell Laptop","Electronics", 600, 300), ("LED Strip Lights", "Home",15, 400), 
("The Office World's Best Boss Mug", "Novelty", 30, 50), ("Pawnee Today Mug", "Novelty", 30, 50) 
);

