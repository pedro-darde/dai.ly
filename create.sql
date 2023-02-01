DROP TABLE phd.task_note;
DROP TABLE phd.tasks;
DROP TABLE phd.notes;
DROP TABLE phd.planning_month_item;
DROP TABLE phd.planning_month;
DROP TABLE phd.planning;
DROP TABLE phd.months;
CREATE TABLE phd.notes (
    id SERIAL PRIMARY KEY,
    description varchar not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fixed BOOLEAN DEFAULT false
);

CREATE TABLE phd.tasks (
    id SERIAL  PRIMARY KEY,
    title VARCHAR not null,
    about VARCHAR not null,
    expected_time integer,
    expected_date TIMESTAMP null,
    status integer default 0,
    start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP DEFAULT NULL,
    time_spent integer
);

CREATE TABLE phd.task_note(
    id_task integer REFERENCES phd.tasks(id),
    id_note integer REFERENCES phd.notes(id),
    PRIMARY KEY (id_task, id_note)
);

CREATE TABLE phd.months(
    id SERIAL PRIMARY KEY,
    month_name VARCHAR NOT NULL,
    month_as_number INTEGER NOT NULL
);

CREATE TABLE phd.planning (
    id SERIAL PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    status INTEGER NOT NULL,
    title VARCHAR NOT NULL,
    expected_amount NUMERIC(10,2) NOT NULL,
    balance NUMERIC(10,2) DEFAULT 0,
    start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE phd.planning_month(
    id SERIAL PRIMARY KEY,
    id_month integer not null REFERENCES phd.months(id),
    id_planning integer not null REFERENCES phd.planning(id),
    balance NUMERIC(10,2) DEFAULT 0,
    expected_amount NUMERIC(10,2) NOT NULL,
    open BOOLEAN DEFAULT true,
    spent_on_credit NUMERIC(10,2) default 0,
    spent_on_debit NUMERIC (10,2) default 0,
    total_in NUMERIC(10,2) DEFAULT 0,
    total_out NUMERIC(10,2) default 0,
    UNIQUE(id_month, id_planning)
);


CREATE table phd.item_type (
    id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    active BOOLEAN DEFAULT true
);

CREATE TABLE phd.planning_month_item(
    id SERIAL PRIMARY KEY,
    id_month_planning  integer not null REFERENCES phd.planning_month(id),
    value numeric(10,2) NOT NULL,
    operation char(3) NOT NULL,
    date TIMESTAMP NOT NULL,
    description VARCHAR NOT NULL,
    id_type integer not null REFERENCES phd.item_type (id),
    payment_method VARCHAR NULL
);

INSERT INTO phd.months (month_name, month_as_number) VALUES 
('January', 1),
('February', 2),
('March', 3),
('April', 4),
('May', 5),
('June', 6),
('July', 7),
('August', 8),
('September',9),
('October', 10),
('November', 11),
('December', 12);


INSERT INTO phd.item_type (description) VALUES ('Education'), ('Invoice'), ('Salary'), ('Food'), ('Drink'), ('Party');
ALTER TABLE phd.planning_month_item ADD COLUMN id_type integer not null REFERENCES phd.item_type (id);
ALTER TABLE phd.planning_month_item ALTER COLUMN operation TYPE varchar;
ALTER TABLE phd.planning_month_item ALTER COLUMN date TYPE DATE;

CREATE TABLE phd.card (
    id SERIAL PRIMARY KEY,
    owner_name varchar not null,
    number varchar not null,
    flag varchar not null,
    type varchar not null,
    validateDate varchar not null,
    credit_limit numeric(10,2) null
);


ALTER TABLE phd.planning_month_item ADD COLUMN id_card integer null REFERENCES phd.card(id);