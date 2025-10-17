import React from "react";

function AdminNavBar({ onChangePage }) {
  return (
    <nav className="admin-nav">
      <button type="button" onClick={() => onChangePage("Form")}>
        New Question
      </button>
      <button type="button" onClick={() => onChangePage("List")}>
        View Questions
      </button>
    </nav>
  );
}

export default AdminNavBar;
