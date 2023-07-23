DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT 'untitled',
  description TEXT DEFAULT 'No Description',
  private BOOLEAN NOT NULL DEFAULT false
);
