import {
  Form,
  Container,
  Card,
  CardGroup,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Image from "next/image";

import btnSlide from "../../public/assets/scroll_down.svg";
import styleSlideShow from "./slideshow.module.css";

const Slideshow = (props) => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {props.data.map((request, index) =>
          index === 0 ? (
            <span
              data-target="#carouselExampleIndicators"
              className={`${styleSlideShow.dot} active`}
              data-slide-to={index}
              key={request.id}
            ></span>
          ) : (
            <span
              data-target="#carouselExampleIndicators"
              className={styleSlideShow.dot}
              data-slide-to={index}
              key={request.id}
            ></span>
          )
        )}
      </ol>
      <div className="carousel-inner">
        {props.data.map((request, index) =>
          index === 0 ? (
            <div
              className="carousel-item active"
              key={request.id}
              style={style.slideshow}
            >
              <img className="d-block w-100" src={request.data.hs_image} />
            </div>
          ) : (
            <div
              className="carousel-item"
              key={request.id}
              style={style.slideshow}
            >
              <img className="d-block w-100" src={request.data.hs_image} />
            </div>
          )
        )}
      </div>
      <a
        className={styleSlideShow.carouselControlPrev}
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <Image
          width={23}
          height={12}
          src={btnSlide}
          style={{ transform: "rotate(90deg)" }}
        />
      </a>
      <a
        className={styleSlideShow.carouselControlNext}
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <Image
          width={23}
          height={12}
          src={btnSlide}
          alt=""
          style={{ transform: "rotate(-90deg)" }}
        />{" "}
      </a>
    </div>
  );
};

var style = {
  slideshow: {
    height: 350,
  },
};

export default Slideshow;
