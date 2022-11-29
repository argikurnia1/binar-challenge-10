import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import stylesProfileHeader from "./ProfileHeader.module.css";

const ProfileHeader = () => {
  const userLoginData = useSelector((state) => {
    return state.userLoginReducer.loginUser;
  });
  const router = useRouter();

  const editHandler = () => {
    router.push(`/edit_profile`);
  };
  const socialMediaHandler = () => {
    window.location.href = userLoginData[0]?.data.social_media;
  };

  return (
    <section className={`${stylesProfileHeader.sectionProfileHeader} d-flex`}>
      <Card
        className="d-flex flex-row"
        style={{ backgroundColor: "#3B3838", width: "100%", border: "none" }}
      >
        {/* Profile Header Left*/}
        <Card.Img
          className={`${stylesProfileHeader.profileHeaderLeftImg}`}
          src={
            userLoginData[0]?.data?.profile_picture
              ? userLoginData[0]?.data?.profile_picture
              : "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e1fd5442419075.57cc3f77ed8c7.png"
          }
          alt="user profile"
        />
        <div className="d-flex flex-column w-100">
          {/* Profile Header Right */}
          {/* Profile Header Right Top */}
          <Card.Header className={`${stylesProfileHeader.profileHeaderRt}`}>
            <div>
              <Card.Title
                className={`${stylesProfileHeader.profileHeaderRtTitle}`}
              >
                {userLoginData[0]?.data?.name}
              </Card.Title>
              <Card.Text
                className={`${stylesProfileHeader.profileHeaderRtText}`}
              >
                {userLoginData[0]?.data?.username}
              </Card.Text>
              <Card.Text
                className={`${stylesProfileHeader.profileHeaderRtText}`}
              >
                {userLoginData[0]?.data?.city}
              </Card.Text>
            </div>

            <div className="d-flex flex-column">
              <button
                className={`${stylesProfileHeader.btnEditProfile} mb-2`}
                onClick={editHandler}
              >
                EDIT PROFILE
              </button>
              <button
                className={`${stylesProfileHeader.btnEditProfile}`}
                onClick={socialMediaHandler}
              >
                SOCIAL MEDIA
              </button>
            </div>
          </Card.Header>
          <Card.Body style={{ padding: "0" }}>
            {/* Profile Header Right Bottom  */}
            <div className={`${stylesProfileHeader.profileHeaderRb}`}>
              <div>
                <Card.Title
                  className={`${stylesProfileHeader.profileHeaderRbTitle}`}
                >
                  {userLoginData[0]?.data?.total_game}
                </Card.Title>
                <Card.Text
                  className={`${stylesProfileHeader.profileHeaderRbText}`}
                >
                  TOTAL GAME
                </Card.Text>
              </div>
              <div>
                <Card.Title
                  className={`${stylesProfileHeader.profileHeaderRbTitle}`}
                >
                  {userLoginData[0]?.data?.total_score}
                </Card.Title>
                <Card.Text
                  className={`${stylesProfileHeader.profileHeaderRbText}`}
                >
                  TOTAL POINT
                </Card.Text>
              </div>
              <div>
                <Card.Title
                  className={`${stylesProfileHeader.profileHeaderRbTitle}`}
                >
                  {userLoginData[0]?.data?.total_score}
                </Card.Title>
                <Card.Text
                  className={`${stylesProfileHeader.profileHeaderRbText}`}
                >
                  PLAYER RANK
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    </section>
  );
};

export default ProfileHeader;
