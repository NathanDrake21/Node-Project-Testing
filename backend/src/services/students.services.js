const Student = require("../models/student.models");
const ExcelJS = require("exceljs");

const createStudent = async (data) => {
  return await Student.create(data);
};

const getStudents = async (queryParams) => {
  const { page = 1, limit = 5, search = "" } = queryParams;

  const query = {};

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const totalRecords = await Student.countDocuments(query);

  const students = await Student.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return {
    success: true,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: Number(page),
    students,
  };
};

const getStudentById = async (id) => {
  return await Student.findById(id);
};

const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};

const exportStudentsToExcel = async () => {
  const students = await Student.find();

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Students");

  worksheet.columns = [
    {
      header: "Name",
      key: "name",
      width: 30,
    },
    {
      header: "Email",
      key: "email",
      width: 40,
    },
    {
      header: "Age",
      key: "age",
      width: 15,
    },
  ];

  students.forEach((student) => {
    worksheet.addRow({
      name: student.name,
      email: student.email,
      age: student.age,
    });
  });

  return workbook;
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  exportStudentsToExcel,
};
