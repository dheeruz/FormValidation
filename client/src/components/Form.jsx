import React, { useState } from "react";
import axios from "axios";
import "./form.css";

function Form() {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    employeeId: false,
    email: false,
    phoneNumber: false,
    department: false,
    dateOfJoining: false,
    role: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validate({ ...form, [name]: form[name] });
  };

  const validate = (formData) => {
    let tempErrors = {};
    if (!formData.name) {
      tempErrors.name = "Name is required.";
    }
    if (!formData.employeeId || formData.employeeId.length > 10) {
      tempErrors.employeeId = "Valid Employee ID is required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Valid Email is required.";
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Valid 10-digit phone number is required.";
    }
    if (!formData.department) {
      tempErrors.department = "Department is required.";
    }
    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date()) {
      tempErrors.dateOfJoining = "Valid date is required.";
    }
    if (!formData.role) {
      tempErrors.role = "Role is required.";
    }

    setErrors(tempErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate(form); 
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await axios.post("http://localhost:3001/emp", form);
      alert(res.data.message);
      setForm({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
      });
      setTouched({
        name: false,
        employeeId: false,
        email: false,
        phoneNumber: false,
        department: false,
        dateOfJoining: false,
        role: false,
      }); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Submission failed!";
      alert(errorMessage);
    }
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
        />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <input
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Employee ID"
        />
        {touched.employeeId && errors.employeeId && <p className="error">{errors.employeeId}</p>}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Phone Number"
        />
        {touched.phoneNumber && errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select Department</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Customer Service">Customer Service</option>
          <option value="IT Support">IT Support</option>
          <option value="Operations">Operations</option>
          <option value="Logistics">Logistics</option>
        </select>
        {touched.department && errors.department && <p className="error">{errors.department}</p>}

        <input
          name="dateOfJoining"
          type="date"
          value={form.dateOfJoining}
          onChange={handleChange}
          onBlur={handleBlur}
          max={new Date().toISOString().split("T")[0]} 
        />
        {touched.dateOfJoining && errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Role"
        />
        {touched.role && errors.role && <p className="error">{errors.role}</p>}

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
        <button type="reset" onClick={() => setForm({})}>Reset</button>
      </form>
    </div>
  );
}

export default Form;