
import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import GameDetailHeader from "../../components/GameDetail/GameDetailHeader";
import GameDetailLB from "../../components/GameDetail/GameDetailLB";
import Navbar from "../../components/Layout/Nav/Navbar";
import Footer from "../../components/Layout/Footer/Footer";


const GameDetail = () =>{
    const router = useRouter()
    const idGame = router.query.GameId
    return(
        <div>
            <Container>
                <Navbar/>
                <GameDetailHeader id = {idGame}/>
                <GameDetailLB id = {idGame}/>
                <Footer/>
            </Container>
        </div>
    )
}

export default GameDetail;