import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loadingAction } from "../../redux/reducers/loadingReducer"
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../../config/firebase";

import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import logo from '../../public/assets/echamp.png';
import style from '../Login/Login.module.css'
import Image from "next/image";
import LoadingButton from "../Layout/Button/LoadingButton";


const Login = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleLogin = () => {
    dispatch(loadingAction.toggleLoadingStatus());
    signInWithEmailAndPassword(authFirebase, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        localStorage.setItem('jwt-token', user.accessToken)
        localStorage.setItem('UID', user.uid)
        dispatch(loadingAction.toggleLoadingStatus());
        window.location.href = '/'
        // router.push('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(loadingAction.toggleLoadingStatus());
        alert(errorMessage)
      });
  }

  return (
    <Modal
      show={props.showModal}
      onHide={props.toggleFunc}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body className={`show-grid ${style.modalBody}`}>
        <Container>
          <Row>
            <Col md={6} className={style.rowLeft}>
            </Col>
            <Col md={6} className={style.rowRight}>
              <div>
                <Image src={logo} className={style.logoImage} />
              </div>
              <div className={style.formLogin}>
                <Form>
                  <Form.Group className={style.marginInput}>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      id="email"
                      onChange={(e) => setLoginEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className={style.marginInput}>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={(e) => setLoginPassword(e.target.value)} />
                  </Form.Group>
                  <div className="d-grid gap-2 pb-3">
                    <LoadingButton
                    onClick={handleLogin}
                    title="LOGIN"
                    variant="primary"
                    />
                  </div>
                </Form>
              </div>
              <div className={style.lupaPass}>
                <span>Lupa password? klik&nbsp;<a href="/forgot/password">disini</a></span>
              </div>
              <div >
                <span>Belum punya akun?&nbsp;<a href="/register">Buat akun</a>&nbsp;baru</span>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default Login