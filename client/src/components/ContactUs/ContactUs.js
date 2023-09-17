import React from "react";
import "./ContactUs.scss";

function ContactUs({ top, map, block }) {
  return (
    <div className="contact-us">
      <div className="container">
        {top}
        <div className="contact-us__inner">
          <div className="contact-us__map">{map}</div>
          <div className="contact-us__block">{block}</div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
