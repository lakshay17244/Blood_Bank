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
import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from "reactstrap";
import * as req from "../../requests";
import { connect } from "react-redux";
import { getUserDetails } from "../../redux/actions_and_reducers/actions"
import _ from "lodash"
import Select from 'react-select';

const BloodGroups = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' }
]

const Profile = (props) => {
  const [DidMount, setDidMount] = useState(false)
  const [type, settype] = useState('Donor')
  const [date, setdate] = useState('')
  const [username, setusername] = useState('Lakshay')
  const [UserID, setUserID] = useState('1')
  const [email, setemail] = useState('')
  const [dob, setdob] = useState(0)
  const [BloodGroup, setBloodGroup] = useState(BloodGroups[2])
  const [phone, setphone] = useState('')
  const [address, setaddress] = useState('')
  const [pincode, setpincode] = useState('')
  const [oldpass, setoldpass] = useState('')
  const [newpass, setnewpass] = useState('')
  const [WTD, setWTD] = useState(false)
  const [editable, seteditable] = useState(true)
  // const [loading, setloading] = useState(true)

  useEffect(() => {
    if (!DidMount) {
      console.log("Mounted Profile.js")
      setDidMount(true)
      let { UserDetails, UserDetailsLoading, isLoggedIn } = props

      if (_.isEmpty(UserDetails) && !UserDetailsLoading && isLoggedIn) {
        console.log("If statement")
        let UserID = localStorage.getItem("UserID")
        if (UserID && UserID.length > 0) {
          // setloading(true)
          props.getUserDetails(UserID).then(e => {
            // Set all user details
            setUserDetails(e)
          })
        }
      }
      else {
        setUserDetails(UserDetails)
      }

      let today = new Date()
      let month = (today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
      let day = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();
      let dateToday = today.getFullYear() - 18 + '-' + month + '-' + day
      setdate(dateToday)
    }
  }, [DidMount, props])

  const setUserDetails = (e) => {
    if (!_.isEmpty(e)) {
      settype(e.Type)
      setusername(e.Username)
      setUserID(e.UserID)
      setemail(e.Email)
      setdob(e.Age)
      setBloodGroup({ value: e.BloodGroup, label: e.BloodGroup })
      setphone(e.Phone)
      setaddress(e.Address)
      setpincode(e.Pincode)
      setWTD(e.WillingToDonate)
      // setloading(false)
    }
  }


  const updateUser = () => {
    let toSend = {
      "UserID": localStorage.getItem("UserID"),
      "user": {
        "Type": type,
        "Username": username,
        "Email": email,
        "Age": dob,
        "Bloodgroup": BloodGroup.value,
        "Phone": phone,
        "Address": address,
        "Pincode": pincode,
        "Password": newpass,
        "WTD": WTD
      }
    }

    req.updateUser(toSend).then(e => {
      if (parseInt(e.status) === 200) {
        seteditable(false)

        props.getUserDetails(UserID)
        setTimeout(() => { seteditable(true) }, 1000)
      }
    })
  }

  return (
    <>
      <UserHeader />


      {/* Page content */}

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl={12}>
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
                      disabled={!editable}
                      color="primary"
                      href="#pablo"
                      onClick={
                        e => {
                          e.preventDefault()
                          updateUser()
                        }}
                      size="sm"
                    >
                      {editable ? "Save" : "Saved!"}
                    </Button>

                  </Col>
                </Row>
              </CardHeader>

              {!props.UserDetailsLoading ?
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information (<b>{type}</b>)
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
                            <Input
                              className="form-control-alternative"
                              value={username}
                              onChange={(e) => setusername(e.target.value)}
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
                            >
                              User ID
                            </label>
                            <Input
                              readOnly
                              value={UserID}
                              className="form-control-alternative"
                              id="input-userID"
                              placeholder="UserID"
                              type="text"
                            />
                          </FormGroup>
                        </Col>

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
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
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
                            <Input
                              value={dob}
                              className="form-control-alternative"
                              id="input-dob"
                              type="number"
                              onChange={(e) => setdob(e.target.value)}
                              max={date}
                            />
                          </FormGroup>
                        </Col>

                        {/* Blood Group */}
                        <Col lg="6">
                          {
                            type === 'Donor' ?
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
                                  <Select
                                    className="basic-single my-auto w-25"
                                    classNamePrefix="select"
                                    defaultValue={"Select"}
                                    value={BloodGroup}
                                    onChange={(e) => { setBloodGroup(e) }}
                                    name="color"
                                    options={BloodGroups}
                                  />
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
                              value={phone}
                              onChange={(e) => setphone(e.target.value)}
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
                              value={address}
                              onChange={(e) => setaddress(e.target.value)}
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
                              value={pincode}
                              onChange={(e) => setpincode(e.target.value)}
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
                              value={oldpass}
                              onChange={(e) => setoldpass(e.target.value)}
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
                              value={newpass}
                              onChange={(e) => setnewpass(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>

                :

                <div className="text-center my-xl-5"> <Spinner color="primary" /></div>

              }
            </Card>
          </Col>
        </Row>
      </Container>


    </>
  );

}


const mapStateToProps = (state) => {
  return {
    UserDetails: state.UserDetails,
    UserDetailsLoading: state.UserDetailsLoading,
    isLoggedIn: _.get(state, "isLoggedIn", false),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: e => dispatch(getUserDetails(e))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
