import React, { useEffect, useRef } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import slide1 from "../../assets/img/slide/slide-1.1.jpg";
import slide2 from "../../assets/img/slide/slide-2.1.jpg";
import { Helmet } from "react-helmet";

const Home = () => {
  const jQuery = useRef(null);

  const handleMount = () => {
    const $ = jQuery.current;
    // Navigation active state on scroll
    const nav_sections = $("section");
    const main_nav = $(".nav-menu, #mobile-nav");

    $(window).on("scroll", function () {
      const check = $("body").find("#hero");
      if (check.length === 0) return false;

      const cur_pos = $(this).scrollTop() + 80;

      nav_sections.each(function () {
        const top = $(this).offset().top,
          bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          if (cur_pos <= bottom) {
            main_nav.find("li").removeClass("active");
          }
          main_nav
            .find('a[href="/#' + $(this).attr("id") + '"]')
            .parent("li")
            .addClass("active");
        }
        if (cur_pos < 200) {
          $(".nav-menu ul:first li:first").addClass("active");
        }
      });
    });

    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function () {
      const check = $("body").find("#hero");
      if (check.length === 0) return false;

      if ($(this).scrollTop() > 100) {
        $("#header").addClass("header-scrolled");
        $("#topbar").addClass("topbar-scrolled");
      } else {
        $("#header").removeClass("header-scrolled");
        $("#topbar").removeClass("topbar-scrolled");
      }
    });

    if ($(window).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
      $("#topbar").addClass("topbar-scrolled");
    }

    // Real view height for mobile devices
    if (window.matchMedia("(max-width: 767px)").matches) {
      $("#hero").css({
        height: $(window).height(),
      });
    }

    // Intro carousel
    const heroCarousel = $("#heroCarousel");
    const heroCarouselIndicators = $("#hero-carousel-indicators");
    heroCarousel
      .find(".carousel-inner")
      .children(".carousel-item")
      .each(function (index) {
        index === 0
          ? heroCarouselIndicators.append(
              "<li data-target='#heroCarousel' data-slide-to='" +
                index +
                "' class='active'></li>"
            )
          : heroCarouselIndicators.append(
              "<li data-target='#heroCarousel' data-slide-to='" +
                index +
                "'></li>"
            );
      });

    heroCarousel.carousel();

    heroCarousel.on("slid.bs.carousel", function (e) {
      $(this).find("h2").addClass("animated fadeInDown");
      $(this).find("p, .btn-menu, .btn-book").addClass("animated fadeInUp");
    });
  };

  useEffect(() => {
    jQuery.current = window.jQuery;
    handleMount();
  }, []);

  return (
    <>
      <Helmet>
        <title>We are always there for you</title>
      </Helmet>
      <Header addBg />
      <section id="hero">
        <div className="hero-container">
          <div
            id="heroCarousel"
            className="carousel slide carousel-fade"
            data-ride="carousel"
          >
            <ol
              className="carousel-indicators"
              id="hero-carousel-indicators"
            ></ol>

            <div className="carousel-inner" role="listbox">
              <div
                className="carousel-item active"
                style={{
                  background: `url(${slide1})`,
                }}
              >
                <div className="carousel-container">
                  <div className="carousel-content">
                    <h2 className="animated fadeInDown">
                      <span>TowMe</span> Clients
                    </h2>
                    <p className="animated fadeInUp">
                      Transparency. This means that there will no hidden costs.
                      Motorists will know how much to pay for the services
                      before committing themselves. All tow-truck drivers will
                      be vetted so that motorists can have a peace of mind
                    </p>
                    <div>
                      <a
                        href="Client/Client-sForm.html"
                        className="btn-menu animated fadeInUp scrollto"
                      >
                        Sign up
                      </a>
                      <a
                        href="#client"
                        className="btn-book animated fadeInUp scrollto"
                      >
                        learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="carousel-item"
                style={{
                  background: `url(${slide2})`,
                }}
              >
                <div className="carousel-container">
                  <div className="carousel-content">
                    <h2 className="animated fadeInDown">
                      Tow truck <span>Company</span>
                    </h2>
                    <p className="animated fadeInUp">
                      Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea
                      ut et est quaerat sequi nihil ut aliquam. Occaecati alias
                      dolorem mollitia ut. Similique ea voluptatem. Esse
                      doloremque accusamus repellendus deleniti vel. Minus et
                      tempore modi architecto.
                    </p>
                    <div>
                      <a
                        href="#client"
                        className="btn-menu animated fadeInUp scrollto"
                      >
                        Sign up
                      </a>
                      <a
                        href="#towtruck"
                        className="btn-book animated fadeInUp scrollto"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              className="carousel-control-prev"
              href="#heroCarousel"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon icofont-simple-left"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>

            <a
              className="carousel-control-next"
              href="#heroCarousel"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon icofont-simple-right"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="about" className="about">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch">
                <div className="content">
                  <h3>
                    Eum ipsam laborum deleniti{" "}
                    <strong>velit pariatur architecto aut nihil</strong>
                  </h3>
                  <p>
                    TowMe is a web-based innovative application that allows
                    towing services and vehicle owners to interact with one
                    another by sending information regarding car breakdowns i.e.
                    the extent of the damage or vehicle problem, distance and
                    cost of hauling the damaged vehicle. The main purpose of
                    TowMe is to ensure a transparent and efficient interaction
                    between vehicle owners and towing services while building
                    trust between the two parties.
                  </p>
                  <p className="font-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i className="bx bx-check-double"></i> Ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      <i className="bx bx-check-double"></i> Duis aute irure
                      dolor in reprehenderit in voluptate velit.
                    </li>
                    <li>
                      <i className="bx bx-check-double"></i> Ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure
                      dolor in reprehenderit in voluptate trideta storacalaperda
                      mastiro dolore eu fugiat nulla pariatur.
                    </li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="client" className="client">
          <div className="container">
            <div className="section-title">
              <h2>
                What is TowMe to a <span>Client</span>
              </h2>
            </div>
            <div className="row client-container"></div>
          </div>
        </section>
        <section id="towtruck" className="specials">
          <div className="container">
            <div className="section-title">
              <h2>
                What is TowMe to <span>Tow Truck</span> companies
              </h2>
              <p>
                Ut possimus qui ut temporibus culpa velit eveniet modi omnis est
                adipisci expedita at voluptas atque vitae autem.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
