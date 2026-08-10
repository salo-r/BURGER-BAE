import React from "react";

import HeroCards from "./components/heroCards";
import HeroProductCard from "./components/heroHoodieProductCard";
import AcidProductCard from "./components/heroAcidProductCard";
import WinterProductCard from "./components/heroWinterProductCard";
import GOTOProductCard from "./components/heroGO-TOProductCard";
import Herofootercategory from "./components/herofootercategory";
import ExploreSec from "./components/exploreSec";
import StaticInfo from "../../constants/StaticInfo";
import HeroRatingCards from "./components/HeroRatingCards";
import Footer from "@/components/layout/footer";
import HeroimageSec from "./components/heroimageSec";


const Home = () => {
  return (
    <div>
      <HeroimageSec />
      <HeroCards />
      <HeroProductCard />
      <AcidProductCard />
      <WinterProductCard />
      <GOTOProductCard />
      <Herofootercategory />
      <ExploreSec />
      <StaticInfo />
      <HeroRatingCards />
      
    </div>
  );
};

export default Home;
