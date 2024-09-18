import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [newData, setNewData] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/create/getTask`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const latestTasks = await response.json();
      setNewData(latestTasks);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newData);
  useEffect(() => {
    fetchTasks();
  }, []);
  const apiUrl = "http://localhost:3001";
  const handleDelete = async (item) => {
    const id = item._id;
    console.log(id);
    try {
      const res = await fetch(`${apiUrl}/create/taskdelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error:", errorText);
      } else {
        setNewData((prevData) => prevData.filter((task) => task._id !== id));
        // Update your UI or state as needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/create/taskcreate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      });

      const data = await res.json();
      console.log(data);
      setNewData((prev) => [...prev, data.newTask]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setNewTask(e.target.value);
  }
  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" value={newTask} onChange={handleChange}></input>
          <button type="submit">Submit</button>
          <div className="latest">
            {newData?.map((item) => (
              <>
                <div key={item._id}>
                  <p>{item.text}</p>
                  <button onClick={() => handleDelete(item)} type="button">
                    Delete
                  </button>
                </div>
              </>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
