import { useEffect, useState } from "react";

import * as studentService from "../services/studentService";

export const useStudents = () => {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await studentService.getStudents({
        page,
        limit: 5,
        search,
      });

      setStudents(response.data.students);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  return {
    students,
    loading,
    fetchStudents,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
  };
};
