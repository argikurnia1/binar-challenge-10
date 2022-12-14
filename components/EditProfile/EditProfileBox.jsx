import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, InputGroup, Form, Row, Col, Container } from "react-bootstrap";
import styleEditProfileBox from "./EditProfileBox.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { playedGame, updateProfile } from "../../actions/fb_database";
import { uploadProfileImg } from "../../actions/fb_storage";
import { retrieveLoginUser } from "../../redux/reducers/loginReducer";
import LoadingButton from "../Layout/Button/LoadingButton";
import { loadingAction } from "../../redux/reducers/loadingReducer";

const EditProfileBox = () => {
  const [UserInfo, setUserInfo] = useState({
    name: "loading...",
    username: "loading...",
    email: "loading...",
    city: "loading...",
    social_media: "loading...",
    profile_picture:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e1fd5442419075.57cc3f77ed8c7.png",
  });

  const [imgTemp, setImgTemp] = useState();

  const dispatch = useDispatch();

  const userLoginData = useSelector((state) => {
    return state.userLoginReducer.loginUser;
  });
  const tombol = useSelector((state) => {
    return state.loadingReducer.loadingStatus;
  });
  const handleGetUser = () => {
    setUserInfo({
      id: userLoginData[0]?.id,
      name: userLoginData[0]?.data?.name,
      username: userLoginData[0]?.data?.username,
      email: userLoginData[0]?.data?.email,
      city: userLoginData[0]?.data?.city,
      social_media: userLoginData[0]?.data?.social_media,
      profile_picture: userLoginData[0]?.data?.profile_picture,
    });
  };

  const handleUpdate = async () => {
    dispatch(loadingAction.toggleLoadingStatus());
    if (imgTemp) {
      const url = await uploadProfileImg(imgTemp);
      await updateProfile(
        UserInfo.id,
        UserInfo.name,
        UserInfo.username,
        UserInfo.city,
        UserInfo.social_media,
        url
      );
      dispatch(retrieveLoginUser(UserInfo.id));
      toast.success("update successfully");
    }

    if (imgTemp === undefined) {
      console.log("masuk");
      await updateProfile(
        UserInfo.id,
        UserInfo.name,
        UserInfo.username,
        UserInfo.city,
        UserInfo.social_media,
        UserInfo.profile_picture
      );
      dispatch(retrieveLoginUser(UserInfo.id));
      toast.success("update successfully");
    }
    dispatch(loadingAction.toggleLoadingStatus());
  };

  const InputEvent = (event) => {
    const { name, value } = event.target;

    setUserInfo((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const InputFile = async (event) => {
    let file = event.target.files[0];
    setImgTemp(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUserInfo({
            id: UserInfo.id,
            name: UserInfo.name,
            username: UserInfo.username,
            email: UserInfo.email,
            city: UserInfo.city,
            social_media: UserInfo.social_media,
            profile_picture: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [userLoginData]);

  return (
    <section className="">
      <Card
        style={{
          backgroundColor: "#3B3838",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Game Leader Board Top */}
        <div style={{ backgroundColor: "#464343" }}>
          <Card.Header className="text-white">
            {userLoginData[0]?.data?.name}'s Profile
          </Card.Header>
        </div>

        {/* Game Leader Board Bottom */}

        <Card.Body>
          <Container>
            <Row>
              <Col xs="4">
                <Card.Img
                  className={styleEditProfileBox.editHeaderLeftImg}
                  src={UserInfo.profile_picture}
                />
              </Col>
              <Col>
                <div className={`${styleEditProfileBox.inputTitle} ${styleEditProfileBox.inputBox}`}>
                  <Form.Label>Username</Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      value={UserInfo.username}
                      placeholder="Enter Username"
                      onChange={InputEvent}
                      name="username"
                    />
                  </InputGroup>
                </div>
                <div className={`${styleEditProfileBox.inputTitle} ${styleEditProfileBox.inputBox}`}>
                  <Form.Label>Full Name</Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      value={UserInfo.name}
                      placeholder="Enter Full Name"
                      onChange={InputEvent}
                      name="name"
                    />
                  </InputGroup>
                </div>
                <div className={`${styleEditProfileBox.inputTitle} ${styleEditProfileBox.inputBox}`}>
                  <Form.Label>Email</Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      value={UserInfo.email}
                      placeholder="Enter Email"
                      onChange={InputEvent}
                      name="email"
                      disabled
                    />
                  </InputGroup>
                </div>
                <div className={`${styleEditProfileBox.inputTitle} ${styleEditProfileBox.inputBox}`}>
                  <Form.Label>City</Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      value={UserInfo.city}
                      placeholder="Enter Username"
                      onChange={InputEvent}
                      name="city"
                    />
                  </InputGroup>
                </div>
                <div className={`${styleEditProfileBox.inputTitle} ${styleEditProfileBox.inputBox}`}>
                  <Form.Label>Social Media</Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      value={UserInfo.social_media}
                      placeholder="Enter Social Media"
                      onChange={InputEvent}
                      name="social_media"
                    />
                  </InputGroup>
                </div>
                <div>
                  <Form.Group
                    controlId="formFile"
                    className={`mb-3 ${styleEditProfileBox.inputTitle} ${styleEditProfileBox.imgInput}`}
                  >
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={InputFile} />
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <div className={`${styleEditProfileBox.tombolUpdate} d-grid gap-2 pb-2`}>
            <LoadingButton
                    onClick={() => handleUpdate()}
                    title="UPDATE"
                    variant="success"
                  />
            </div>
          </Container>
        </Card.Body>
      </Card>
    </section>
  );
};

export default EditProfileBox;