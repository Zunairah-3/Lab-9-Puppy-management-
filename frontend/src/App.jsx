import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [puppies, setPuppies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age_est: "",
    current_kennel_number: "",
  });

  // Fetch puppies
  useEffect(() => {
    fetchPuppies();
  }, []);

  const fetchPuppies = async () => {
    try {
      const res = await axios.get(`${API}/puppies`
);
      setPuppies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add puppy
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/puppies`
, form);
      setForm({ name: "", breed: "", age_est: "", current_kennel_number: "" });
      fetchPuppies();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete puppy
const handleDelete = async (id) => {
  try {
    await axios.delete(`${API}/puppies/${id}`);
    fetchPuppies();
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Puppy List</h1>
      <ul>
        {puppies.map((p) => (
          <li key={p.pet_id}>
            {p.name} – {p.breed || "Unknown breed"} – Age: {p.age_est || "?"} – Kennel:{" "}
            {p.current_kennel_number || "N/A"}{" "}
            <button onClick={() => handleDelete(p.pet_id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Puppy</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age_est"
          placeholder="Estimated Age"
          value={form.age_est}
          onChange={handleChange}
        />
        <input
          type="number"
          name="current_kennel_number"
          placeholder="Kennel Number"
          value={form.current_kennel_number}
          onChange={handleChange}
        />
        <button type="submit" style={{ marginTop: "1rem" }}>Add Puppy</button>
      </form>
    </div>
  );
}

export default App;
