import Image from "next/image"
import { Button, Card, Container } from "react-bootstrap"
import Footer from "../../../components/Layout/Footer/Footer"
import Navbar from "../../../components/Layout/Nav/Navbar"

import style from "../../../styles/games/dummy.module.css"
import logo from "../../../public/assets/echamp.png"
import LoadingButton from "../../../components/Layout/Button/LoadingButton"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadingAction } from "../../../redux/reducers/loadingReducer";
import { insertGameScore } from "../../../actions/games"
import { async } from "@firebase/util"
import { playerRank, totalGameByUser, totalPointByUser } from "../../../actions/fb_database"

import WYMGameInfo from "../../../components/Games/whosyourmeme/WYMGameInfo"


const Dummy = () => {
  const dispatch = useDispatch()
  const userLoginData = useSelector((state) => {
    return state.userLoginReducer.loginUser;
  });
  const [memeBase, setMemeBase] = useState([
    {
      title:"Roll the dice",
      desc:"Let you mouse click define your luck",
      img:"https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/512x512/plain/dice.png",
      score:0
    },
    {
      title:"A Sad Pepe",
      desc:"Score Added +1 because you're Sad",
      img:"https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
      score:1
    },
    {
      title:"A Shrek",
      desc:"Score Added +2 because you're BadAss",
      img:"https://cdn.vox-cdn.com/thumbor/VZNJM5S4Cw2i3JaycT9waVLCwqw=/715x248:1689x721/1200x800/filters:focal(972x299:1278x605)/cdn.vox-cdn.com/uploads/chorus_image/image/69305239/shrek4_disneyscreencaps.com_675.0.jpg",
      score:2
    },
    {
      title:"A Tuyul On Steroid",
      desc:"Score Added +3 because you're bald",
      img:"https://i.pinimg.com/originals/97/58/3b/97583b08a29977c9758d132fdcf386d7.jpg",
      score:3
    },
    {
      title:"A You Can Do It Baby",
      desc:"Score Added +4 because you can do it",
      img:"https://www.modify.in.th/wp-content/uploads/Meme-Success-Kid.webp",
      score:4
    },
    {
      title:"A Yilong Ma",
      desc:"Score Added +5 because you're Elon Musk Knockoff",
      img:"https://greenlemon.me/wp-content/uploads/2022/05/6-12.jpg",
      score:5
    },
    {
      title:"A Burn Baby Girl",
      desc:"Score Added +6 because you're BadAss",
      img:"https://awsimages.detik.net.id/community/media/visual/2021/04/30/disaster-girl_43.png?w=700&q=90",
      score:6
    },{
      title:"An Anya Smoke",
      desc:"Score Removed -1 because you're Cute But Smoking Kills You",
      img:"https://i.dailymail.co.uk/1s/2021/02/27/12/39833622-0-image-a-26_1614428255207.jpg",
      score:-1
    },
    {
      title:"A Questionable Anya Smoke",
      desc:"Score Removed -2 because you're Cute But Betray CJ",
      img:"https://cs3.gtaall.com/screenshots/4dc09/2022-11/original/918c2e41a8e2e00ca5b570cf9ddbf798827ad973/1132388-gallery10.jpg",
      score:-2
    },
    {
      title:"A Cursed Anya Smoke",
      desc:"Score Removed -3 and call 911",
      img:"https://firebasestorage.googleapis.com/v0/b/fb-platinum-echamp.appspot.com/o/profile_img%2FWhatsApp%20Image%202022-11-30%20at%2018.46.38.jpeg?alt=media&token=abf59e50-7308-41fc-a376-acbb2749c39f",
      score:-3
    },
    {
      title:"A Crying Awkarin",
      desc:"Score Removed -4 and stop this drama",
      img:"https://www.wowkeren.com/images/news/medium/2016/00119057.jpg",
      score:-4
    },
    {
      title:"A Muhammad Ibnu",
      desc:"Score Removed -5 because you're only famous in indonesian facebook",
      img:"https://pbs.twimg.com/media/FBEBVOnVIAgE8aY.jpg",
      score:-5
    },
    {
      title:"A Bad Luck Brian",
      desc:"Score Removed -6 because you're Bad Luck",
      img:"https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F000%2F271%2F187%2F24d.jpg",
      score:-6
    }
  ])
  const [random, setRandom] = useState(0)

  const [gameInfo, setGameInfo] = useState({
    ronde: 0,
    status: "let the game decide",
    score: 0
  })


  const handleGame= async () =>{
    dispatch(loadingAction.toggleLoadingStatus())
    let randomize = Math.floor((Math.random() * 12) + 1)
    setRandom(randomize)
    insertGameScore("-NI6wC-QCtYu4TMTzgt0",userLoginData[0]?.id,memeBase[randomize].score)

    playerRank(userLoginData[0]?.id)
    totalPointByUser(userLoginData[0]?.id)
    totalGameByUser(userLoginData[0]?.id)
    handleInfo(randomize)
    dispatch(loadingAction.toggleLoadingStatus())
  }
  const handleInfo = (randomize) =>{
    let tempRonde = gameInfo.ronde + 1
    let tempStatus = ""
    let tempScore = gameInfo.score + memeBase[randomize].score
    if(tempScore < 0){
      tempStatus = "you are bad luck"
    }else{
      tempStatus = "you are good luck"
    }
    setGameInfo({
      ronde: tempRonde,
      status: tempStatus,
      score : tempScore
    })
  }
  return (
    <div>
      <Navbar bgColor="#4A4A5C" />
      <Container style={{ color: "coral"}}>
        <div className={style.bodyButton}>
          <div className={style.Button}>

            <Card.Title className="d-flex flex-column text-center">
              <h1>You Are</h1>
              <img alt="" className="mx-auto"src={memeBase[random].img} style={{ height: "40vh"}}/>
              <h3>{memeBase[random].title}</h3>
            </Card.Title>
            <Card.Text>
              {memeBase[random].desc}
            </Card.Text>
            <LoadingButton
            title="PLAY"
            onClick={()=>handleGame()}
            varriant="success"
            />

            <WYMGameInfo
            props={gameInfo}
            />

          </div>
        </div>
        
      </Container>
      <div className={style.footer}>
        <Footer />
      </div>
      

    </div>
  )
}

export default Dummy