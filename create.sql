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
    UNIQUE(id_month, id_planning)
);

CREATE TABLE phd.plannig_month_item(
    id SERIAL PRIMARY KEY,
    id_month_planning  integer not null REFERENCES phd.planning_month(id),
    value numeric(10,2) NOT NULL,
    operation char(3) NOT NULL,
    date TIMESTAMP NOT NULL,
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