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
import UserHeader from "components/Headers/UserHeader.js";
import React from "react";
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import * as req from "../../requests";




class Profile extends React.Component {

  componentDidMount() {
    let userid = localStorage.getItem("userID")
    if (userid.length > 0) {
      req.getUserDetails(userid).then(e => {
        console.log(e)
        this.setState({
          type: e.Type,
          username: e.Username,
          userid: e.UserID,
          email: e.Email,
          dob: e.Age,
          bloodgroup: e.BloodGroup,
          phone: e.Phone,
          address: e.Address,
          pincode: e.Pincode,
          WTD: e.WillingToDonate
        })
      })
    }
  }

  constructor(props) {
    super(props);
    let today = new Date()
    let month = (today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
    let day = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();
    let dateToday = today.getFullYear() - 18 + '-' + month + '-' + day

    this.state = {
      type: 'Donor',
      date: dateToday,
      username: 'Lakshay',
      userid: '1',
      name: '',
      email: '',
      dob: 0,
      bloodgroup: '',
      phone: '',
      address: '',
      pincode: '',
      oldpass: '',
      newpass: '',
      UserUpdated: false,
      WTD: false,
      editable: true
    }
  }
  updateUser = () => {
    let toSend = {
      "UserID": localStorage.getItem("userID"),
      "user": {
        "Type": this.state.type,
        "Username": this.state.username,
        "Email": this.state.email,
        "Age": this.state.dob,
        "Bloodgroup": this.state.bloodgroup,
        "Phone": this.state.phone,
        "Address": this.state.address,
        "Pincode": this.state.pincode,
        "Password": this.state.newpass,
        "WTD": this.state.WTD
      }
    }

    req.updateUser(toSend).then(e => {
      console.log("CREATE USER RETURNED - ", e);
      if (parseInt(e.status) === 200) {
        this.setState({
          UserUpdated: true,
          editable: false
        })

        setTimeout(() => { this.setState({ editable: true }) }, 1000)
      }
    })
  }
  handleusername(e) {
    this.setState({
      username: e.target.value
    })
  }

  handleuserid(e) {
    this.setState({
      userid: e.target.value
    })
  }
  handlename(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleemail(e) {
    this.setState({
      email: e.target.value
    })
  }
  handledob(e) {
    this.setState({
      dob: e.target.value
    })
  }
  handlebloodgroup(e) {
    this.setState({
      bloodgroup: e.target.value
    })
  }
  handlephone(e) {
    this.setState({
      phone: e.target.value
    })
  }
  handleaddress(e) {
    this.setState({
      address: e.target.value
    })
  }
  handlepincode(e) {
    this.setState({
      pincode: e.target.value
    })
  }
  handlepass(e) {
    this.setState({
      pass: e.target.value
    })
  }
  handleoldpass(e) {
    this.setState({
      oldpass: e.target.value
    })
  }
  handlenewpass(e) {
    this.setState({
      newpass: e.target.value
    })
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Jessica Jones
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            */}
            <Col className="order-xl-1" xl="12">
              {/* Profile Picture */}

              <Card className="bg-secondary shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="bg-white border-0">



                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">

                      <Button
                        disabled={!this.state.editable}
                        color="primary"
                        href="#pablo"
                        onClick={
                          e => {
                            e.preventDefault()
                            this.updateUser()
                          }}
                        size="sm"
                      >
                        {this.state.editable ? "Save" : "Saved!"}
                      </Button>

                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information (<b>{this.state.type}</b>)
                    </h6>

                    <div className="pl-lg-4">
                      <Row>
                        {/* USERNAME */}
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Name
                            </label>
                            {/* <Input
                              className="form-control-alternative"
                              defaultValue="NA"
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            /> */}
                            <Input
                              // readOnly
                              className="form-control-alternative"
                              value={this.state.username}
                              onChange={(e) => { this.handleusername(e.target.value)}}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        {/* USER ID */}
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-userid"
                            >
                              User ID
                            </label>
                            <Input
                              readOnly
                              value={this.state.userid}
                              className="form-control-alternative"
                              id="input-userID"
                              placeholder="UserID"
                              type="text"
                            />
                          </FormGroup>
                        </Col>

                        {/* NAME */}
                        {/* <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.name}
                              onChange={(e) => this.handlename(e)}
                              id="input-first-name"
                              placeholder="Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col> */}

                        {/* EMAIL */}
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="jesse@example.com"
                              value={this.state.email}
                              onChange={(e) => this.handleemail(e)}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>

                        {/* DOB */}
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Age
                            </label>
                            {/* <Input
                              value={this.state.dob}
                              className="form-control-alternative"
                              id="input-dob"
                              type="date"
                              onChange={(e) => this.handledob(e)}
                              max={this.state.date}
                            /> */}
                            <Input
                              value={this.state.dob}
                              className="form-control-alternative"
                              id="input-dob"
                              type="number"
                              onChange={(e) => this.handledob(e)}
                              max={this.state.date}
                            />
                          </FormGroup>
                        </Col>

                        {/* Blood Group */}
                        <Col lg="6">
                          {
                            this.state.type === 'Donor' ?
                              (<FormGroup>
                                < label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Blood Group
                            </label>
                                <InputGroup className="input-group-alternative mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="ni ni-favourite-28 mr-2" />

                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <select value={this.state.bloodgroup} onChange={(e) => this.handlebloodgroup(e)}>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                  </select>
                                </InputGroup>
                              </FormGroup>)
                              :
                              null
                          }
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>

                        {/* Phone */}
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phont"
                              placeholder="Mobile Number"
                              type="text"
                              value={this.state.phone}
                              onChange={(e) => this.handlephone(e)}
                            // max={999999999}
                            />
                          </FormGroup>
                        </Col>

                        {/* Address */}
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              value={this.state.address}
                              onChange={(e) => this.handleaddress(e)}
                            />
                          </FormGroup>
                        </Col>

                        {/* Pincode */}
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Pin Code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="text"
                              value={this.state.pincode}
                              onChange={(e) => this.handlepincode(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* 
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="New York"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>

                      </Row>
                   */}


                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Change Password</h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <FormGroup>

                            <label>Old Password</label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Type your old password"
                              type="password"
                              value={this.state.oldpass}
                              onChange={(e) => this.handleoldpass(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label>New Password</label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Type your new password"
                              type="password"
                              value={this.state.newpass}
                              onChange={(e) => this.handlenewpass(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
