/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

import getallroutes from "routes.js";
import { connect } from "react-redux"
import { login } from "../redux/actions_and_reducers/actions"
import _ from "lodash"

const Auth = (props) => {
  let history = useHistory();
  const [DidMount, setDidMount] = useState(false)
  useEffect(() => {
    return () => {
      document.body.classList.remove("bg-default");
    }
  }, [])

  useEffect(() => {
    if (!DidMount) {
      setDidMount(true)
      document.body.classList.add("bg-default");
      let { isLoggedIn } = props
      // let UserID = localStorage.getItem("UserID");
      let access_token = localStorage.getItem("access_token");

      // AUTO LOGIN
      if (!isLoggedIn && access_token) {
        props.login("", "", true)
      }
    }

    if (props.isLoggedIn) {
      history.push("/admin/index");
    }

  }, [DidMount, props, history])

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                {window.location.pathname === "/auth/register" &&
                  <Col lg="5" md="6">
                    <h1 className="text-white">Sign up today!</h1>
                    <p className="text-lead text-light">
                      Register here as a donor or an admin.
                    </p>
                  </Col>}

              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(getallroutes(props.Type))}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
      </div>
      {/* <AuthFooter /> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    Type: _.get(state, "UserDetails.Type", "Anon")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (u, p, a) => dispatch(login(u, p, a))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
