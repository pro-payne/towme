import React, { useState, useEffect } from "react";
import "./Contactus.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Contactus = () => {
  const [form, setForm] = useState({
    full_name: {
      value: "",
      valid: false,
      touched: false,
      msg: "",
    },
    email: {
      value: "",
      valid: false,
      touched: false,
      msg: "",
    },
    subject: {
      value: "",
      valid: false,
      touched: false,
      msg: "",
    },
    message: {
      value: "",
      valid: false,
      touched: false,
      msg: "",
    },
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  const onChange = (event) => {
    const target = event.currentTarget;
    const name = target.name;
    const value = target.value.trim();

    let msg = "";
    let valid = false;
    switch (name) {
      case "full_name":
        if (value.length === 0) {
          msg = "Full name is required";
        } else if (value.length <= 5) {
          msg = "Your name can't be less than 5 characters";
        } else {
          valid = true;
        }
        setForm({
          ...form,
          full_name: { value, valid, touched: true, msg },
        });
        break;
      case "email":
        const emailExp = /^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i;

        if (value.length === 0) {
          msg = "Email address is required.";
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
      case "subject":
        if (value.length === 0) {
          msg = "Subject is required";
        } else if (value.length <= 5) {
          msg = "Please write a descriptive subject.";
        } else {
          valid = true;
        }

        setForm({
          ...form,
          subject: { value, valid: false, touched: true, msg },
        });
        break;
      case "message":
        if (value.length === 0) {
          msg = "Your message is required";
        } else if (value.length <= 50) {
          msg = "Your message can't be less than 50 characters";
        } else {
          valid = true;
        }
        setForm({
          ...form,
          message: { value, valid: false, touched: true, msg },
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>
              <span>Contact</span> Us
            </h2>
            <p>
              Ut possimus qui ut temporibus culpa velit eveniet modi omnis est
              adipisci expedita at voluptas atque vitae autem.
            </p>
          </div>
        </div>

        <div className="container mt-5">
          <div className="info-wrap">
            <div className="row">
              <div className="col-lg-3 col-md-6 info">
                <i className="icofont-google-map"></i>
                <h4>Location:</h4>
                <p>
                  36 Langfield Road
                  <br />
                  Whittlesea 5360
                </p>
              </div>

              <div className="col-lg-3 col-md-6 info mt-4 mt-lg-0">
                <i className="icofont-clock-time icofont-rotate-90"></i>
                <h4>Open Hours:</h4>
                <p>
                  Monday-Saturday:
                  <br />
                  11:00 AM - 2300 PM
                </p>
              </div>

              <div className="col-lg-3 col-md-6 info mt-4 mt-lg-0">
                <i className="icofont-envelope"></i>
                <h4>Email:</h4>
                <p>
                  info@towme.com
                  <br />
                  mbonisimaku@gmail.com
                </p>
              </div>

              <div className="col-lg-3 col-md-6 info mt-4 mt-lg-0">
                <i className="icofont-phone"></i>
                <h4>Call:</h4>
                <p>
                  079 281 4641
                  <br />
                </p>
              </div>
            </div>
          </div>

          <form
            action="forms/contact.php"
            method="post"
            className="php-email-form"
            onSubmit={onSubmit}
          >
            <div className="form-row">
              <div className="col-md-6 form-group">
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  onChange={onChange}
                  onBlur={onChange}
                />
                {form.full_name.touched && !form.full_name.valid ? (
                  <div className="validate" style={{ display: "block" }}>
                    {form.full_name.msg}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6 form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={onChange}
                  onBlur={onChange}
                />
                {form.email.touched && !form.email.valid ? (
                  <div className="validate" style={{ display: "block" }}>
                    {form.email.msg}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                placeholder="Subject"
                onChange={onChange}
                onBlur={onChange}
              />
              {form.subject.touched && !form.subject.valid ? (
                <div className="validate" style={{ display: "block" }}>
                  {form.subject.msg}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="message"
                rows="5"
                placeholder="Message"
                onBlur={onChange}
                onChange={onChange}
              ></textarea>
              {form.message.touched && !form.message.valid ? (
                <div className="validate" style={{ display: "block" }}>
                  {form.message.msg}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <div className="loading">Loading</div>
              <div className="error-message"></div>
              <div className="sent-message">
                Your message has been sent. Thank you!
              </div>
            </div>
            <div className="text-center">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contactus;
