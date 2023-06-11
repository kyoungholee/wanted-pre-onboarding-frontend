import axios from "axios";
import React, { useState } from "react";

export default function ToDo() {
  const [todoList, setTodoList] = useState("");

  const createTodoList = axios.create({
    baseURL: "https://www.pre-onboarding-selection-task.shop",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjo0LCJpYXQiOjE2NTk5MDQyMTUsImV4cCI6MTY2MDUwOTAxNX0.DyUCCsIGxIl8i_sGFCa3uQcyEDb9dChjbl40h3JWJNc",
      "Content-Type": "application/json",
    },
    body: {
      todo: todoList,
    },
  });

  const AddHandler = (e) => {
    e.prevent.Default();

    const userData = {
      todo: todoList,
    };

    createTodoList.post("/todos", userData).then((res) => {
      if (res.status === 200) {
        console.log("res!!");
      }
    });
  };

  return (
    <div>
      <h1>투드 리스트 페이지</h1>
      <input
        type="text"
        data-testid="new-todo-input"
        onChange={(e) => {
          setTodoList(e.target.value);
        }}
      />
      <button
        type="submit"
        data-testid="new-todo-add-button"
        onChange={AddHandler}
      >
        추가하기
      </button>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 1</span>
          </label>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 2</span>
          </label>
        </li>
      </ul>
    </div>
  );
}
