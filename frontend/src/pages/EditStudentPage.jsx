import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, updateStudent } from "../services/studentService";
import { useEffect, useState } from "react";

import StudentForm from "../components/StudentForm";
import { handleApiError } from "../utils/errorHandler";
import { toast } from "react-toastify";

function EditStudentPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const response = await getStudentById(id);

      setStudent(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setSubmitLoading(true);

      await updateStudent(id, data);
      toast.success("Student updated successfully");

      navigate("/");
    } catch (error) {
      console.log(error.response);
      handleApiError(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Back Button */}
      <button
        className="btn btn-outline-dark mb-4"
        onClick={() => navigate("/")}
      >
        ← Back to Students
      </button>

      {/* Page Header */}
      <div className="mb-4">
        <h2 className="mb-1">Edit Student</h2>

        <p className="text-muted mb-0">Update student information</p>
      </div>

      <StudentForm
        initialValues={student}
        onSubmit={handleSubmit}
        loading={submitLoading}
      />
    </div>
  );
}

export default EditStudentPage;
