import React, { useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  // Back to top button
  const handleScroll = (event) => {
    // Back to top button
    const jQuery = window.jQuery;
    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 100) {
        jQuery(".back-to-top").fadeIn("slow");
      } else {
        jQuery(".back-to-top").fadeOut("slow");
      }
    });

    jQuery(".back-to-top").click(function () {
      jQuery("html, body").animate(
        {
          scrollTop: 0,
        },
        1500,
        "easeInOutExpo"
      );
      return false;
    });
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <>
      <footer id="footer">
        <div className="container">
          <h3>TowMe</h3>
          <p>We are always there for you!</p>
          <div className="social-links">
            <a href="#twitter" className="twitter">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#facebook" className="facebook">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#instagram" className="instagram">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#linkedin" className="linkedin">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>TowMe</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by{" "}
            <a href="https://www.payne.cutag.co.za/">Ayabonga Payne</a>
          </div>
        </div>
      </footer>
      <a href="#back-to-top" className="back-to-top">
        <i className="icofont-simple-up"></i>
      </a>
    </>
  );
};

export default Footer;
