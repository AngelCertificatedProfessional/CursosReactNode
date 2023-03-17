import { useTodos } from "../hooks";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

export const TodoApp = () => {

  const {todos,handleNewTodo,handleToggleTodo,handleDeleteTodo} = useTodos()

  return (
    <>
      <h1>
          TodoApp: {todos.length}
        <small>
          Pendientes: {todos.filter(todo => todo.done).length}
        </small>
      </h1>

      <div className="row">
        <div className="col-7">
          <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onToggleTodo={handleToggleTodo}/>
        </div>

        <div className="col-5">
          <h4>Agregar TODO</h4>
          <hr/>
          <TodoAdd onNewTodo = {handleNewTodo}/>
        </div>
      </div>
    </>
  )
}