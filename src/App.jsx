import React, { useState } from "react";
import "./style.css";
import axios from "axios";

import { InputComponent } from "./components/InputComponent";

export const App = () => {
  //console.log("App")
  const [todoText, setTodoText] = useState("");

  const [incompleteTodos, setIncompleteTodos] = useState([
    "あああああ",
    "いいいいい",
  ]);
  const [completeTodos, setCompleteTodos] = useState(["ううううう"]);

  const onClickAddTodo = () => {
    if (todoText.length === 0) return;
    setIncompleteTodos([...incompleteTodos, todoText]);
    registerSpreadSheet(todoText);
    setTodoText("");
  };

  const registerSpreadSheet = async (todoText) => {
    await axios.post(process.env.API_URL, {
      message: "value1",
    });
  };

  const onClickDeleteTodo = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickCompleteTodo = (index) => {
    const newTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newTodos);

    const oldTodos = [...incompleteTodos];
    oldTodos.splice(index, 1);
    setIncompleteTodos(oldTodos);
  };

  const onClickBackTodo = (index) => {
    const newTodos = [...completeTodos];
    newTodos.splice(index, 1);
    setCompleteTodos(newTodos);

    const oldTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(oldTodos);
  };

  return (
    <>
      <InputComponent
        todoText={todoText}
        setTodoText={setTodoText}
        onClickAddTodo={onClickAddTodo}
      />

      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div className="list-row" key={todo}>
                <li>{todo}</li>
                <button onClick={() => onClickCompleteTodo(index)}>完了</button>
                <button onClick={() => onClickDeleteTodo(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div className="list-row" key={todo}>
                <li>{todo}</li>
                <button onClick={() => onClickBackTodo(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
