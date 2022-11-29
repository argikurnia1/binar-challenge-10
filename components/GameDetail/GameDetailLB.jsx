import React from "react";
import { Card } from "react-bootstrap";
import styleGameDetailLB from "./GameDetailLB.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { leaderBoardByGame, retrieveAllUser } from "../../actions/fb_database";
import LBCardGame from "./LBCardGame";

const GameDetailLB = (props) => {
    const [LeaderBoard, setLeaderBoard] = useState([]);
    const [Player, setPlayer] = useState({});
    const [ProfilePic, setProfilePic] = useState({});
    const playerHandler = async () => {
    const temp = {};
    const resp = await retrieveAllUser();
    resp.forEach((e) => {
      temp[e.data.id_player] = e.data.username;
    });
    setPlayer(temp);
  };
  const profilePicHandler = async () => {
    const temp = {};
    const resp = await retrieveAllUser();
    resp.forEach((e) => {
      temp[e.data.id_player] = e.data.profile_picture;
    });
    setProfilePic(temp);
  };

  const boardHandler = async (id) => {
    const resp = await leaderBoardByGame(id);
    setLeaderBoard(resp);
  };

  useEffect(() => {
    boardHandler(props.id);
    playerHandler();
    profilePicHandler();
  }, [props.id]);
  return (
    <section >
      <Card
        style={{
          backgroundColor: "#3B3838",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          height: "100vh",
        }}
      >
        {/* Game Leader Board Top */}
        <div style={{ backgroundColor: "#464343" }}>
          <Card.Header className={styleGameDetailLB.detailGameHistoryHeader}>
            GAME RANK
          </Card.Header>
        </div>

        {/* Game Leader Board Bottom */}
        <Card.Body>
          {LeaderBoard.map((e, index) => (
            <LBCardGame
              key={index + 1}
              index={index + 1}
              username={Player[e.id_player]}
              score={e.score}
              profile_picture={ProfilePic[e.id_player]}
            />
          ))}
        </Card.Body>
      </Card>
    </section>
  );
};

export default GameDetailLB;