// src/components/QuestionItem.js
import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  function handleChange(e) {
    const newCorrectIndex = parseInt(e.target.value) - 1;
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onUpdateQuestion(updatedQuestion));
  }

  return (
    <li>
      <h3>{prompt}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li
            key={index}
            style={{
              fontWeight: index === correctIndex ? "bold" : "normal",
            }}
          >
            {answer}
          </li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select value={correctIndex + 1} onChange={handleChange}>
          {answers.map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
