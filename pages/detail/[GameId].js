
import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import GameDetailHeader from "../../components/GameDetail/GameDetailHeader";
import GameDetailLB from "../../components/GameDetail/GameDetailLB";
import Navbar from "../../components/Layout/Nav/Navbar";

const GameDetail = () =>{
    const router = useRouter()
    const [id, SetId] = useState()
    const idGame = router.query.GameId
    console.log("awal detil",idGame)
    return(
        <div>
            <Container>
                <Navbar/>
                <GameDetailHeader id = {idGame}/>
                <GameDetailLB id = {idGame}/>
            </Container>
        </div>
    )
}

export default GameDetail;