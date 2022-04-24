CREATE DATABASE hkig;
USE hkig;

CREATE TABLE roles (
    role_id INT UNSIGNED AUTO_INCREMENT,
    role_name VARCHAR(30),
    PRIMARY KEY(role_id)
);

CREATE TABLE users (
    user_id INT UNSIGNED AUTO_INCREMENT,
    user_name VARCHAR(30) UNIQUE,
    email VARCHAR(255),
    pw_hash VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY(user_id)
);

CREATE TABLE user_role_relationship (
    user_id INT UNSIGNED,
    role_id INT UNSIGNED DEFAULT 2,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY(user_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(role_id) REFERENCES roles(role_id) ON DELETE SET NULL
);

CREATE TABLE search_history (
    user_id INT UNSIGNED,
    histories JSON,
    PRIMARY KEY(user_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE preferences (
    user_id INT UNSIGNED,
    categories JSON,
    PRIMARY KEY(user_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE category (
    category_id INT UNSIGNED,
    category_name VARCHAR(255),
    PRIMARY KEY(category_id)
);

CREATE TABLE sub_category (
    category_id INT UNSIGNED,
    sub_category_id INT UNSIGNED,
    sub_category_name VARCHAR(255),
    PRIMARY KEY(category_id, sub_category_id),
    FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

CREATE TABLE shops (
    shop_id INT UNSIGNED AUTO_INCREMENT,
    shop_name VARCHAR(255) UNIQUE,
    created_at DATETIME,
    updated_at DATETIME,
    added_by_user_id INT UNSIGNED,
    categories JSON,
    rating INT UNSIGNED,
    PRIMARY KEY(shop_id),
    FOREIGN KEY(added_by_user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE wishlist (
    user_id INT UNSIGNED,
    shop_id INT UNSIGNED,
    PRIMARY KEY(user_id, shop_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    review_id INT UNSIGNED,
    shop_id INT UNSIGNED,
    user_id INT UNSIGNED,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY(review_id),
    FOREIGN KEY(shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE shop_category_relationship (
    shop_id INT UNSIGNED,
    category_id INT UNSIGNED,
    sub_category_id INT UNSIGNED,
    PRIMARY KEY(shop_id, category_id, sub_category_id),
    FOREIGN KEY(shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE CASCADE
);