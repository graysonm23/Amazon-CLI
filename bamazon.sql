DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

create table products(
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT,
    primary key(id)
);

INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'febreeze',
    'cleaning',
    2.00,
    60
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'detergent',
    'cleaning',
    5.00,
    33
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'romaine lettuce',
    'produce',
    1.82,
    300
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'apples',
    'produce',
    .99,
    31
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'kolaches',
    'bakery',
    1.99,
    23
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'whole grain loaf',
    'bakery',
    6.99,
    55
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'pizza',
    'frozen',
    10.99,
    48
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'indian bowl',
    'frozen',
    5.99,
    90
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'chips',
    'grocery',
    3.99,
    38
);
INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES (
	'cookies',
    'grocery',
    5.99,
    400
);

SELECT * FROM products;
