import api from "../api/axios";

// export const getStudents = () => api.get("/students");
export const getStudents = (params) =>
  api.get("/students", {
    params,
  });

export const getStudentById = (id) => api.get(`/students/${id}`);

export const createStudent = (payload) => api.post("/students", payload);

export const updateStudent = (id, payload) =>
  api.put(`/students/${id}`, payload);

export const deleteStudent = (id) => api.delete(`/students/${id}`);
