import React, { useState } from "react";

interface FormData {
  creditScore: string;
  geography: string;
  gender: string;
  age: string;
  tenure: string;
  balance: string;
  numofproducts: string;
  hascrcard: string;
  isactivemember: string;
  estimatedsalary: string;
}

interface Prediction {
  model: string;
  prediction: string;
}

interface ResponseData {
  customer: Record<string, string>;
  predictions: Prediction[];
}

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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

  const [response, setResponse] = useState<ResponseData | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    // Check for missing or invalid fields
    const isFormValid = Object.values(formData).every((value) => value !== "");
    if (!isFormValid) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error submitting the form");
      }

      const data: ResponseData = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Banking Churn Prediction
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credit Score */}
          <div>
            <label className="block text-sm font-medium mb-2">Credit Score:</label>
            <input
              type="number"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={300}
              max={900}
              required
            />
          </div>

          {/* Geography */}
          <div>
            <label className="block text-sm font-medium mb-2">Geography:</label>
            <select
              name="geography"
              value={formData.geography}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Select--</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Spain">Spain</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
              max={200}
            />
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-sm font-medium mb-2">Tenure:</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
            />
          </div>

          {/* Balance */}
          <div>
            <label className="block text-sm font-medium mb-2">Balance:</label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
            />
          </div>

          {/* Number of Products */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Products:
            </label>
            <select
              name="numofproducts"
              value={formData.numofproducts}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Select--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          {/* Has Credit Card */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Has Credit Card:
            </label>
            <select
              name="hascrcard"
              value={formData.hascrcard}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Select--</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          {/* Is Active Member */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Is Active Member:
            </label>
            <select
              name="isactivemember"
              value={formData.isactivemember}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Select--</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          {/* Estimated Salary */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Estimated Salary:
            </label>
            <input
              type="number"
              name="estimatedsalary"
              value={formData.estimatedsalary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Predict
        </button>
      </form>

      {response && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Customer Data:</h2>
          <pre className="bg-white p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(response.customer, null, 2)}
          </pre>
          <h2 className="text-lg font-semibold mt-6 text-gray-700">
            Model Predictions:
          </h2>
          <ul className="list-disc list-inside mt-4">
            {response.predictions.map((pred, index) => (
              <li key={index}>
                <strong>{pred.model}</strong>: {pred.prediction}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputForm;
