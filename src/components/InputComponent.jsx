import React from "react";

export const InputComponent = (props) => {
  const { todoText, setTodoText, onClickAddTodo } = props;

  const handleChanged = (e) => setTodoText(e.target.value);

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODO入力"
          type="text"
          value={todoText}
          onChange={handleChanged}
        />
        <button onClick={onClickAddTodo}>追加</button>
      </div>
    </>
  );
};
