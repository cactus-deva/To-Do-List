import React from "react"
import { useState } from "react";


type Props = {}

interface Item {
  id: number;
  name: string;
  lastName: string;
  status: number;
}

export function App({ }: Props) {

  const [todos, setTodos] = useState<Item[]>([]);
  var [todosFind,  setTodosFind] = useState<Item[]>([])

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [editName, setEditName] = useState("")
  const [editLastName, setEditLastName] = useState("")

  const [value, setValue] = useState("")

  function addPerson() {
    const newTodo: Item = {
      id: + new Date(),
      name: name,
      lastName: lastName,
      status: 1,
    }
    setTodos([...todos, newTodo])
    setName("");
    setLastName("");
  }

  function editPerson(index: number) {
    todos[index].status = 8;
    setEditName(todos[index].name);
    setEditLastName(todos[index].lastName);
    setTodos([...todos])
  }

  function savePerson(index: number) {
    todos[index].name = editName;
    todos[index].lastName = editLastName;
    todos[index].status = 1;
    setTodos([...todos])
  }

  function removePerson(index: number) {
    todos.splice(index, 1);
    setTodos([...todos])
  }

  function backEdit(index: number) {
    todos[index].status = 1;
    setTodos([...todos])
  }

  function findData (event:React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    var textFind = event.target.value;

    if(textFind.length > 2) {
      const array = todos.filter((todo) => todo.name.includes(textFind) || todo.lastName.includes(textFind));
      todosFind = array;
      setTodosFind([...todosFind])
    }
    
  }
  return (
    <div>
      <h2>APP TO DO LIST</h2>

      <ul>
        {
          todos.map((todo: Item, index : number) => {
            if (todo.status === 1) {
              return (
                <li key={todo.id}>
                  ชื่อ: {todo.name} สกุล: {todo.lastName}
                  <button onClick={() => editPerson(index)}>แก้ไข</button>
                  <button onClick={() => removePerson(index)}>ลบข้อมูล</button>
                </li>
              )
            } else {
              return (
                <li key={todo.id}>
                  ชื่อ:
                  <input value={editName} type="text" onChange={(e) => setEditName(e.target.value)} />
                  สกุล: 
                  <input value={editLastName} type="text" onChange={(e) => setEditLastName(e.target.value)} />
                  <button onClick={() => savePerson(index)}>บันทึกช้อมูล</button>
                  <button onClick={() => backEdit(index)}>ยกเลิก</button>
                </li>
              )
            }

          })
        }
      </ul>
      <form>
        <label>ชื่อ:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>สกุล:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </form>
      <button onClick={addPerson}>Submit</button>

      <h3>ค้นหาข้อมูล</h3>
      <input type="text" value={value} onChange={findData} onKeyDown={(e) => {if(e.key === "Backspace") {setValue("")}}}/>
      <ul>
        {
          todosFind.map((todo:Item) => {
            return (
              <li key={todo.id}>
                  ชื่อ: {todo.name} สกุล: {todo.lastName}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App
