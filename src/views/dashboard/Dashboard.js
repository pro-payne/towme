import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { loggedIn } from "../../dataservice/checkStatus";
import { useHistory } from "react-router-dom";
import { Post } from "../../dataservice/service";

const Dashboard = () => {
  const history = useHistory();

  const [name, setName] = useState("Customer");
  useEffect(() => {
    if (!loggedIn()) {
      history.replace("/signin");
    } else {
      const local = localStorage.getItem("user") || "";
      if (local !== "") {
        const parse = JSON.parse(local);
        if (typeof parse.user !== "undefined") {
          setName(`${parse.user.first_name} ${parse.user.last_name}`);
        }
      }
    }
  }, [history]);

  const logOut = (event) => {
    event.preventDefault();

    const local = localStorage.getItem("user") || "";
    let user = "";
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
        history.replace("/signin/".concat(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <section id="dashboard" className="section-container under-construction">
        <h1>Welcome, {name}</h1>
        <h3>Page still under construction</h3>
        <button type="button" className="btn-yellow" onClick={logOut}>
          Log Out
        </button>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
