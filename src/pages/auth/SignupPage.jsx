import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/datePicker.css";
import * as Yup from "yup";

function DatePickerFiled({ field, form }) {
  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => form.setFieldValue(field.name, date)}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      placeholderText="Select date"
    />
  );
}

export default function SignupPage() {
  const navigate = useNavigate();

  const initialValue = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    name: "",
  };
  const createSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    name: Yup.string().required("Name is required"),
  });

  const onSubmit = async (value, { setSubmitting, setStatus }) => {
    try {
      await register({
        username: value.username,
        email: value.email,
        password: value.password,
        dateOfBirth: value.dateOfBirth,
        gender: value.gender,
        phoneNumber: value.phoneNumber,
        name: value.name,
      });
      navigate("/login");
    } catch (error) {
      setStatus("Register failed. Please try again");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <title>Sign Up</title>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style={{ width: "40vw" }}>
          <h2 class="text-center mb-5">Sign Up</h2>

          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={onSubmit}
          >
            {({ status }) => (
              <Form>
                <div className="mb-3 ">
                  <label
                    htmlFor="name"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="username"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="email"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>

                <div className="mb-3 ">
                  <label
                    htmlFor="password"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Enter your Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="phoneNumber"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    placeholder="Enter your Phone Number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    class="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Date of Birth
                  </label>
                  <Field
                    type="date"
                    class="form-control"
                    name="dateOfBirth"
                    component={DatePickerFiled}
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div class="mb-3">
                  <label
                    class="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Gender
                  </label>
                  <Field class="form-select" name="gender" as="select">
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>

                <div class="row" style={{ width: "100%" }}>
                  <div class="mt-3">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      Sign Up
                    </button>
                  </div>
                  <p className="mt-3">
                    Already have an account ? <Link to="/login">Login</Link>
                  </p>
                  {status && (
                    <p className="text-danger text-center mt-3">{status}</p>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
