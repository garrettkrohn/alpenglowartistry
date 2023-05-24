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
          When Rachel looks at the world, her mind wants to translate what she
          sees into paintings. She has loved to create since she was young, but
          didn't fully embrace her artistic abilities until the last few years
          when she decided she needed to spend more time developing her skills
          and doing what she loves. Rachel has worked in non-profits for the
          last 13 years, but is now focusing on her artwork. She lives in St.
          Charles, IL with her two energetic elementary-aged sons that like to
          paint alongside her. Her artwork allows Rachel to express herself and
          share with others the beauty that's right in front of us every day.
        </div>
        <div className="about-paragraph">
          Mostly self-taught, Rachel's work usually focuses on landscapes that
          showcase her love for nature, mountains and the ocean. She grew up in
          Illinois, but frequently visited Colorado with her family growing up.
          Rocky Mountain scenes are especially close to her heart. She wants her
          viewers to have a sense of peace and appreciation of the outdoors when
          they see her work. Acrylic paints are Rachel's medium of choice, but
          she has also enjoyed other mediums, such as graphite and oil.
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
