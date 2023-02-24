import React from "react";
import "./Footer.css";
import FooterElement from "./FooterElement";

const Footer = () => {
  const supportItems = [
    { name: "FAQ", route: "/faq" },
    { name: "terms and conditions", route: "/termsandconditions" },
    { name: "contact", route: "/route" },
  ];

  const followItems = [
    { name: "instagram", route: "/instagram" },
    { name: "pintrest", route: "/pintrest" },
    { name: "facebook", route: "/facebook" },
  ];

  const more = [
    { name: "prints", route: "/collection" },
    { name: "commissions", route: "/commisions" },
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
