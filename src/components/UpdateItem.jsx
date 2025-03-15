import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
  const [formData, setFormData] = useState({ name: "", status: "" });

  useEffect(() => {
    if (item) {
      setFormData({ name: item.name, status: item.status });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();
      alert("Item updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating item");
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Status: </label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateItem;


