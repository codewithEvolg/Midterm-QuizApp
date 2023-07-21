const db = require("../connection");

const getQuiz = function (id) {
  return db
    .query(
      `
  SELECT *
  FROM quizzes
  WHERE quizzes.id = $1;
  `,
      [id]
    )
    .then((res) => {
      return res.rows[0] || null;
    })
    .catch((err) => console.error(err.message));
};

const getQuizQuestions = function (id) {
  return db
    .query(
      `
  SELECT questions.title as title, questions.id as id, questions.question
  FROM questions
  JOIN quizzes ON quizzes.id = quiz_id
  WHERE quizzes.id = $1;
  `,
      [id]
    )
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

module.exports = { getQuiz, getQuizQuestions };