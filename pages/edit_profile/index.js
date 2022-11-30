import { Component } from "react";
import { Container } from "react-bootstrap";
import EditProfileBox from "../../components/EditProfile/EditProfileBox";

import Navbar from "../../components/Layout/Nav/Navbar";
import Footer from "../../components/Layout/Footer/Footer";


class EditProfile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <EditProfileBox />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default EditProfile;