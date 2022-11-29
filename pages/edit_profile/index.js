import { Component } from "react";
import { Container } from "react-bootstrap";
import EditProfileBox from "../../components/EditProfile/EditProfileBox";
import Navbar from "../../components/layout/nav/Navbar";
import Footer from "../../components/layout/Footer/Footer";

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