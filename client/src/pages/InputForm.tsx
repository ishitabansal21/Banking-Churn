import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
    <div className="max-w-3xl mx-auto bg-gray-300 p-8 shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 ">
        Banking Churn Prediction
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credit Score */}
          <div>
            <Label htmlFor="creditScore">Credit Score:</Label>
            <input
              id="creditScore"
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
            <Label htmlFor="geography">Geography:</Label>
            <select
              id="geography"
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
            <Label htmlFor="gender">Gender:</Label>
            <select
              id="gender"
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
            <Label htmlFor="age">Age:</Label>
            <input
              id="age"
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
            <Label htmlFor="tenure">Tenure:</Label>
            <input
              id="tenure"
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
            <Label htmlFor="balance">Balance:</Label>
            <input
              id="balance"
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
            <Label htmlFor="numofproducts">Number of Products:</Label>
            <select
              id="numofproducts"
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
            <Label htmlFor="hascrcard">Has Credit Card:</Label>
            <select
              id="hascrcard"
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
            <Label htmlFor="isactivemember">Is Active Member:</Label>
            <select
              id="isactivemember"
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
            <Label htmlFor="estimatedsalary">Estimated Salary:</Label>
            <input
              id="estimatedsalary"
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

        <Button
          type="submit"
          className="w-full"
        >
          Predict
        </Button>
      </form>

      {response && (
        <div className=" flex mt-8 justify-around bg-gray-50 p-6 rounded-lg shadow-md">
          <div>
            <h2 className="text-lg font-semibold  text-gray-700">Customer Data:</h2>
            <pre className=" p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(response.customer, null, 2)}
            </pre>
          </div>
          <div>
            <h2 className="text-lg font-semibold  text-gray-700">
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
        </div>
      )}
    </div>
  );
};

export default InputForm;
