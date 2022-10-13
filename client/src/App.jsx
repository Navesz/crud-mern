import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [foodInput, setFoodInput] = useState("");
  const [daysInput, setDaysInput] = useState("");
  const [foodList, setFoodList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [EditingId, setEditingId] = useState("");

  const serverUrl = "http://localhost:5000";

  const addToList = async () => {
    await axios.post(`${serverUrl}/insert`, {
      food: foodInput,
      days: daysInput,
    });
    initList();
  };

  const requestList = async () => {
    const res = await axios.get(`${serverUrl}/read`);
    const data = await res.data;
    setFoodList(data);
  };

  const initEdit = (id, food, days) => {
    setIsEditing(true);
    setEditingId(id);
    setFoodInput(food);
    setDaysInput(days);
  };

  const initList = () => {
    setEditingId("");
    setFoodInput("");
    setDaysInput("");
    requestList();
  };

  const editById = async () => {
    await axios.put(`${serverUrl}/edit`, {
      id: EditingId,
      food: foodInput,
      days: daysInput,
    });
    setIsEditing(false);
    initList();
  };

  const deleteById = async (id) => {
    await axios.delete(`${serverUrl}/delete/${id}`);
    initList();
  };

  useEffect(() => {
    axios.get(`${serverUrl}/read`).then((res) => {
      setFoodList(res.data);
    });
  }, []);

  return (
    <div className="App bg-dark">
      <div className="food-add">
        <h1>Food CRUD with MERM</h1>
        <label>Food Name:</label>
        <input
          type="text"
          onChange={(e) => setFoodInput(e.target.value)}
          value={foodInput}
        />
        <label>Days Since You Ate It:</label>
        <input
          type="number"
          onChange={(e) => setDaysInput(e.target.value)}
          value={daysInput}
        />
        <button onClick={() => (isEditing ? editById() : addToList())}>
          {isEditing ? "Update" : "Add To List"}
        </button>
      </div>

      <Table className="w-50" variant="dark" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Food</th>
            <th>Days</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((item) => (
            <tr key={item._id}>
              <td>{item.foodName}</td>
              <td>{item.daysSinceIAte}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => {
                    initEdit(item._id, item.foodName, item.daysSinceIAte);
                  }}
                >
                  EDIT
                </Button>{" "}
                <Button
                  variant="danger"
                  itemID={item._id}
                  size="sm"
                  onClick={() => {
                    deleteById(item._id);
                  }}
                >
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
