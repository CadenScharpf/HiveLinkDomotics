-- Insert data into product_category table
INSERT INTO product_category (name, description, created_at, updated_at)
VALUES
  ('Electronics', 'Electronic products category', NOW(), NOW()),
  ('Clothing', 'Clothing products category', NOW(), NOW()),
  ('Books', 'Book products category', NOW(), NOW());

-- Insert data into product_discount table
INSERT INTO product_discount (name, description, percent, active, created_at, updated_at)
VALUES
  ('10% Off', '10% discount on all products', 10.00, 1, NOW(), NOW()),
  ('20% Off', '20% discount on selected products', 20.00, 1, NOW(), NOW()),
  ('No Discount', 'No discount available', 0.00, 0, NOW(), NOW());

-- Insert data into product_inventory table
INSERT INTO product_inventory (quantity, created_at, updated_at)
VALUES
  (100, NOW(), NOW()),
  (50, NOW(), NOW()),
  (200, NOW(), NOW());

-- Insert data into user table
INSERT INTO user (email,  first_name, last_name, role, auth_hash, telephone, created_at, updated_at)
VALUES
  ('user1@example.com', 'John', 'Doe', 0, "$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy", '123-456-7890',  NOW(), NOW()),
  ('user2@example.com',  'Jane', 'Smith', 1, "$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy", NULL, NOW(), NOW());

-- Insert data into user_address table
INSERT INTO user_address (user_id, address_line1, address_line2, city, postal_code, country, telephone, mobile, created_at, updated_at)
VALUES
  (1, '123 Main St', 'Apt 101', 'New York', '10001', 'USA', '555-123-4567', '555-987-6543', NOW(), NOW()),
  (1, '789 Broadway', '', 'San Diego', '10002', 'USA', '555-123-4567', '555-987-6543', NOW(), NOW()),
  (2, '456 Elm St', '', 'Los Angeles', '90002', 'USA', '555-987-6543', '555-123-4567', NOW(), NOW());

-- Insert data into user_home table
INSERT INTO user_home (user_id, address_id, name, created_at, updated_at)
VALUES
  (1, 1, 'City Loft', NOW(), NOW());

-- Insert data into user_room table
INSERT INTO user_room (user_id, home_id, name, created_at, updated_at)
VALUES
  (1, 1, 'Living Room', NOW(), NOW()),
  (1, 1, 'Bedroom', NOW(), NOW()),
  (1, 1, 'Kitchen', NOW(), NOW());
  

-- Insert data into user_payment table
INSERT INTO user_payment (user_id, payment_type, account_no, provider, expiry, created_at, updated_at)
VALUES
  (1, 'Credit Card', '1234-5678-9012-3456', 'Visa', '2025-12-31', NOW(), NOW()),
  (2, 'PayPal', 'jane.smith@example.com', 'PayPal', '2024-06-30', NOW(), NOW());

-- Insert data into product table
INSERT INTO product (category_id, discount_id, inventory_id, name, description, sku, price, active, created_at, updated_at)
VALUES
  (1, 1, 1, 'TP-Link Smart Plug', 'Wifi Smart Plug', 'SKU123', 599.99, 1, NOW(), NOW());

-- Insert data into shopping_session table
INSERT INTO shopping_session (user_id, total, created_at, updated_at)
VALUES
  (1, 0.00, NOW(), NOW()),
  (2, 0.00, NOW(), NOW());

-- Insert data into cart_item table
INSERT INTO cart_item (session_id, product_id, quantity, created_at, updated_at)
VALUES
  (1, 1, 2, NOW(), NOW());
  
-- Insert data into payment_details table
INSERT INTO payment_details (user_payment_id, amount, status, created_at, updated_at)
VALUES
  (1, 599.99, 'Paid', NOW(), NOW()),
  (2, 9.99, 'Paid', NOW(), NOW());

-- Insert data into order_details table
INSERT INTO order_details (user_id, payment_id, address_id, total, created_at, updated_at)
VALUES
  (1, 1, 1, 599.99, NOW(), NOW()),
  (2, 2, 2, 9.99, NOW(), NOW());

-- Insert data into order_items table
INSERT INTO order_items (order_id, product_id, quantity, created_at, updated_at)
VALUES
  (1, 1, 2, NOW(), NOW());

-- Insert data into device_category table
INSERT INTO device_category (name, description, created_at, updated_at)
VALUES
  ('plug', 'Smart Plug', NOW(), NOW()),
  ('switch', 'Smart Switch', NOW(), NOW()),
  ('light', 'Smart Light', NOW(), NOW());

-- INSERT data into device table
INSERT INTO device (category_id, manufacturer, model, name, description, created_at, updated_at)
VALUES
  (1, 'TP-Link', 'HS100', 'Smart Plug', 'Smart Plug', NOW(), NOW()),
  (2, 'TP-Link', 'HS200', 'Smart Switch', 'Smart Switch', NOW(), NOW()),
  (3, 'TP-Link', 'LB100', 'Smart Light', 'Smart Light', NOW(), NOW());

-- Insert data into user_device table
INSERT INTO user_device (user_id, device_id, room_id, product_id, name, last_conn, created_at, updated_at)
VALUES
  (1, 1, 1, 1, 'Corner Lamp', NULL, NOW(), NOW());
