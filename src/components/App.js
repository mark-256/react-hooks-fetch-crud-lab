import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm"; // ✅ correct import
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // ✅ Fetch questions from server
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  // ✅ Add a new question
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // ✅ Delete a question
  function handleDeleteQuestion(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  // ✅ Update a question
  function handleUpdateQuestion(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} /> // ✅ use QuestionForm here
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
