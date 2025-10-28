import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [puppies, setPuppies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age_est: "",
    current_kennel_number: "",
  });

  // Azure backend base URL
  const API_BASE = "https://puppy-backend-gfc2d7dthfd0g5cg.canadacentral-01.azurewebsites.net";

  // Fetch all puppies
  const fetchPuppies = async () => {
    try {
      const response = await axios.get(`${API_BASE}/puppies`);
      setPuppies(response.data);
    } catch (error) {
      console.error("Error fetching puppies:", error);
    }
  };

  useEffect(() => {
    fetchPuppies();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new puppy
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/puppies`, form);
      setForm({ name: "", breed: "", age_est: "", current_kennel_number: "" });
      fetchPuppies(); // Refresh list
    } catch (err) {
      console.error("Error adding puppy:", err);
    }
  };

  // Delete puppy
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/puppies/${id}`);
      fetchPuppies(); // Refresh list
    } catch (err) {
      console.error("Error deleting puppy:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Puppy List</h1>

      <h3>Add New Puppy</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <input
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
        />
        <br />
        <input
          name="age_est"
          placeholder="Age Estimate"
          value={form.age_est}
          onChange={handleChange}
        />
        <br />
        <input
          name="current_kennel_number"
          placeholder="Kennel Number"
          value={form.current_kennel_number}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Puppy</button>
      </form>

      <h3>All Puppies</h3>
      <ul>
        {puppies.map((pup) => (
          <li key={pup.id}>
            {pup.name} ({pup.breed}) — Age: {pup.age_est}, Kennel:{" "}
            {pup.current_kennel_number}{" "}
            <button onClick={() => handleDelete(pup.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
