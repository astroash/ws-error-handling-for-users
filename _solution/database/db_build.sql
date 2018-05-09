BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id            SERIAL         PRIMARY KEY,
  username      VARCHAR(100)   NOT NULL
);

INSERT INTO users(username) VALUES
  ('astroash');

COMMIT;
