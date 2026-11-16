import { useState } from "react";

import { validateStudent } from "../utils/validation";

function StudentForm({ initialValues, onSubmit, loading = false }) {
  const [form, setForm] = useState(
    initialValues || {
      name: "",
      email: "",
      age: "",
    },
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const validationErrors = validateStudent(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter student name"
              onChange={handleChange}
            />

            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>

            <input
              type="email"
              name="email"
              value={form.email}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              onChange={handleChange}
            />

            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Age</label>

            <input
              type="number"
              name="age"
              value={form.age}
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              placeholder="Enter age"
              onChange={handleChange}
            />

            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setForm({
                  name: "",
                  email: "",
                  age: "",
                });

                setErrors({});
              }}
            >
              Clear
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Saving...
                </>
              ) : initialValues ? (
                "Update Student"
              ) : (
                "Save Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
