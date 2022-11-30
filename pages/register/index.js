import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { authFirebase } from "../../config/firebase"
import { registerUser } from "../../actions/fb_database";
import { loadingAction } from "../../redux/reducers/loadingReducer";

import Form from "react-bootstrap/Form";
import style from "../../styles/register/styles.module.css";
import logo from "../../public/assets/echamp-white.png";
import Navbar from "../../components/Layout/Nav/Navbar"
import Footer from "../../components/Layout/Footer/Footer";
import Image from "next/image";
import LoadingButton from "../../components/Layout/Button/LoadingButton";

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regName, setRegName] = useState('')
  const [regUsername, setRegUsername] = useState('')

  const handleRegister = () => {
    dispatch(loadingAction.toggleLoadingStatus());
    createUserWithEmailAndPassword(
      authFirebase,
      regEmail,
      regPassword
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        await registerUser(
          user.uid,
          regName,
          regUsername,
          regEmail
        );
        await localStorage.setItem("jwt-token", user.accessToken);
        await localStorage.setItem("UID", user.uid);
        // window.location.href = "/";
        dispatch(loadingAction.toggleLoadingStatus());
        router.push('/');
        window.close();
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(loadingAction.toggleLoadingStatus());
        alert(errorMessage);
      });
  };

  // const handleOnChange = (event) => {
  //   const { name, value } = event.target;

  //   setUserInfo((preVal) => {
  //     return {
  //       ...preVal,
  //       [name]: value,
  //     };
  //   });
  // }

  return (
    <div style={{ backgroundColor: "#1E1E1E", height: "100%" }}>
      <Navbar bgColor="#4A4A5C" />
      <Container>
        <div className={style.register}>
          <div style={{ backgroundColor: "#B02C25" }}>
            <a className={style.imgA}>
              <Image src={logo} className={style.imgLogo} />
            </a>
          </div>
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <h3 className={style.h3}>REGISTER NEW ACCOUNT</h3>
            <Form style={{ padding: "25px 100px" }}>
              <Form.Group className="mb-1">
                <Form.Control
                  type="username"
                  placeholder="USERNAME"
                  id="username"
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="PASSWORD"
                  id="password"
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Control
                  type="nama"
                  placeholder="NAMA"
                  id="name"
                  onChange={(e) => setRegName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="E-MAIL"
                  id="email"
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2 pb-2">
                <LoadingButton
                onClick={handleRegister}
                title="REGISTER"
                variant="primary"
                />
              </div>
            </Form>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}


export default Register;