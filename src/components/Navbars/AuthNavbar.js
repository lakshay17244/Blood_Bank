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
import React, { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Col, Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row } from "reactstrap";

const AdminNavbar = (props) => {
  const [collapse, setcollapse] = useState(false)
  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark"
        expand="md"
      >
        <Container className="px-4" >
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={require("assets/img/brand/argon-react-white.png")} />
          </NavbarBrand>
          <button className="navbar-toggler" onClick={() => setcollapse(true)} id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <Collapse isOpen={collapse} navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="4">
                  <img
                    alt="..."
                    src={require("assets/img/brand/argon-react.png")}
                  />
                </Col>
                <Col className="collapse-brand mx-auto text-center" xs="4">
                  <img
                    alt="..."
                    src={require("assets/img/brand/argon-react2.png")}
                  />
                </Col>
                <Col className="collapse-close" xs="4">
                  <button
                    className="navbar-toggler"
                    id="navbar-collapse-main"
                    onClick={() => setcollapse(false)}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem onClick={() => setcollapse(false)}>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </NavLink>
              </NavItem>
              <NavItem onClick={() => setcollapse(false)}>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/login"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );

}

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: _.get(state, "isLoggedIn", false),
//   }
// }

// export default connect(mapStateToProps)(AdminNavbar);

export default AdminNavbar
