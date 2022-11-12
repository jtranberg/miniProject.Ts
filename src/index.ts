interface ToDo {
    text: string;
    completed: boolean;
}
const todos: ToDo [] = readTodos();
const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;
todos.forEach(createTodo);

function readTodos(): ToDo [] { 
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
   return JSON.parse(todosJSON);  
}
function saveTodos () {
    localStorage.setItem("todos", JSON.stringify( todos))  
};

function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const newTodo: ToDo = {
         text: input.value,
         completed: false,
        };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
 };

 function createTodo(todo: ToDo) {
     const newLI = document.createElement("li");
     const checkbox = document.createElement("input");
     checkbox.type = "checkbox";
     checkbox.checked = todo.completed;
     checkbox.addEventListener("change", function()  {
        todo.completed = checkbox.checked;
        saveTodos();
     });
     newLI.append(checkbox);
     newLI.append( todo.text);
     list.append(newLI);
 }

form.addEventListener("submit", handleSubmit);



