import React from "react";
import { Card } from "react-bootstrap";
import { countPlayerByGame, getGameInfoById } from "../../actions/fb_database";
import styleGameDetailHeader from "./GameDetailHeader.module.css"
import { useState } from "react";
import { useEffect } from "react";

const GameDetailHeader = (props) => {
    const [gameDetail, setgameDetail] = useState({
      game_description: "loading...",
      game_image: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg",
      game_title: "loading...",
      game_url: "loading..."
    })
    const [totalUser, settotalUser] = useState('loading...')
    const getGameDetail = async (id) =>{
      const resp = await getGameInfoById(id)
      setgameDetail(resp)
    }
    const countUser = async(id) =>{
      const resp = await countPlayerByGame(id)
      settotalUser(resp)
    }
    useEffect(() => {
      getGameDetail(props.id)
      countUser(props.id)
    },[props.id])

    return (
    <div>
      <section className={`${styleGameDetailHeader.sectionDetailHeader} d-flex`}>
        <Card
          className="d-flex flex-row"
          style={{ backgroundColor: "#3B3838", width: "100%", border: "none" }}>

          <Card.Img
            className={styleGameDetailHeader.detailHeaderLeftImg}
            src={gameDetail?.game_image}

          />
          <div className="d-flex flex-column w-100">
            <Card.Header className={styleGameDetailHeader.detailHeaderRt}>
              <div>
                <Card.Title className={styleGameDetailHeader.detailHeaderRtTitle}>
                  {gameDetail?.game_title}
                </Card.Title>
              </div>
  
              <div>
                <Card.Title className={styleGameDetailHeader.detailHeaderRbTitle}>
                  {totalUser}
                </Card.Title>
                <Card.Text className={styleGameDetailHeader.detailHeaderRbText}>
                  PLAYERS
                </Card.Text>
              </div>
            </Card.Header>
            <Card.Body style={{ padding: "0" }}>
              
              <div className={styleGameDetailHeader.detailHeaderRb}>
                <div>
                  <Card.Text className={styleGameDetailHeader.detailHeaderRbText}>
                  {gameDetail?.game_description}
                  </Card.Text>
                </div>
                <a className={`${styleGameDetailHeader.btnEditDetail} btn`} href={gameDetail?.game_url}>
                  PlayGame
                </a>
              </div>
            </Card.Body>
          </div>
        </Card>
      </section>
    </div>
    );
  };
  
  export default GameDetailHeader;