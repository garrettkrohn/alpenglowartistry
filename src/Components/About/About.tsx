import React from "react";
import "./About.scss";
//@ts-ignore
import image from "../../images/AboutImage.jpg";
import Instagram from "./Instagram";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-image-wrapper">
        <img src={image} alt="Alpenglow Artistry" className="about-image" />
      </div>
      <div className="about-text">
        <div className="about-paragraph">
          We live in such a beautiful world. I love to look at nature and think
          about what it would look like in a painting. I always loved to create,
          but didn’t fully embrace my artistic abilities until the last few
          years. I have spent the past 13 years working in non-profit
          organizations, but am now focusing more of my time on my art, and most
          importantly, my family. Life has shown me recently that it’s too short
          to not spend it on the things and people you love the most. I live in
          St. Charles, Illinois with my two energetic elementary-aged sons,
          Charlie and Shaun, and my husband, Eric. They are my favorite people
          and biggest fans!
        </div>
        <div className="about-paragraph">
          My artwork allows me to express myself and share with others
          appreciation for God’s creation, especially mountains and oceans. I
          grew up in Illinois, but frequently visited Colorado with my family.
          Rocky Mountain scenes are especially close to my heart, but Florida
          beaches and midwest landscapes are also special to me. I want people
          who see my artwork to have a sense of calm and contentment when they
          see my paintings.
        </div>

        <div className="about-paragraph">
          You can follow along Rachel's painting journey on Instagram
          <div className="instagram-and-button-container">
            <Link
              to={
                "https://www.instagram.com/Alpenglow_Artistry/?fbclid=IwAR1htKpLfuakX_2R2bzbL5t3CyQuhy42jEUB-vcQPCt_ohDQvw-sGh9myH8"
              }
            >
              <div className="instagram-container">
                <div className="instagram-icon">
                  <Instagram />
                </div>
                <div className="instagram-text">@alpenglow_artistry</div>
              </div>
            </Link>

            <div>
              <Link to={"/contact"}>
                <button className="homepage-about-button">
                  Contact Rachel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
