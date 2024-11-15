import React, { useState } from "react";
import axios from "axios";

function InputForm() {
  const [formData, setFormData] = useState({
    creditScore: "",
    geography: "",
    gender: "",
    age: "",
    tenure: "",
    balance: "",
    numofproducts: "",
    hascrcard: "",
    isactivemember: "",
    estimatedsalary: "",
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Banking Churn Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>Credit Score:</label>
        <input type="number" name="creditScore" onChange={handleChange} required />

        <label>Geography:</label>
        <select name="geography" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Spain">Spain</option>
        </select>

        <label>Gender:</label>
        <select name="gender" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Age:</label>
        <input type="number" name="age" onChange={handleChange} required />

        <label>Tenure:</label>
        <input type="number" name="tenure" onChange={handleChange} required />

        <label>Balance:</label>
        <input type="number" name="balance" onChange={handleChange} required />

        <label>Number of Products:</label>
        <select name="numofproducts" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <label>Has Credit Card:</label>
        <select name="hascrcard" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Is Active Member:</label>
        <select name="isactivemember" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Estimated Salary:</label>
        <input type="number" name="estimatedsalary" onChange={handleChange} required />

        <button type="submit">Predict</button>
      </form>

      {response && (
        <div>
          <h2>Customer Data:</h2>
          <pre>{JSON.stringify(response.customer, null, 2)}</pre>
          <h2>Model Predictions:</h2>
          <ul>
            {response.predictions.map((pred, index) => (
              <li key={index}>
                {pred.model}: {pred.prediction}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InputForm;
