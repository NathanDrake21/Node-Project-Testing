import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../services/studentService";
import { useStudents } from "../hooks/useStudents";
import StudentTable from "../components/StudentTable";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/errorHandler";

function StudentListPage() {
  const navigate = useNavigate();

  const {
    students,
    fetchStudents,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
  } = useStudents();

  const debouncedSearch = useMemo(() => {
    let timer;

    return (value) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        setPage(1);
        setSearch(value);
      }, 500);
    };
  }, []);

  //   console.log(students, search, setSearch, page, setPage, totalPages);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success("Student Deleted successfully");

      fetchStudents();
    } catch (error) {
      handleApiError(error);
      // console.error(error);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Student Management</h2>

          <p className="text-muted mb-0">
            Search, manage and update student records
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add Student
        </button>
      </div>

      {/* Search */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between gap-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email..."
              // value={search}
              onChange={(e) => {
                debouncedSearch(e.target.value);
              }}
            />

            <button
              className="btn btn-success btn-sm"
              style={{ width: "100px", fontSize: "12px" }}
              onClick={() =>
                window.open("http://localhost:5000/api/students/export/excel")
              }
            >
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <StudentTable
        students={students}
        onEdit={(student) => navigate(`/edit/${student._id}`)}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <div>
          <strong>
            Page {page} of {totalPages}
          </strong>
        </div>

        <button
          className="btn btn-outline-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentListPage;
