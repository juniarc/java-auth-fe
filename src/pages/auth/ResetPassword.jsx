import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/api";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const initialValue = {
    token: "",
    newPassword: "",
    confirmPassword: "",
  };

  const createSchema = Yup.object().shape({
    token: Yup.string().required("Token is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const onSubmit = async (value, { setSubmitting, setStatus }) => {
    try {
      resetPassword({
        token: value.token,
        newPassword: value.newPassword,
      });
      navigate("/login");
    } catch (error) {
      setStatus("Login Failed. Please try again");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <title>Reset Password</title>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: "40vw" }}>
          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={onSubmit}
          >
            {({ status }) => (
              <Form>
                <p>Check your email to get the token.</p>
                <div className="mb-3 ">
                  <label
                    htmlFor="token"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Token
                  </label>
                  <Field
                    type="string"
                    className="form-control"
                    name="token"
                    placeholder="Enter your token."
                  />
                  <ErrorMessage
                    name="token"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="newPassword"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    New Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    name="newPassword"
                    placeholder="Enter your new password."
                  />
                  <ErrorMessage
                    name="newPassword"
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
                    placeholder="Enter your confirm password."
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
                      Reset Password
                    </button>
                  </div>

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
