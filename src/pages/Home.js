import React from "react";
import Banner from "../Components/Banner";
import Hrmodules from "../Components/Hrmodules";
import Achievement from "../Components/Achievement";
import HowWorks from "../Components/HowWorks";
import SingleReview from "../Components/SingleReview";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Achievement></Achievement>
      <HowWorks></HowWorks>
      <SingleReview></SingleReview>

      <Hrmodules></Hrmodules>
      <Footer></Footer>
    </div>
  );
};

export default Home;
