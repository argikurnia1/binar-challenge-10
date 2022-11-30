import { Component, useState, useEffect, useCallback, Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Form, Container, Card, CardGroup, Row, Col } from 'react-bootstrap';
import Navbar from "../../../components/Layout/Nav/Navbar";
import { database } from "../../../config/firebase"
import { insertGameScore } from "../../../actions/games";
import { checkDataLogin } from "../../../actions/autentication";
import { useSelector } from "react-redux";
// https://react-unity-webgl.dev/
// https://github.com/jeffreylanters/react-unity-webgl/discussions/264


const GameSpaceWar = () => {
    const userLoginData = useSelector((state) => {
        return state.userLoginReducer.loginUser;
      });
      console.log("login data",userLoginData[0])
    const game_id = "-NG-FxcdZAq13GcqcZIm"
    const uuid = userLoginData[0]?.id;
    console.log("login data id",uuid)
    const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "../../../utils/Games/SpaceWar/BinarSpaceWar.loader.js",
        dataUrl: "../../../utils/Games/SpaceWar/BinarSpaceWar.data.unityweb",
        frameworkUrl: "../../utils/Games/SpaceWar/BinarSpaceWar.framework.js.unityweb",
        codeUrl: "../../../utils/Games/SpaceWar/BinarSpaceWar.wasm.unityweb",
    });

    // sendMessage("JavascriptHook", "ChangeData", "HarlanSR");


    const handleGameOver = useCallback((userName2, score) => {
        insertGameScore(game_id, uuid, score);
    }, []);


    useEffect(() => {
        addEventListener("GameOver", handleGameOver);
        return () => {
            removeEventListener("GameOver", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    return (
        <div>
            <Navbar bgColor="#4A4A5C" />
            <Container className="mt-5">

                <div className="p-5">
                    <Unity
                        style={{
                            width: "100%",
                            justifySelf: "center",
                            alignSelf: "center",
                        }}
                        unityProvider={unityProvider} />
                </div>
            </Container>
        </div>
    )
}


export default GameSpaceWar
