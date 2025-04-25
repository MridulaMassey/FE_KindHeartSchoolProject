import React, { useState } from "react";
//import AssignTeacher from "./AssignTeacher"; // Make sure these components exist
//import AddStudentToClass from "./AddStudentToClass";
//import CreateUser from "./CreateUser";
//import CreateRole from "./CreateRole";

const AdminDashboard: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>("");

  const renderSelectedComponent = () => {
    switch (selectedPage) {
      case "assign-teacher":
        return <AssignTeacher />;
      case "add-student":
        return <AddStudentToClass />;
      case "create-user":
        return <CreateUser />;
      case "create-role":
        return <CreateRole />;
      default:
        return (
          <div className="text-gray-600 mt-8 text-center">
            Please select an action from the menu.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
        <button
          className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
          onClick={() => setSelectedPage("assign-teacher")}
        >
          Assign Teacher
        </button>

        <button
          className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600"
          onClick={() => setSelectedPage("add-student")}
        >
          Add Student to Class
        </button>

        <button
          className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600"
          onClick={() => setSelectedPage("create-user")}
        >
          Create User
        </button>

        <button
          className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600"
          onClick={() => setSelectedPage("create-role")}
        >
          Create Role
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        {renderSelectedComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
