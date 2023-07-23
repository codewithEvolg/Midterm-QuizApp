const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quiz");
const updateTable = require("../db/queries/updateTable");

router.get("/:id", (req, res) => {
  req.session.question_id = req.params.id;
  quizQueries
    .getQuizQuestion(req.session.question_id)
    .then((question) => {
      quizQueries
        .getQuizQuestionsOptions(req.session.question_id)
        .then((options) => {
          const quizOptions = { question, options };
          res.render("quiz-options", quizOptions);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

router.post("/:id", (req, res) => {
  let { title, question } = req.body;
  console.log(req.body);

  updateTable
    .updateQuestionTitle(title, req.session.question_id)
    .then(() => {
      updateTable
        .updateQuestionQuestion(question, req.session.question_id)
        .then(() => {
          res.redirect("/quiz-options/" + req.session.question_id);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
