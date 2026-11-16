import Swal from "sweetalert2";
function StudentTable({ students, onEdit, onDelete }) {
  if (!students?.length) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body text-center py-5">
          <h5 className="text-muted">No Students Found</h5>

          {/* <p className="text-muted mb-0">Try changing your search criteria.</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <strong>{student.name}</strong>
                  </td>

                  <td>{student.email}</td>

                  <td>
                    <span className="badge bg-secondary">{student.age}</span>
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Delete Student?",
                          text: `Are you sure you want to delete ${student.name}?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#dc3545",
                          confirmButtonText: "Delete",
                          cancelButtonText: "Cancel",
                        });

                        if (result.isConfirmed) {
                          onDelete(student._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentTable;
