import { useState } from "react";
import axios from "axios";

interface IFormData {
  name: string;
}

export const Form = () => {
  const [formData, setFormData] = useState<IFormData>({ name: "" });
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ name: "" });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, formData);
      console.log(response.data.message);
      handleReset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
