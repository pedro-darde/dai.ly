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