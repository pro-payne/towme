import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import "../home/Home.css";
import "../signup/Signup.css";
import Header from "../../components/header/Header";
import { useLocation, Link, useHistory } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet";
import { Post } from "../../dataservice/service";
import { loggedIn } from "../../dataservice/checkStatus";

const Signin = () => {
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();
  const [section, setSection] = useState("");

  const [form, setForm] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      msg: "",
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      msg: "",
    },
  });

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    switch (location.pathname.toLowerCase()) {
      case "/signin/client":
        setSection("client");
        break;
      case "/signin/company":
        setSection("company");
        break;
      case "/signin":
        setSection("");
        break;
      default:
        history.replace("/signin");
        break;
    }
  }, [location, history]);

  useEffect(() => {
    if (loggedIn()) {
      history.replace("/");
    }
  }, [history]);

  const smoothLabel = (event) => {
    const target = event.currentTarget;
    const sibling = target.nextSibling;
    const parentNode = target.parentNode;

    parentNode.classList.add("active");
    sibling.focus();
  };

  const onChange = (event) => {
    const target = event.currentTarget;
    const parentNode = target.parentNode;
    const name = target.name;
    const value = target.value.trim();

    let msg = "";
    let valid = false;
    let moveIt = true;
    switch (name) {
      case "email":
        const emailExp = /^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i;

        if (value.length === 0) {
          msg = "Email address is required.";
          moveIt = false;
        } else if (!emailExp.test(value)) {
          msg = "Please enter a valid email address.";
        } else {
          valid = true;
        }

        setForm({
          ...form,
          email: { value, valid, touched: true, msg },
        });
        break;
      case "password":
        if (value.length === 0) {
          msg = "Password is required";
          moveIt = false;
        } else if (value.length <= 4) {
          msg = "Password must be at least 5 characters long";
        } else {
          valid = true;
        }
        setForm({
          ...form,
          password: { value, valid, touched: true, msg },
        });
        break;
      default:
        break;
    }

    if (moveIt) {
      parentNode.classList.add("active");
    } else {
      parentNode.classList.remove("active");
    }
  };

  useEffect(() => {
    // Check all
    const toArray = Object.values(form);
    let isValid = true;

    toArray.forEach((value) => {
      if (!value.valid) {
        isValid = false;
      }
    });

    setValid(isValid);
  }, [form]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const toArray = Object.entries(form);
    const extras = Object.entries({ type: { value: section.toLowerCase() } });

    const combined = toArray.concat(extras);

    const data = combined.reduce((result, value) => {
      result[value[0]] = value[1].value;
      return result;
    }, {});

    Post("auth/login", data)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          // Store data locally
          const dataStore = data.data;

          localStorage.setItem("user", JSON.stringify(dataStore));
          history.replace(`/${section}/dashboard`);
        } else {
          addToast(data.error, { appearance: "error", autoDismiss: true });
          setLoading(false);
        }
      })
      .catch((error) => {
        addToast("Oops, something went wrong, try again", {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Header style={{ background: "rgb(47, 45, 44)" }} />
      <section className="hero" style={{ height: "100%" }}>
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
                          <span>Sign</span> In
                        </h2>

                        <p className="animated fadeInUp">
                          Please select account type you want to signin with.
                        </p>
                        <div className="auth-btn">
                          <Link
                            to="/signin/client"
                            className="btn-menu animated fadeInUp scrollto"
                          >
                            Client
                          </Link>
                          <Link
                            to="/signin/company"
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

          {section !== "" ? (
            <>
              <div className="container auth-form">
                <div className="row fix-tab">
                  {section === "client" ? (
                    <div className="col-4 animated fadeInUp scrollto">
                      <div>
                        <form
                          method="post"
                          noValidate="novalidate"
                          onSubmit={onSubmit}
                        >
                          <div className="">
                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <div className="row justify-content-center">
                                  <h2 className="animated fadeInDown">
                                    <span>Client</span> Account
                                  </h2>
                                </div>
                                <div className="form-input">
                                  <div>
                                    <label role="button" onClick={smoothLabel}>
                                      Email Address
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      autoComplete="false"
                                      className=""
                                      placeholder=""
                                      onChange={onChange}
                                      onBlur={onChange}
                                    />
                                  </div>
                                  {form.email.touched && !form.email.valid ? (
                                    <div
                                      className="validate"
                                      style={{ display: "block" }}
                                    >
                                      {form.email.msg}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="form-input">
                                  <div>
                                    <label role="button" onClick={smoothLabel}>
                                      Password
                                    </label>
                                    <input
                                      type="password"
                                      name="password"
                                      id="password"
                                      className=""
                                      placeholder=""
                                      onChange={onChange}
                                      onBlur={onChange}
                                    />
                                  </div>
                                  {form.password.touched &&
                                  !form.password.valid ? (
                                    <div
                                      className="validate"
                                      style={{ display: "block" }}
                                    >
                                      {form.password.msg}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <button
                                type="submit"
                                disabled={!valid || loading}
                              >
                                {!loading ? "Login" : "Submitting..."}
                              </button>
                            </div>
                            <div className="row">
                              <div className="col-md-12 col-xs-12 text-center auth-bottom">
                                Not yet registered?{" "}
                                <Link to="/signup/client">Create Account</Link>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {section === "company" ? (
                    <div className="col-4 animated fadeInUp scrollto">
                      <div>
                        <form
                          method="post"
                          noValidate="novalidate"
                          onSubmit={onSubmit}
                        >
                          <div className="">
                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <div className="row justify-content-center">
                                  <h2 className="animated fadeInDown">
                                    <span>Company</span> Account
                                  </h2>
                                </div>
                                <div className="form-input">
                                  <div>
                                    <label role="button" onClick={smoothLabel}>
                                      Email Address
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      autoComplete="false"
                                      className=""
                                      placeholder=""
                                      onChange={onChange}
                                      onBlur={onChange}
                                    />
                                  </div>
                                  {form.email.touched && !form.email.valid ? (
                                    <div
                                      className="validate"
                                      style={{ display: "block" }}
                                    >
                                      {form.email.msg}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="form-input">
                                  <div>
                                    <label role="button" onClick={smoothLabel}>
                                      Password
                                    </label>
                                    <input
                                      type="password"
                                      name="password"
                                      id="password"
                                      className=""
                                      placeholder=""
                                      onChange={onChange}
                                      onBlur={onChange}
                                    />
                                  </div>
                                  {form.password.touched &&
                                  !form.password.valid ? (
                                    <div
                                      className="validate"
                                      style={{ display: "block" }}
                                    >
                                      {form.password.msg}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <button
                                type="submit"
                                disabled={!valid || loading}
                              >
                                {!loading ? "Login" : "Submitting..."}
                              </button>
                            </div>
                            <div className="row">
                              <div className="col-md-12 col-xs-12 text-center auth-bottom">
                                Not yet registered?{" "}
                                <Link to="/signup/company">Create Account</Link>
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
            </>
          ) : (
            ""
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signin;
