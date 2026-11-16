import { useNavigate } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import { createStudent } from "../services/studentService";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/errorHandler";
import { useState } from "react";

function AddStudentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createStudent(data);
      toast.success("Student Added successfully");
      navigate("/");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-dark mb-4"
        onClick={() => navigate("/")}
      >
        ← Back to Students
      </button>
      <div className="mb-4">
        <h2 className="mb-1">Add Student</h2>

        <p className="text-muted mb-0">Create a new student record</p>
      </div>

      <StudentForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export default AddStudentPage;
