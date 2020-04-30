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
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import * as req from "../../requests";



const Login = () => {

  let history = useHistory();
  const [password, setpassword] = useState("");
  const [userID, setuserID] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [recievedMessage, setrecievedMessage] = useState("");

  const sendLoginReq = () => {
    req.loginAPI(parseInt(userID), password).then((e => {
      // console.log("LOG IN API RETURNED ", e)
      setrecievedMessage(e.message)
      setisLoggedIn(e.loggedIn)
    }))
  }

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === "true") {
      history.push("/admin/index");
    }
    if (isLoggedIn === true) {
      localStorage.setItem('isLoggedIn', isLoggedIn);
      localStorage.setItem('userID', userID);
      req.getUserDetails(userID).then(r => {
        localStorage.setItem("type", r.Type)
        localStorage.setItem("name", r.Username)
        history.push("/admin/index");
      })
    }
  })

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5"> */}
          {/*<div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>*/}
          {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with UserID</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  {/* <Input placeholder="UserID" type="number" value={this.state.userID} onChange={(e) => this.handleuserID(e)} /> */}
                  <Input placeholder="UserID" type="number" value={userID} onChange={(e) => setuserID(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  {/* <Input placeholder="Password" type="password" autoComplete="new-password" value={this.state.password} onChange={(e) => this.handlepassword(e)} /> */}
                  <Input placeholder="Password" type="password" autoComplete="new-password" value={password} onChange={(e) => setpassword(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <div className="text-center mb-4">
                <small>{recievedMessage}</small>
              </div>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={() => sendLoginReq()}>
                  Sign in
                  </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          {/* <Col xs="6"> */}
          {/* <a
              className="text-light"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a> */}
          {/* </Col> */}
          <Col className="text-center">
            <Link to="/auth/register">
              {/* <a
                  className="text-light"
                  // href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                  }}
                > */}
              <small className="text-light">Create new account</small>
              {/* </a> */}
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default Login;
