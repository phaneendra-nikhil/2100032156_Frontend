import React, { useState } from "react";
import "./App.css";

function App() {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  const handleEmployeeClick = () => {
    setShowEmployeeForm(true);
  };

  const handleAddEmployeeClick = () => {
    setShowAddEmployeeForm(true);
  };

  const handleCloseForm = () => {
    setShowEmployeeForm(false);
    setShowAddEmployeeForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newEmployee = Object.fromEntries(formData.entries());
    setEmployees([...employees, newEmployee]);
    handleCloseForm();
  };

  const handleEditEmployee = (index, updatedData) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = { ...updatedEmployees[index], ...updatedData };
    setEmployees(updatedEmployees);
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="button-container">
          <div className="nav-icon">
            <h1>
              Naukar<div className="span">.io</div>
            </h1>
          </div>
          <div className="btn-content">
            <button className="button">
              Home
            </button>
            <button className="button" onClick={handleEmployeeClick}>
              Employee
            </button>
            {employees.length > 0 && (
              <button className="button-add" onClick={handleAddEmployeeClick}>
                Add Employee
              </button>
            )}
          </div>
        </div>
        <div className="intro">
          <h1>Welcome to Employee Management System</h1>
          <p>This is a simple employee management system.</p>
        </div>
      </header>
      {(showEmployeeForm || showAddEmployeeForm) && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseForm}>
              &times;
            </span>
            <h2>{showEmployeeForm ? "Add Employee" : "Add New Employee"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input type="text" name="FirstName" required />
              </label>
              <label>
                Last Name:
                <input type="text" name="LastName" required />
              </label>
              <label>
                Gender:
                <input type="text" name="Gender" required />
              </label>
              <label>
                Age:
                <input type="number" name="Age" required />
              </label>
              <label>
                Salary:
                <input type="number" name="Salary" required />
              </label>
              <label>
                Department:
                <input type="text" name="Department" required />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseDetails}>
              &times;
            </span>
            <h2>Employee Details</h2>
            <div>
              <strong>First Name:</strong> {selectedEmployee.FirstName}
            </div>
            <div>
              <strong>Last Name:</strong> {selectedEmployee.LastName}
            </div>
            <div>
              <strong>Gender:</strong> {selectedEmployee.Gender}
            </div>
            <div>
              <strong>Age:</strong> {selectedEmployee.Age}
            </div>
            <div>
              <strong>Salary:</strong> {selectedEmployee.Salary}
            </div>
            <div>
              <strong>Department:</strong> {selectedEmployee.Department}
            </div>
          </div>
        </div>
      )}
      <div className="employee-table">
        {employees.length > 0 && (
          <>
            <h2>Employee List</h2>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "lightgrey" : "white",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{employee.FirstName}</td>
                    <td>{employee.LastName}</td>
                    <td>{employee.Gender}</td>
                    <td>{employee.Department}</td>
                    <td>${employee.Salary}</td>
                    <td>{employee.Age > 40 ? "Senior" : "Junior"}</td>
                    <td>
                      <button
                        className="button-edit"
                        onClick={() =>
                          handleEditEmployee(index, { FirstName: "Updated" })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="button-delete"
                        onClick={() => handleDeleteEmployee(index)}
                      >
                        Delete
                      </button>
                      <button
                        className="button-details"
                        onClick={() => handleViewDetails(employee)}
                      >
                        Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2024 All rights reserved - naukar<div className="span">.io</div>Designed and Developed by Phaneendra-nikhil</p>
      </footer>
    </div>
  );
}

export default App;
