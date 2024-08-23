/*
import { useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [tasks, setTasks] = useState(["Wash Car", "Feed Dog", "Exercise"]);
  const [newTask, setNewTask] = useState("");
  const [strikes, setStrikes] = useState({ null: true });

  const handleStrike = (index) => {
    setStrikes((prevStrikes) => ({
      ...prevStrikes,
      [index]: !prevStrikes[index], // Toggle the strike-through state for the specific item
    }));
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddButton = () => {
    newTask.trim().length === 0
      ? Swal.fire({
          title: "😉",
          text: "Hey Genius, you need to add a todo first.",
          icon: "warning",
        })
      : tasks.length >= 5
      ? Swal.fire({
          title: "😉",
          text: "You can only have 5 todo's on your list.  Get off your butt and complete them!",
          icon: "warning",
        })
      : (setTasks((prevTask) => [...prevTask, newTask]),
        setStrikes((prevStrikes) => ({
          ...prevStrikes,
          [tasks.length]: false,
        })),
        setNewTask(""));
  };

  const handleDelete = (indexToDelete) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#987eff",
      cancelButtonColor: "#F92F60",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks((prevTasks) =>
          prevTasks.filter((_, index) => index !== indexToDelete)
        );
        setStrikes((prevStrikes) => {
          const newStrikes = { ...prevStrikes };
          delete newStrikes[indexToDelete];
          return newStrikes;
        });
        Swal.fire({
          title: "Boom!",
          text: "Your todo has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const clearAll = () => {
    if (!tasks.length <= 0) {
      Swal.fire({
        title: "Are you sure you want to remove all of your todos?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#987eff",
        cancelButtonColor: "#F92F60",
        confirmButtonText: "Yes, clear them!",
      }).then((result) => {
        if (result.isConfirmed) {
          setTasks([]);
          setStrikes({});
          Swal.fire({
            title: "Boom!",
            text: "Your todo list has been cleared.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        title: "",
        text: "No todos to clear.",
        icon: "info",
      });
    }
  };

  return (
    <div className="main-container">
      <div className="todo-container">
        <h1>To Do List</h1>
        <div className="todoInputButtonContainer">
          <input
            type="text"
            className="todoInput"
            placeholder="Enter To-Do Item..."
            onChange={handleInputChange}
            value={newTask}
            maxLength={50}
          />

          <button onClick={() => handleAddButton()} className="todoAdd">
            Add
          </button>
        </div>
        <ul className="todoList">
          {tasks.map((t, i) => (
            <div key={i} className="list-button-container">
              <li
                style={{
                  textDecoration: strikes[i] === true ? "line-through" : "none",
                }}
              >
                {t}
              </li>

              <div className="deleteStrikeContainer">
                <div
                  onClick={() => handleDelete(i)}
                  className="listDeleteButton"
                >
                  ❌
                </div>
                <div
                  className="check-mark"
                  onDoubleClick={() => handleStrike(i)}
                >
                  ✔️
                </div>
              </div>
            </div>
          ))}
        </ul>
        <button onClick={() => clearAll()} className="clearAll">
          Clear All
        </button>
      </div>
    </div>
  );
}


export default App;
*/

import { useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [tasks, setTasks] = useState([
    { text: "Wash Car", struck: false },
    { text: "Feed Dog", struck: false },
    { text: "Exercise", struck: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const handleStrike = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, struck: !task.struck } : task
      )
    );
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddButton = () => {
    if (newTask.trim().length === 0) {
      Swal.fire({
        title: "😉",
        text: "Hey Genius, you need to add a todo first.",
        icon: "warning",
      });
    } else if (tasks.length >= 5) {
      Swal.fire({
        title: "😉",
        text: "You can only have 5 todo's on your list.  Get off your butt and complete them!",
        icon: "warning",
      });
    } else {
      setTasks((prevTasks) => [...prevTasks, { text: newTask, struck: false }]);
      setNewTask("");
    }
  };

  const handleDelete = (indexToDelete) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#987eff",
      cancelButtonColor: "#F92F60",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks((prevTasks) =>
          prevTasks.filter((_, index) => index !== indexToDelete)
        );
        Swal.fire({
          title: "Boom!",
          text: "Your todo has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const clearAll = () => {
    if (tasks.length > 0) {
      Swal.fire({
        title: "Are you sure you want to remove all of your todos?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#987eff",
        cancelButtonColor: "#F92F60",
        confirmButtonText: "Yes, clear them!",
      }).then((result) => {
        if (result.isConfirmed) {
          setTasks([]);
          Swal.fire({
            title: "Boom!",
            text: "Your todo list has been cleared.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        title: "",
        text: "No todos to clear.",
        icon: "info",
      });
    }
  };

  return (
    <div className="main-container">
      <div className="todo-container">
        <h1>To Do List</h1>
        <div className="todoInputButtonContainer">
          <input
            type="text"
            className="todoInput"
            placeholder="Enter To-Do Item..."
            onChange={handleInputChange}
            value={newTask}
            maxLength={50}
          />
          <button onClick={handleAddButton} className="todoAdd">
            Add
          </button>
        </div>
        <ul className="todoList">
          {tasks.map((task, i) => (
            <div key={i} className="list-button-container">
              <li
                style={{
                  textDecoration: task.struck ? "line-through" : "none",
                }}
              >
                {task.text}
              </li>
              <div className="deleteStrikeContainer">
                <div
                  onClick={() => handleDelete(i)}
                  className="listDeleteButton"
                >
                  ❌
                </div>
                <div
                  className="check-mark"
                  onDoubleClick={() => handleStrike(i)}
                >
                  ✔️
                </div>
              </div>
            </div>
          ))}
        </ul>
        <button onClick={clearAll} className="clearAll">
          Clear All
        </button>
      </div>
    </div>
  );
}

export default App;
