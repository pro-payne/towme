import React, { useEffect, useState } from "react";
import "../home/Home.css";
import "./Signup.css";
import Header from "../../components/header/Header";
import { useLocation, Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet";

const Signup = () => {
  const location = useLocation();
  const [section, setSection] = useState("");

  useEffect(() => {
    console.log(location);
    switch (location.pathname.toLowerCase()) {
      case "/signup/client":
        setSection("client");
        break;
      case "/signup/company":
        setSection("company");
        break;
      default:
        setSection("");
        break;
    }
  }, [location]);

  const smoothLabel = (event) => {
    const target = event.currentTarget;
    //   const sibling = target

    console.log(target);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Header style={{ background: "rgb(47, 45, 44)" }} />
      <section id="hero">
        <div className="hero-container">
          {section === "" ? (
            <>
              <div
                id="heroCarousel"
                className="carousel slide carousel-fade"
                data-ride="carousel"
              >
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <div className="carousel-container">
                      <div className="carousel-content">
                        <h2 className="animated fadeInDown">
                          <span>Sign</span> Up
                        </h2>

                        <p className="animated fadeInUp">
                          Please select account type you want to create.
                        </p>
                        <div className="auth-btn">
                          <Link
                            to="/signup/client"
                            className="btn-menu animated fadeInUp scrollto"
                          >
                            Client
                          </Link>
                          <Link
                            to="/signup/company"
                            className="btn-book animated fadeInUp scrollto"
                          >
                            Tow Truck
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="container auth-form">
            <div className="row fix-tab">
              {section === "client" ? (
                <div className="col-4 animated fadeInUp scrollto">
                  <div>
                    <form method="post" noValidate="novalidate">
                      <div className="">
                        <div className="row">
                          <div className="col-md-12 col-xs-12">
                            <div className="row justify-content-center">
                              <h2 className="animated fadeInDown">
                                <span>Client</span> Account
                              </h2>
                            </div>
                            <div className="form-input">
                              <label role="button" onClick={smoothLabel}>
                                First Name
                              </label>
                              <input
                                type="text"
                                name="first_name"
                                className=""
                                placeholder=""
                              />
                            </div>
                            <div className="form-input">
                              <label>Surname</label>
                              <input
                                type="text"
                                name="last_name"
                                className=""
                                placeholder=""
                              />
                            </div>
                            <div className="form-input">
                              <label>Email Address</label>
                              <input
                                type="text"
                                name="email"
                                autoComplete="false"
                                className=""
                                placeholder=""
                              />
                            </div>
                            <div className="form-input">
                              <label>Password</label>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                className=""
                                placeholder=""
                              />
                            </div>
                            <div className="form-input">
                              <label>Confirm Password</label>
                              <input
                                type="password"
                                name="confirm_password"
                                className=""
                                placeholder=""
                              />
                            </div>
                          </div>
                        </div>

                        <div className="line"></div>
                        <div className="row">
                          <div className="col-md-12 col-xs-12 text-center termncondi">
                            <div>
                              <input
                                id="termncondi"
                                type="checkbox"
                                name="termncondi"
                              />
                              <label htmlFor="termncondi">
                                by signing up you accept our{" "}
                                <a
                                  href="#terms"
                                  target="_blank"
                                  title="Terms of Service"
                                >
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                  href="#privacy"
                                  target="_blank"
                                  title="Privacy Policy"
                                >
                                  Privacy Policy
                                </a>
                                .
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-xs-12 text-center auth-bottom">
                            Already registered? <a href="#signin">Sign in.</a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;
