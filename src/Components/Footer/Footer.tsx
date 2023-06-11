import React from "react";
import "./Footer.scss";
import FooterElement from "./FooterElement";

const Footer = () => {
  const supportItems = [
    { name: "contact", route: "/contact" },
    // { name: "Frequently Asked Questions", route: "/faq" },
    { name: "terms and conditions", route: "/termsandconditions" },
  ];

  const followItems = [
    {
      name: "instagram",
      route:
        "https://www.instagram.com/Alpenglow_Artistry/?fbclid=IwAR1htKpLfuakX_2R2bzbL5t3CyQuhy42jEUB-vcQPCt_ohDQvw-sGh9myH8",
    },
    // { name: "pintrest", route: "/pintrest" },
    // { name: "facebook", route: "" },
  ];

  const more = [
    { name: "prints", route: "/prints" },
    { name: "commissions", route: "/commissions" },
  ];

  const supportTitle = "support";

  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <FooterElement title="SUPPORT" elements={supportItems} />
        </div>
        <div className="footer-center">
          <FooterElement title="FOLLOW ME" elements={followItems} />
        </div>
        <div className="footer-right">
          <FooterElement title="MORE" elements={more} />
        </div>
      </div>
      <div className="footer-copyright">
        ALL IMAGES AND SITE CONTENT © RACHEL WESTMAN
      </div>
    </div>
  );
};

export default Footer;
