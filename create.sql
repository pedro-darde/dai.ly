CREATE TABLE phd.notes (
    id SERIAL PRIMARY KEY,
    description varchar not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fixed BOOLEAN DEFAULT false
);

CREATE TABLE phd.tasks (
    id SERIAL  PRIMARY KEY,
    about VARCHAR not null,
    expected_time integer null,
    start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP DEFAULT NULL,
    time_spent integer null
);

CREATE TABLE phd.task_note(
    id_task integer REFERENCES phd.tasks(id),
    id_note integer REFERENCES phd.notes(id),
    PRIMARY KEY (id_task, id_note)
);