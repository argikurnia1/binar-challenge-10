import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { authFirebase } from "../../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Footer from "../../../components/Layout/Footer/Footer";
import Navbar from "../../../components/Layout/Nav/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const userLoginData = useSelector((state) => {
    return state.userLoginReducer.loginUser;
  });

  useEffect(() => {
    if (userLoginData[0]) {
      router.push("/");
    }
  }, [userLoginData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: `${process.env.NEXT_APP_FORGOT_PASSWORD_REDIRECT}${process.env.NEXT_APP_PORT}`,
      handleCodeInApp: true,
    };

    sendPasswordResetEmail(authFirebase, email, config)
      .then(() => {
        setEmail("");
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div>
        <Navbar />
        <main className="min-vh-100" style={{ paddingTop: "9rem" }}>
          <Container>
            <Form onSubmit={handleSubmit}>
              <h3 className="text-white">Reset Password</h3>
              <p className="text-secondary">
                This verification email will be sent to your mailbox Please
                check your mailbox.
              </p>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={emailChangeHandler}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Reset Password
              </Button>
            </Form>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
