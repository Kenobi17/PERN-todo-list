CREATE DATABASE todo_pern;

--\c into todo_pern

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);