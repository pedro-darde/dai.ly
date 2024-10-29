CREATE SCHEMA IF NOT EXISTS phd;

CREATE TABLE IF NOT EXISTS phd.notes (
    id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fixed BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS phd.tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    about VARCHAR NOT NULL,
    expected_time INTEGER,
    expected_date TIMESTAMP NULL,
    status INTEGER DEFAULT 0,
    start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP DEFAULT NULL,
    time_spent INTEGER
);

CREATE TABLE IF NOT EXISTS phd.task_note(
    id_task INTEGER REFERENCES phd.tasks(id),
    id_note INTEGER REFERENCES phd.notes(id),
    PRIMARY KEY (id_task, id_note)
);

CREATE TABLE IF NOT EXISTS phd.months(
    id SERIAL PRIMARY KEY,
    month_name VARCHAR NOT NULL,
    month_as_number INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS phd.planning (
    id SERIAL PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    status INTEGER NOT NULL,
    title VARCHAR NOT NULL,
    expected_amount NUMERIC(10,2) NOT NULL,
    balance NUMERIC(10,2) DEFAULT 0,
    start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS phd.planning_month(
    id SERIAL PRIMARY KEY,
    id_month INTEGER NOT NULL REFERENCES phd.months(id),
    id_planning INTEGER NOT NULL REFERENCES phd.planning(id),
    balance NUMERIC(10,2) DEFAULT 0,
    expected_amount NUMERIC(10,2) NOT NULL,
    open BOOLEAN DEFAULT true,
    spent_on_credit NUMERIC(10,2) DEFAULT 0,
    spent_on_debit NUMERIC(10,2) DEFAULT 0,
    total_in NUMERIC(10,2) DEFAULT 0,
    total_out NUMERIC(10,2) DEFAULT 0,
    UNIQUE (id_month, id_planning)
);

CREATE TABLE IF NOT EXISTS phd.item_type (
    id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS phd.planning_month_item(
    id SERIAL PRIMARY KEY,
    id_month_planning INTEGER NOT NULL REFERENCES phd.planning_month(id),
    value NUMERIC(10,2) NOT NULL,
    operation VARCHAR(3) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR NOT NULL,
    id_type INTEGER NOT NULL REFERENCES phd.item_type(id),
    payment_method VARCHAR NULL,
    is_investiment BOOLEAN DEFAULT false
);

INSERT INTO phd.months (month_name, month_as_number) 
SELECT 'January', 1
WHERE NOT EXISTS (SELECT 1 FROM phd.months WHERE month_as_number = 1);
INSERT INTO phd.months (month_name, month_as_number) 
SELECT 'February', 2
WHERE NOT EXISTS (SELECT 1 FROM phd.months WHERE month_as_number = 2);


-- Repeat for all other months

INSERT INTO phd.item_type (description) 
SELECT 'Education'
WHERE NOT EXISTS (SELECT 1 FROM phd.item_type WHERE description = 'Education');
-- Repeat for other item types

ALTER TABLE phd.planning_month_item ALTER COLUMN operation TYPE VARCHAR;
ALTER TABLE phd.planning_month_item ALTER COLUMN date TYPE DATE;

CREATE TABLE IF NOT EXISTS phd.card (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    owner_name VARCHAR NOT NULL,
    number VARCHAR NOT NULL,
    flag VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    validateDate VARCHAR NOT NULL,
    credit_limit NUMERIC(10,2) NULL,
    cvv VARCHAR NOT NULL
);

ALTER TABLE phd.planning_month_item ADD COLUMN IF NOT EXISTS id_card INTEGER NULL REFERENCES phd.card(id);

CREATE TABLE IF NOT EXISTS phd.setting (
    id SERIAL PRIMARY KEY,
    key VARCHAR NOT NULL,
    value VARCHAR NOT NULL,
    value_type varchar NOT NULL,
    description VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS phd.month_budget (
    id_type INTEGER NOT NULL REFERENCES phd.item_type(id),
    id_planning_month INTEGER NOT NULL REFERENCES phd.planning_month(id),
    amount NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (id_type, id_planning_month)
);

CREATE TABLE IF NOT EXISTS phd.planning_month_goals(
    id SERIAL PRIMARY KEY,
    id_planning_month INTEGER NOT NULL REFERENCES phd.planning_month(id) UNIQUE,
    money_to_save NUMERIC(10,2) NOT NULL,
    credit_limit NUMERIC(10,2) NOT NULL
);

-- DEFAULT VALUES TO SETTINGS
INSERT INTO phd.setting (key, value, value_type, description) 
SELECT 'max_on_credit', '1200', 'numeric', 'Max to spend on credit'
WHERE NOT EXISTS (SELECT 1 FROM phd.setting WHERE key = 'max_on_credit');

-- Additional ALTER statements
ALTER TABLE phd.planning_month DROP COLUMN IF EXISTS expected_amount;
ALTER TABLE phd.item_type ADD COLUMN IF NOT EXISTS id_parent INTEGER NULL REFERENCES phd.item_type(id);
ALTER TABLE phd.planning_month ADD COLUMN IF NOT EXISTS credit_status NUMERIC(10,2) DEFAULT 0.00;
