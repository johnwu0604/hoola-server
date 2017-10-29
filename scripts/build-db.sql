-- Build script for a new Hoola database

-- Users

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id varchar(255) NOT NULL UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

INSERT INTO users (
    user_id,
    first_name,
    last_name,
    email,
    password
) VALUES (
    '1234567890',
    'John',
    'Smith',
    'john@smith.ca',
    'password'
);

SELECT * FROM users;

-- Tasks

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
    task_id varchar(255) NOT NULL UNIQUE,
    user_id varchar(255) NOT NULL,
    description varchar(255),
    due_date Date
);

INSERT INTO tasks (
    task_id,
    user_id,
    description,
    due_date
) VALUES (
    '12345',
    '1234567890',
    'A task to do',
    '2017-10-23'
);

SELECT * FROM tasks;

-- Shopping

DROP TABLE IF EXISTS shopping;

CREATE TABLE shopping (
    item_id varchar(255) NOT NULL UNIQUE,
    user_id varchar(255) NOT NULL,
    description varchar(255)
);

INSERT INTO shopping (
    item_id,
    user_id,
    description
) VALUES (
    '12345',
    '1234567890',
    'A shopping list item'
);

SELECT * FROM shopping;

-- Notebooks

DROP TABLE IF EXISTS notebooks;

CREATE TABLE notebooks (
    notebook_id varchar(255) NOT NULL UNIQUE,
    user_id varchar(255) NOT NULL,
    name varchar(255),
    text varchar(255)
);

INSERT INTO notebooks (
    notebook_id,
    user_id,
    name,
    text
) VALUES (
    '12345',
    '1234567890',
    'Main',
    'A notebook to keep track of notes'
);

SELECT * FROM notebooks;

-- Finances

DROP TABLE IF EXISTS finance_types;

CREATE TABLE finance_types (
    type_id varchar(255) NOT NULL UNIQUE,
    name varchar(255)
);

DROP TABLE IF EXISTS finance_categories;

CREATE TABLE finance_categories (
    category_id varchar(255) NOT NULL UNIQUE,
    name varchar(255)
);

DROP TABLE IF EXISTS finances;

CREATE TABLE finances (
    item_id varchar(255) NOT NULL UNIQUE,
    user_id varchar(255) NOT NULL,
    type_id varchar(255),
    category_id varchar(255),
    date Date,
    description varchar(255),
    amount varchar(255)
);

INSERT INTO finance_types (
    type_id,
    name
) VALUES (
    '1',
    'Expense'
);

INSERT INTO finance_types (
    type_id,
    name
) VALUES (
    '2',
    'Revenue'
);

INSERT INTO finance_types (
    type_id,
    name
) VALUES (
    '3',
    'Accounts Payable'
);

INSERT INTO finance_types (
    type_id,
    name
) VALUES (
    '4',
    'Accounts Recievable'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '1',
    'Food and Drinks'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '2',
    'Transportation'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '3',
    'Housing and Utilities'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '4',
    'Health and Personal Care'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '5',
    'Shopping and Entertainment'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '6',
    'Education'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '7',
    'Fees and Charges'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '8',
    'Taxes and Income'
);

INSERT INTO finance_categories (
    category_id,
    name
) VALUES (
    '9',
    'Miscellaneous'
);

INSERT INTO finances (
    item_id,
    user_id,
    type_id,
    category_id,
    date, 
    description,
    amount
) VALUES (
    '12345',
    '1234567890',
    '1',
    '1',
    '2017-10-04',
    'Dinner at a restaurant',
    '15.68'
);

SELECT * FROM finance_types;
SELECT * FROM finance_categories;
SELECT * FROM finances;
