
        
CREATE TABLE cart_item
(
  id         INT       NOT NULL AUTO_INCREMENT,
  session_id INT       NOT NULL,
  product_id INT       NOT NULL,
  quantity   INT       NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Shopping Cart Item';

CREATE TABLE order_details
(
  id         INT            NOT NULL AUTO_INCREMENT,
  user_id    INT            NOT NULL,
  payment_id INT            NOT NULL,
  address_id INT            NOT NULL,
  total      DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP      NOT NULL,
  updated_at TIMESTAMP      NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Order Detaiil';

CREATE TABLE order_items
(
  id         INT       NOT NULL AUTO_INCREMENT,
  order_id   INT       NOT NULL,
  product_id INT       NOT NULL,
  quantity   INT       NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Order Item';

CREATE TABLE payment_details
(
  id              INT            NOT NULL AUTO_INCREMENT,
  user_payment_id int            NOT NULL,
  amount          DECIMAL(10, 2) NOT NULL,
  status          VARCHAR(255)   NOT NULL,
  created_at      TIMESTAMP      NOT NULL,
  updated_at      TIMESTAMP      NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Payment Detail';

CREATE TABLE product
(
  id           INT            NOT NULL AUTO_INCREMENT,
  category_id  INT            NOT NULL,
  discount_id  INT            NOT NULL,
  inventory_id INT            NOT NULL,
  name         VARCHAR(255)   NOT NULL,
  description  TEXT           NULL    ,
  sku          VARCHAR(255)   NOT NULL,
  price        DECIMAL(10, 2) NOT NULL,
  active       BOOLEAN        NOT NULL,
  created_at   TIMESTAMP      NOT NULL,
  updated_at   TIMESTAMP      NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Hardware Product';

CREATE TABLE product_category
(
  id          INT          NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255) NOT NULL,
  description TEXT         NULL    ,
  created_at  TIMESTAMP    NOT NULL,
  updated_at TIMESTAMP    NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Product Category';

CREATE TABLE product_discount
(
  id          INT            NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255)   NOT NULL,
  description TEXT           NULL    ,
  percent     DECIMAL(10, 2) NOT NULL,
  active      BOOLEAN        NOT NULL,
  created_at  TIMESTAMP      NOT NULL,
  updated_at  TIMESTAMP      NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Product Discount';

CREATE TABLE product_inventory
(
  id         INT       NOT NULL AUTO_INCREMENT,
  quantity   INT       NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Hardware Product Inventory';

CREATE TABLE shopping_session
(
  id         INT            NOT NULL AUTO_INCREMENT,
  user_id    INT            NOT NULL,
  total      DECIMAL(10, 2) NOT NULL,
  created_at timestamp      NOT NULL,
  updated_at timestamp      NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'Shopping Cart';

CREATE TABLE user
(
  id          INT          NOT NULL AUTO_INCREMENT,
  email       VARCHAR(255) NOT NULL,
  telephone   VARCHAR(20)  NULL    ,
  first_name  VARCHAR(255) NOT NULL,
  last_name   VARCHAR(255) NOT NULL,
  role        INT          NOT NULL,
  auth_hash   VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP    NOT NULL,
  updated_at TIMESTAMP     NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'User';

CREATE TABLE user_address
(
  id            INT          NOT NULL AUTO_INCREMENT,
  user_id       INT          NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255) NOT NULL,
  city          VARCHAR(255) NOT NULL,
  postal_code   VARCHAR(255) NOT NULL,
  country       VARCHAR(255) NOT NULL,
  telephone     VARCHAR(20)  NOT NULL,
  mobile        VARCHAR(20)  NULL    ,
  created_at    TIMESTAMP    NOT NULL,
  updated_at    TIMESTAMP    NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'User Address';

CREATE TABLE user_payment
(
  id           INT          NOT NULL AUTO_INCREMENT,
  user_id      INT          NOT NULL,
  payment_type VARCHAR(255) NOT NULL,
  account_no   VARCHAR(255) NOT NULL,
  provider     VARCHAR(255) NOT NULL,
  expiry       DATE         NOT NULL,
  created_at   TIMESTAMP    NOT NULL,
  updated_at   TIMESTAMP    NOT NULL,
  PRIMARY KEY (id)
) COMMENT 'User Payment';

ALTER TABLE product
  ADD CONSTRAINT FK_product_category_TO_product
    FOREIGN KEY (category_id)
    REFERENCES product_category (id);

ALTER TABLE product
  ADD CONSTRAINT FK_product_discount_TO_product
    FOREIGN KEY (discount_id)
    REFERENCES product_discount (id);

ALTER TABLE product
  ADD CONSTRAINT FK_product_inventory_TO_product
    FOREIGN KEY (inventory_id)
    REFERENCES product_inventory (id);

ALTER TABLE order_details
  ADD CONSTRAINT FK_payment_details_TO_order_details
    FOREIGN KEY (payment_id)
    REFERENCES payment_details (id);

ALTER TABLE order_details
  ADD CONSTRAINT FK_user_TO_order_details
    FOREIGN KEY (user_id)
    REFERENCES user (id);

ALTER TABLE order_items
  ADD CONSTRAINT FK_order_details_TO_order_items
    FOREIGN KEY (order_id)
    REFERENCES order_details (id);

ALTER TABLE order_items
  ADD CONSTRAINT FK_product_TO_order_items
    FOREIGN KEY (product_id)
    REFERENCES product (id);

ALTER TABLE user_payment
  ADD CONSTRAINT FK_user_TO_user_payment
    FOREIGN KEY (user_id)
    REFERENCES user (id);

ALTER TABLE order_details
  ADD CONSTRAINT FK_user_address_TO_order_details
    FOREIGN KEY (address_id)
    REFERENCES user_address (id);

ALTER TABLE user_address
  ADD CONSTRAINT FK_user_TO_user_address
    FOREIGN KEY (user_id)
    REFERENCES user (id);

ALTER TABLE shopping_session
  ADD CONSTRAINT FK_user_TO_shopping_session
    FOREIGN KEY (user_id)
    REFERENCES user (id);

ALTER TABLE cart_item
  ADD CONSTRAINT FK_shopping_session_TO_cart_item
    FOREIGN KEY (session_id)
    REFERENCES shopping_session (id);

ALTER TABLE cart_item
  ADD CONSTRAINT FK_product_TO_cart_item
    FOREIGN KEY (product_id)
    REFERENCES product (id);