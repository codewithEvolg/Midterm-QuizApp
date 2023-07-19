DROP TABLE IF EXISTS attemps CASCADE;

CREATE TABLE attemps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  grade VARCHAR(255) NOT NULL
);
