import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <div className="bg-ellipsis-gradient-center text-white flex flex-col items-center justify-around h-[100vh] md:h-[60vh]">
      <div className="container">
        <Slider {...settings}>
          <div className=" flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Bienvenido a mi <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-lg md:text-2xl leading-normal">
              Desarrollador web apasionado por crear experiencias digitales
              increíbles
            </p>
            <div className="container flex  space-x-4 mt-20">
              <button className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white py-2 px-4 rounded hover:bg-rose-600">
                Contáctame
              </button>
              <button className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white py-2 px-4 rounded hover:bg-rose-600">
                Segundo Botón
              </button>
            </div>
          </div>

          <div className="text-end flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Bienvenido a mi <span className="text-gradient">Portfolio2</span>
            </h1>
            <p className="text-lg md:text-2xl leading-normal">
              Desarrollador web apasionado por crear experiencias digitales
              increíbles
            </p>
            <div className="container flex  space-x-4 justify-end mt-20">
              <button className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white py-2 px-4 rounded hover:bg-rose-600">
                Contáctame
              </button>
              <button className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white py-2 px-4 rounded hover:bg-rose-600">
                Segundo Botón
              </button>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Hero;
