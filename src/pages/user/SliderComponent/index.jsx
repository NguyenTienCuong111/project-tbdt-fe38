import { Flex } from "antd";
import React from "react";
import Slider from "react-slick";

function SliderComponentPage() {
  var settings = {
    dots: true,
    infinite: true,

    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <div
      id="container"
      style={{ backgroundColor: "#efefef", padding: "0 100px" }}
    >
      <Slider {...settings}>
        <div>
          <img
            src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/slide-img5.png?1708778853545"
            alt=""
            width="100%"
            height="auto"
          />
        </div>
        <div>
          <img
            src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/slide-img4.png?1708778853545"
            alt=""
            width="100%"
            height="auto"
          />
        </div>
        <div>
          <img
            src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/slide-img1.png?1708778853545"
            alt=""
            width="100%"
            height="auto"
          />
        </div>
      </Slider>
    </div>
  );
}

export default SliderComponentPage;
