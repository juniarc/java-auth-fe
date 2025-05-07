import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswod } from "../../api/api";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const initialValue = {
    email: "",
    password: "",
  };

  const createSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const onSubmit = async (value, { setSubmitting, setStatus }) => {
    try {
      forgotPasswod(value);
      navigate("/reset-password");
    } catch (error) {
      setStatus("Login Failed. Please try again");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <title>Forgot Password</title>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: "40vw" }}>
          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={onSubmit}
          >
            {({ status }) => (
              <Form>
                <div className="mb-3 ">
                  <label
                    htmlFor="email"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Email
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your registered email."
                  />
                  <ErrorMessage
                    name="email"
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
                      Submit
                    </button>
                  </div>
                  <p className="mt-3">
                    Don't have an account ? <Link to="/signup">Sign Up</Link>
                  </p>
                  <Link to="/forgot-password">Forgot Password ?</Link>
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
