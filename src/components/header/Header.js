import React, { useEffect, useState, useCallback } from "react";
import "./Header.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { loggedIn } from "../../dataservice/checkStatus";
import { Post } from "../../dataservice/service";

const Header = (props) => {
  const { addBg, style } = props;
  const location = useLocation();
  const history = useHistory();
  const [focus, setFocus] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    switch (location.pathname.toLowerCase()) {
      case "/contact_us":
        setFocus("contactus");
        break;
      default:
        setFocus("");
        break;
    }
  }, [location]);

  useEffect(() => {
    setSignedIn(loggedIn());
  }, [history]);

  const mobileNav = (inputJ) => {
    const $ = inputJ;
    // Mobile Navigation
    if ($(".nav-menu").length) {
      var $mobile_nav = $(".nav-menu").clone().prop({
        class: "mobile-nav d-lg-none",
      });
      $("body").append($mobile_nav);
      $("body").prepend(
        '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
      );
      $("body").append('<div class="mobile-nav-overly"></div>');

      $(document).on("click", ".mobile-nav-toggle", function (e) {
        $("body").toggleClass("mobile-nav-active");
        $(".mobile-nav-toggle i").toggleClass(
          "icofont-navigation-menu icofont-close"
        );
        $(".mobile-nav-overly").toggle();
      });

      $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass("active");
      });

      $(document).click(function (e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }
  };

  const smoothScroll = useCallback((inputJ) => {
    const $ = inputJ;

    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function (
      e
    ) {
      if (
        typeof this.pathname !== "undefined" &&
        window.location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        window.location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top;
          var scrolled = 51;

          if ($("#header").length) {
            scrollto -= $("#header").outerHeight();

            if (!$("#header").hasClass("header-scrolled")) {
              scrollto += scrolled;
            }
          }

          if ($("#topbar").length) {
            if (!$("#topbar").hasClass("topbar-scrolled")) {
              scrollto -= $("#topbar").outerHeight();
            }
          }

          if ($(this).attr("href") === "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    });
  }, []);

  useEffect(() => {
    const mrJ = window.jQuery;
    mobileNav(mrJ);
    smoothScroll(mrJ);
  }, [smoothScroll]);

  const logOut = (event) => {
    event.preventDefault();
    const local = localStorage.getItem("user") || "";
    let user = "";
    console.log(local);
    if (local !== "") {
      const parse = JSON.parse(local);
      if (
        typeof parse.user !== "undefined" &&
        typeof parse.user.type !== "undefined"
      ) {
        user = parse.user.type;
      }
    }

    localStorage.clear();
    history.replace("/signin/".concat(user));

    Post("/auth/logout")
      .then((response) => {
        localStorage.clear();
        history.replace("/signin/".concat(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header
      id="header"
      className={`fixed-top d-flex align-items-center `.concat(
        addBg ? "" : "header-scrolled"
      )}
      style={style ? style : {}}
    >
      <div className="container d-flex align-items-center">
        <div className="logo mr-auto">
          <h1 className="text-light">
            <a href="/#">
              <span>TowMe</span>
            </a>
          </h1>
        </div>

        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className={focus === "" ? "active" : ""}>
              <a href="/#">Home</a>
            </li>
            <li className={focus === "about" ? "active" : ""}>
              <a href="/#about">About</a>
            </li>
            <li className={focus === "client" ? "active" : ""}>
              <a href="/#client">Client</a>
            </li>
            <li className={focus === "towtruck" ? "active" : ""}>
              <a href="/#towtruck">Tow trucks</a>
            </li>
            <li className={focus === "contactus" ? "active" : ""}>
              <Link to="/contact_us">Contact</Link>
            </li>

            <li className="book-a-table text-center">
              {!signedIn ? (
                <Link to="/signup">Sign up</Link>
              ) : (
                <a href="/logout" role="button" onClick={logOut}>
                  Log out
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
