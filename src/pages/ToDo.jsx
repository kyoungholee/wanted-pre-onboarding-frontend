import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function ToDo() {
  const [todoList, setTodoList] = useState("");
  const [result, setResult] = useState([]);
  const inputRef = useRef();

  const token = localStorage.getItem("access_token");

  const createTodoList = axios.create({
    baseURL: "https://www.pre-onboarding-selection-task.shop",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: {
      todo: todoList,
    },
  });

  const SendHandler = (e) => {
    e.preventDefault();

    const userData = {
      todo: todoList,
    };

    createTodoList.post("/todos", userData).then((res) => {
      if (res.status === 201) {
        const IsGetData = axios
          .get("https://www.pre-onboarding-selection-task.shop/todos", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return res.data;
          });

        const promist = IsGetData;
        const getData = () => {
          promist.then((data) => {
            setResult(data);
          });
        };
        getData();
      } else if (res.status === 400) {
        console.log("에러임 ~");
      }
    });

    setTodoList("");
    inputRef.current.focus();
  };

  useEffect(() => {
    const IsGetData = axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });

    const promist = IsGetData;
    const getData = () => {
      promist.then((data) => {
        setResult(data);
      });
    };
    getData();
  }, []);

  const DeleteHandler = (id) => {
    console.log(id);
    setResult(result.filter((data, idx) => data.id !== id));
    console.log(result);

    const userData = {
      id: id,
    };

    axios
      .delete("https://www.pre-onboarding-selection-task.shop/todos/:id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          id: id,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          console.log(res);
        } else if (res.status === 500) {
          console.log("에러입니다.");
        }
      });
  };

  return (
    <div>
      <h1>투드 리스트 페이지</h1>
      <form onSubmit={SendHandler}>
        <input
          type="text"
          data-testid="new-todo-input"
          ref={inputRef}
          onChange={(e) => {
            setTodoList(e.target.value);
          }}
          value={todoList}
        />
        <button type="submit" data-testid="new-todo-add-button">
          추가하기
        </button>
      </form>

      <ul>
        {result.map((item) => (
          <li key={item.id}>
            <label>
              <input type="checkbox" />
              <span>{item.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button
              data-testid="delete-button"
              key={item.id}
              onClick={() => DeleteHandler(item.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
