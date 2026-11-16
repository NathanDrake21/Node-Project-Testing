const studentService = require("../services/students.services");

exports.createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const students = await studentService.getStudents(req.query);

    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

exports.getStudent = async (req, res, next) => {
  const student = await studentService.getStudentById(req.params.id);

  res.json(student);
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);

    res.json(student);
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    await studentService.deleteStudent(req.params.id);

    res.json({
      message: "Student Deleted",
    });
  } catch (error) {
    next(error);
  }
};

exports.exportStudents = async (req, res) => {
  const workbook = await studentService.exportStudentsToExcel();

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

  await workbook.xlsx.write(res);

  res.end();
};
