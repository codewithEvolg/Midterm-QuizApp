const db = require("../connection");

const updateQuizTitle = function (title, id) {
  return db
    .query(
      `
      UPDATE quizzes SET title = $1 WHERE id = $2;
  `,
      [title, id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuizDescription = function (description, id) {
  return db
    .query(
      `
      UPDATE quizzes SET description = $1 WHERE id = $2;
  `,
      [description, id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuizPrivacy = function (private, id) {
  return db
    .query(
      `
      UPDATE quizzes SET private = $1 WHERE id = $2;
  `,
      [private, id]
    )
    .catch((err) => console.error(err.message));
};

const createQuizQuestion = function (id) {
  return db
    .query(
      `
      INSERT INTO questions (quiz_id, title, question, answer_id) VALUES ($1, 'untitled','new option', 0);
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

const deleteQuizQuestion = function (id) {
  return db
    .query(
      `
      DELETE FROM questions WHERE id = $1;
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

module.exports = {
  updateQuizTitle,
  updateQuizDescription,
  updateQuizPrivacy,
  deleteQuizQuestion,
  createQuizQuestion,
};
