import React from "react";
import Form from "../../components/form/add.form";
import TodoList from "../../components/lists/todo.lists";

export default function TasksPage() {
  return (
    <>
      <Form />
      <TodoList />
    </>
  );
}
