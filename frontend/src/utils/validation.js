export const validateStudent = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  } else if (form.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!form.age) {
    errors.age = "Age is required";
  } else if (Number(form.age) < 1) {
    errors.age = "Age must be greater than 0";
  } else if (Number(form.age) > 120) {
    errors.age = "Please enter a valid age";
  }

  return errors;
};
