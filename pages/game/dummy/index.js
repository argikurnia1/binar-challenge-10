import Image from "next/image"
import { Button, Card, Container } from "react-bootstrap"
import Footer from "../../../components/Layout/Footer/Footer"
import Navbar from "../../../components/Layout/Nav/Navbar"

import style from "../../../styles/games/dummy.module.css"
import logo from "../../../public/assets/echamp.png"

const Dummy = () => {

  return (
    <div>
      <Navbar bgColor="#4A4A5C" />
      <Container>
        <div className={style.bodyButton}>
          <div className={style.Button}>
            <div>
              <Image src={logo} className={style.logoImage} />
            </div>
            <Card.Title>
              {/* {userLoginData[0]?.data?.total_score} */}
              Total score
            </Card.Title>
            <Card.Text>
              SCORE
            </Card.Text>
            <Button
            title="Play"
            variant="primary"
            className={style.play}
            >
              Play
            </Button>
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