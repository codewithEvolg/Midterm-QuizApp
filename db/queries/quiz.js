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

const getNewestQuiz = function () {
  return db
    .query(
      `
  SELECT *
  FROM quizzes
  ORDER BY id DESC
  LIMIT 1;
  `
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
  WHERE quizzes.id = $1
  ORDER BY questions.id;
  `,
      [id]
    )
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getQuizQuestion = function (id) {
  return db
    .query(
      `
  SELECT title, question, answer_id
  FROM questions
  WHERE questions.id = $1;
  `,
      [id]
    )
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getQuizQuestionsOptions = function (id) {
  return db
    .query(
      `
  SELECT options.id, options.description, questions.id as question_id
  FROM questions
  JOIN options ON questions.id = question_id
  WHERE questions.id = $1
  ORDER BY options.id;
  `,
      [id]
    )
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getAllPublicQuizzes = () => {
  return db
    .query(
      `
  SELECT *
  FROM quizzes
  WHERE private = 'false';
  `
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error(err.message));
};

const getQuestionsWithQuizId = (quizId) => {
  return db
    .query(
      `
  SELECT *
  FROM questions
  WHERE quiz_Id = $1`,
      [quizId]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error(err.message));
};

const getOptionsWithQuestionId = (questionId) => {
  return db
    .query(`SELECT * FROM options WHERE question_id = $1`, [questionId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getAttemptsForUserID = function (userid) {
  return db
    .query(
      `
  SELECT quizzes.title, attempts.grade, users.name
  FROM attempts
  JOIN users ON attempts.user_id=users.id
  JOIN quizzes ON attempts.quiz_id=quizzes.id
  WHERE users.id = $1;
  `,
  [userid])
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => console.error(err.message));
};

const checkAnswers = (quizId, userAnswers) => {
  // Get the correct answer IDs from the database for the given quiz
  return db.query('SELECT id, answer_id FROM questions WHERE quiz_id = $1', [quizId])
    .then((result) => {
      const questions = result.rows;
      let score = 0;
      for (const question of questions) {
        const questionId = question.id;
        const correctAnswerId = question.answer_id;
        const submittedAnswerId = userAnswers['question_' + questionId];

        if (submittedAnswerId === correctAnswerId.toString()) {
          score++;
        }
      }
      return `${score}/${questions.length}`;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};


function saveGrade(quizId, userId, grade) {
  const query = 'INSERT INTO attempts (user_id, quiz_id, grade) VALUES ($1, $2, $3)';
    return db.query(query, [userId, quizId, grade])
    .then((result) => {
    // Check if the insertion was successful
      if (result.rowCount > 0) {
        console.log('Grade saved successfully.');
        return true; // Indicate successful insertion
      } else {
        console.log('Grade insertion failed.');
        return false; // Indicate failed insertion
      }
    })
    .catch (err => {
      console.error('Error saving grade:', err);
      throw err;
    });
  }

module.exports = {
  getQuiz,
  getNewestQuiz,
  getQuizQuestions,
  getQuizQuestion,
  getAllPublicQuizzes,
  getQuestionsWithQuizId,
  getQuizQuestionsOptions,
  getOptionsWithQuestionId,
  getAttemptsForUserID,
  checkAnswers,
  saveGrade
};
