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
import React, { useState, useEffect } from 'react';
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import Moment from 'moment';
import {
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import emailjs from 'emailjs-com';

import Header from "components/Headers/Header.js";
import * as req from "../../requests"
import { Link } from 'react-router-dom'
import AddRemoveAdmins from "../../components/AddRemoveAdmins"

const Hospital = () => {

  const [hasOrganization, sethasOrganization] = useState(true)
  const [requestCompleted1, setrequestCompleted1] = useState(false)
  const [requestCompleted2, setrequestCompleted2] = useState(false)
  const [requestCompleted3, setrequestCompleted3] = useState(false)
  const [requestCompleted4, setrequestCompleted4] = useState(false)

  // Hospital Details

  const [HID, setHID] = useState('')
  const [HName, setHName] = useState('')
  const [HAddress, setHAddress] = useState('')
  const [HPincode, setHPincode] = useState('')
  const [saved, setsaved] = useState(false)
  const [PatientDetails, setPatientDetails] = useState([])
  const [PatientDetailsUnderYou, setPatientDetailsUnderYou] = useState([])

  const [HDetails, setHDetails] = useState([])
  const [RemovePatientID, setRemovePatientID] = useState('')
  const [AddPatiendBG, setAddPatiendBG] = useState('B+')

  const [CheckBGAvailibility, setCheckBGAvailibility] = useState([])
  const [CheckBGAvailibilityNearby, setCheckBGAvailibilityNearby] = useState([])

  const [CheckBGInput, setCheckBGInput] = useState('B+')
  const [hasCheckedBG, sethasCheckedBG] = useState(false)

  const [withdrawBBID, setwithdrawBBID] = useState('')
  const [bloodWithdrawn, setbloodWithdrawn] = useState(false)

  const [emergencyRequirements, setemergencyRequirements] = useState([])
  const [emergencyBGInput, setemergencyBGInput] = useState('B+')
  const [emergencyBGAdded, setemergencyBGAdded] = useState(false)

  const [emergencyEIDInput, setemergencyEIDInput] = useState('')
  const [emergencyEIDRemoved, setemergencyEIDRemoved] = useState(false)

  const [ERMessage, setERMessage] = useState('')

  const withdrawBlood = () => {
    let toSend = {
      "BBID": withdrawBBID,
      "BloodGroup": CheckBGInput
    }
    req.withdrawBlood(toSend).then(r => {
      if (r.status === 200) {
        setbloodWithdrawn(true)
        setTimeout(() => { setbloodWithdrawn(false) }, 2000)
      }
      getAvailableBlood()
    })
  }

  const getemergencyrequirements = () => {
    setrequestCompleted4(true)

    // Clear previous results
    setemergencyRequirements([])
    req.getemergencyrequirements(localStorage.getItem("userID")).then((result) => {
      console.log("emer=?", result)
      if (result && result.length > 0) {
        setemergencyRequirements(result)
      }
    })
  }

  const addemergencyrequirement = () => {
    setERMessage('')
    let toSend = {
      "BloodNeeded": emergencyBGInput,
      "DateRecieved": Moment(new Date()).format('YYYY-MM-DD'),
      "DoctorID": localStorage.getItem("userID")
    }
    req.addemergencyrequirement(toSend).then(r => {
      console.log(r)
      setERMessage(r.message)
      if (r.status === 200) {
        getemergencyrequirements()
        setemergencyBGAdded(true)
        setTimeout(() => { setemergencyBGAdded(false) }, 2000)
      }
    })

    req.getWTDDonors().then(r => {
      if (r && r.length > 0) {
        r.map((obj, key) => {

          
          let paramsToSend = {
            "email": obj.Email,
            "blood": emergencyBGInput,
            "hname": HName,
            "address": HAddress,
            "date": Moment(new Date()).format('YYYY-MM-DD')

          }
          console.log(paramsToSend)
          emailjs.send('default_service', 'template_L4Biapa8', paramsToSend, "user_JgWQwKm41WMzpHGUh9O3x")
            .then((result) => {
              console.log(result.text);
            }, (error) => {
              console.log(error.text);
            });
        })
      }
    })
  }

  const removeemergencyrequirement = () => {
    setERMessage('')
    let toSend = {
      "EID": emergencyEIDInput,
      "UserID": localStorage.getItem("userID")
    }
    console.log(toSend)
    req.removeemergencyrequirement(toSend).then(r => {
      console.log(r)
      setERMessage(r.message)
      if (r.status === 200) {
        getemergencyrequirements()
        setemergencyEIDRemoved(true)
        setTimeout(() => { setemergencyEIDRemoved(false) }, 2000)
      }
    })
  }


  const getAvailableBlood = () => {
    sethasCheckedBG(true)

    // Clear the previous results if any!
    setCheckBGAvailibility([])
    setCheckBGAvailibilityNearby([])

    req.checkBloodAvailability(CheckBGInput).then((result) => {
      console.log(result)
      if (result && result.length > 0) {
        setCheckBGAvailibility(result)
      }
    })

    req.checkBloodAvailabilityNearby(CheckBGInput, localStorage.getItem("userID")).then((result) => {
      console.log(result)
      if (result && result.length > 0) {
        setCheckBGAvailibilityNearby(result)
      }
    })
  }


  const removePatient = () => {
    req.removePatient(RemovePatientID).then((result) => {
      getPatientDetails()
    })
  }

  const addPatient = () => {
    let toSend = {
      "BloodGroup": AddPatiendBG,
      "AdmissionDate": Moment(new Date()).format('YYYY-MM-DD'),
      "UserID": localStorage.getItem('userID'),
      "HID": HID
    }
    console.log(toSend)
    req.addPatient(toSend).then((result) => {
      getPatientDetails()
    })
  }

  const getHDetails = () => {
    setrequestCompleted2(true)
    req.getHDetails(localStorage.getItem('userID')).then((result) => {
      setHDetails(result)
      if (result && result.length > 0) {
        let H = result[0]
        setHName(H.Name)
        setHAddress(H.Address)
        setHID(H.HID)
        setHPincode(H.Pincode)
      }
    })
  }

  const updateHDetails = () => {
    let toSend = {
      "HID": HID,
      "Name": HName,
      "Address": HAddress,
      "Pincode": HPincode
    }

    req.updateH(toSend).then(e => {
      if (e.status == 200) {
        getHDetails()
        setsaved(true)
        setTimeout(() => { setsaved(false) }, 2000)
      }
    })
  }

  const getPatientDetails = () => {
    setrequestCompleted3(true)
    req.getPatientDetails(localStorage.getItem('userID')).then((result) => {
      console.log("=====", result)
      setPatientDetails(result)
    })

    req.getPatientDetailsUnderYou(localStorage.getItem('userID')).then((result) => {
      setPatientDetailsUnderYou(result)
    })
  }

  useEffect(() => {
    if (!requestCompleted1) {
      setrequestCompleted1(true)
      req.getAdminOrganization(localStorage.getItem('userID')).then((result) => {
        // console.log(result)
        sethasOrganization(result)
      })
    }

    if (!requestCompleted2) {
      getHDetails()
    }

    if (!requestCompleted3) {
      getPatientDetails()
    }

    if (!requestCompleted4) {
      getemergencyrequirements()
    }
  })


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- DONOR PAGE ----------------------------------------- */}

        <AddRemoveAdmins hasOrganization={hasOrganization} BB={false} HS={true} DC={false} />


        {hasOrganization && hasOrganization.HE === 1 ?
          <>
            <Row>
              <Col xl={6} l={6} m={6}>
                {HDetails && HDetails.length > 0 ?
                  <Card className="bg-secondary shadow border-0 mt-4">
                    <CardHeader className="bg-transparent pb-5">
                      <h2 className="text-center mb-0">Hospital Details</h2>
                    </CardHeader>
                    <CardBody>
                      <Form role="form">

                        {/* HID */}
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-userid"
                          > HID </label>
                          <Input
                            readOnly
                            value={HID}
                            className="form-control-alternative"
                            placeholder="BBID"
                            type="text"
                          />
                        </FormGroup>

                        {/* Name */}
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-userid"
                          > Name </label>
                          <Input
                            value={HName}
                            className="form-control-alternative"
                            placeholder="Name"
                            onChange={(e) => setHName(e.target.value)}
                            type="text"
                          />
                        </FormGroup>


                        {/* Address */}
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-userid"
                          > Address </label>
                          <Input
                            value={HAddress}
                            className="form-control-alternative"
                            placeholder="Address"
                            onChange={(e) => setHAddress(e.target.value)}
                            type="text"
                          />
                        </FormGroup>

                        {/* Pincode */}

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-userid"
                          > Pincode </label>
                          <Input
                            value={HPincode}
                            className="form-control-alternative"
                            placeholder="Pincode"
                            onChange={(e) => setHPincode(e.target.value)}
                            type="text"
                          />
                        </FormGroup>

                        <div className="text-center">
                          <Button className="my-4" disabled={saved} color="primary" type="button" onClick={updateHDetails}>{saved ? "Saved!" : "Save"}</Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  :
                  <Card className="bg-secondary shadow border-0 mt-4">
                    <CardHeader className="bg-transparent pb-5">
                      <h2 className="text-center mb-0">Hospital Details</h2>
                    </CardHeader>
                    <CardBody>
                      <h2 className="text-center">Sorry, can't find your hospital details</h2>
                    </CardBody>
                  </Card>
                }

              </Col>
              <Col xl={6} l={6} m={6}>

                {PatientDetailsUnderYou && PatientDetailsUnderYou.length > 0 ?
                  // <div className='scrollspy-example-2 mt-4'>
                  <>
                    <Card className="shadow mt-4" >
                      <CardHeader className="border-0 text-center">
                        <h3 className="mb-0">Record of Admitted Patients Under You</h3>

                      </CardHeader>
                      <Table className="align-items-center table-flush mb-4" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Patient ID</th>
                            <th scope="col">Blood Needed</th>
                            <th scope="col">Admission Date</th>
                            <th scope="col">Doctor UserID</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {PatientDetailsUnderYou.map((res, index) => {
                            return <tr key={index}>
                              <td> {res.PID} </td>
                              <td> {res.BloodNeeded} </td>
                              <td> {Moment(res.AdmissionDate).format('LL')} </td>
                              <td> {res.UserID} </td>
                            </tr>
                          })}
                        </tbody>
                      </Table>
                    </Card >

                  </>
                  // </div>
                  :
                  <Card className="shadow mt-4" >
                    <CardBody>
                      <h3 className="mb-0 text-center">There are no admitted patients under you yet.</h3>
                    </CardBody>
                  </Card >
                }
                {PatientDetails && PatientDetails.length > 0 ?
                  <Card className="shadow mt-4" >
                    <CardHeader className="border-0 text-center">
                      <h3 className="mb-0">Record of All Admitted Patients</h3>

                    </CardHeader>
                    <Table className="align-items-center table-flush mb-4" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Patient ID</th>
                          <th scope="col">Blood Needed</th>
                          <th scope="col">Admission Date</th>
                          <th scope="col">Doctor UserID</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {PatientDetails.map((res, index) => {
                          return <tr key={index}>
                            <td> {res.PID} </td>
                            <td> {res.BloodNeeded} </td>
                            <td> {Moment(res.AdmissionDate).format('LL')} </td>
                            <td> {res.UserID} </td>
                          </tr>
                        })}
                      </tbody>
                    </Table>
                  </Card > :
                  <Card className="shadow mt-4" >
                    <CardBody>
                      <h3 className="mb-0 text-center">There are no admitted patients in your hospital yet.</h3>
                    </CardBody>
                  </Card >
                }
                <Row>
                  <Col xl={6}>
                    <div className="mt-4 mx-2 text-center">
                      <h5>Add Patient</h5>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-favourite-28 mr-2" />
                            Blood Group
												</InputGroupText>
                        </InputGroupAddon>
                        <select className="mt-1" value={AddPatiendBG} onChange={(e) => setAddPatiendBG(e.target.value)}>
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
                      <Button className=" mb-2" color="primary" type="button" onClick={addPatient}>Add</Button>
                    </div>
                  </Col>


                  <Col xl={6}>
                    {PatientDetails && PatientDetails.length > 0 ?
                      <div className="mt-4 mx-2 text-center">
                        <h5>Remove Patient</h5>
                        <Input type="number" placeholder="PatientID" value={RemovePatientID} onChange={e => setRemovePatientID(e.target.value)} />
                        <Button className="mt-3 mb-2" color="primary" type="button" onClick={removePatient}>Remove</Button>
                      </div> : null}
                  </Col>

                </Row>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Card className="shadow mt-4 mb-2">
                  <CardHeader>
                    <h2 className="text-center">Check Blood Availablity</h2>
                  </CardHeader>
                  <CardBody className="text-center">
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-favourite-28 mr-2" />
                          Enter Blood Group
												</InputGroupText>
                      </InputGroupAddon>
                      <select className="mt-1" value={CheckBGInput} onChange={(e) => setCheckBGInput(e.target.value)}>
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
                    <Button className=" mb-2" color="primary" type="button" onClick={getAvailableBlood}>Check</Button>
                  </CardBody>
                </Card>


                {hasCheckedBG && CheckBGAvailibilityNearby && CheckBGAvailibilityNearby.length > 0 && CheckBGAvailibility && CheckBGAvailibility.length > 0 ?
                  <Card className="shadow mt-4 mb-2">
                    <CardHeader>
                      <h2 className="text-center">Withdraw From Blood Bank</h2>
                    </CardHeader>
                    <CardBody className="text-center">
                      <Form role="form">
                        {/* BBID */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-building" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="BBID" type="text" value={withdrawBBID} onChange={(e) => setwithdrawBBID(e.target.value)} />
                          </InputGroup>
                        </FormGroup>
                      </Form>

                      <Button className=" mb-2" color="primary" type="button" disabled={bloodWithdrawn} onClick={withdrawBlood}> {bloodWithdrawn ? "Done!" : "Withdraw"}</Button>
                    </CardBody>
                  </Card>
                  : null}

              </Col>
              <Col>
                {


                  hasCheckedBG ?


                    (
                      <>
                        {CheckBGAvailibilityNearby && CheckBGAvailibilityNearby.length > 0 ?
                          <Card className="shadow mt-4" >
                            <CardHeader className="border-0 text-center">
                              <h3 className="mb-0">Blood Banks Nearby Containing Your Selected Blood Group</h3>

                            </CardHeader>
                            <Table className="align-items-center table-flush mb-4" responsive>
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">BBID</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Address</th>
                                  <th scope="col">Pincode</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col" />
                                </tr>
                              </thead>
                              <tbody>
                                {CheckBGAvailibilityNearby.map((res, index) => {
                                  return <tr key={index}>
                                    <td> {res.BBID} </td>
                                    <td> {res.Name} </td>
                                    <td> {res.Address} </td>
                                    <td> {res.Pincode} </td>
                                    <td> {res.Amount} </td>
                                  </tr>
                                })}
                              </tbody>
                            </Table>
                          </Card >
                          : <Card className="shadow mt-4" >
                            <CardHeader className="border-0 text-center">
                              <h2 className="mb-0">Blood Banks Nearby Containing Your Selected Blood Group</h2>

                            </CardHeader>
                            <CardBody className="text-center">
                              <h3>No nearby blood banks found!</h3>
                            </CardBody>
                          </Card >}

                        {CheckBGAvailibility && CheckBGAvailibility.length > 0 ?
                          <Card className="shadow mt-4" >
                            <CardHeader className="border-0 text-center">
                              <h3 className="mb-0">All Blood Banks Containing Your Selected Blood Group</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush mb-4" responsive>
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">BBID</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Address</th>
                                  <th scope="col">Pincode</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col" />
                                </tr>
                              </thead>
                              <tbody>
                                {CheckBGAvailibility.map((res, index) => {
                                  return <tr key={index}>
                                    <td> {res.BBID} </td>
                                    <td> {res.Name} </td>
                                    <td> {res.Address} </td>
                                    <td> {res.Pincode} </td>
                                    <td> {res.Amount} </td>
                                  </tr>
                                })}
                              </tbody>
                            </Table>
                          </Card >
                          : <Card className="shadow mt-4" >
                            <CardHeader className="border-0 text-center">
                              <h2 className="mb-0">All Blood Banks Containing Your Selected Blood Group</h2>

                            </CardHeader>
                            <CardBody className="text-center">
                              <h3>No blood banks found!</h3>
                            </CardBody>
                          </Card >}

                      </>)
                    : null
                }
              </Col>
            </Row>

            <Row className="my-4">
              <Col>
                <Card className="shadow mt-4 mb-2">
                  <CardHeader>
                    <h2 className="text-center">Emergency Requirement of Blood</h2>
                  </CardHeader>
                  <CardBody className="text-center">

                    <Row>
                      <Table className="align-items-center table-flush mb-4" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">EID</th>
                            <th scope="col">Blood Needed</th>
                            <th scope="col">Date Posted</th>
                            <th scope="col">Doctor's UserID</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {emergencyRequirements.map((res, index) => {
                            return <tr key={index}>
                              <td> {res.EID} </td>
                              <td> {res.BloodNeeded} </td>
                              <td> {Moment(res.DateRecieved).format('LL')} </td>
                              <td> {res.DoctorID} </td>
                            </tr>
                          })}
                        </tbody>
                      </Table>
                    </Row>


                    <Row>
                      <Col xl={2}></Col>
                      <Col xl={4}>
                        <h3>Post Requirement</h3>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-favourite-28 mr-2" />Enter Blood Group
												    </InputGroupText>
                          </InputGroupAddon>
                          <select className="mt-1" value={emergencyBGInput} onChange={(e) => setemergencyBGInput(e.target.value)}>
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
                        <Button className=" mb-2" color="primary" type="button" disabled={emergencyBGAdded} onClick={addemergencyrequirement}> {emergencyBGAdded ? "Added!" : "Add"}</Button>
                      </Col>
                      <Col xl={4}>
                        <h3>Remove Requirement</h3>
                        <InputGroup className="input-group-alternative mb-3">
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              Enter EID
												    </InputGroupText>
                          </InputGroupAddon> */}
                          <Input type="number" placeholder="Enter EID" value={emergencyEIDInput} onChange={(e) => setemergencyEIDInput(e.target.value)}></Input>
                        </InputGroup>
                        <Button className=" mb-2" color="primary" type="button" disabled={emergencyEIDRemoved} onClick={removeemergencyrequirement}> {emergencyEIDRemoved ? "Removed!" : "Remove"}</Button>

                      </Col>
                      <Col xl={2}></Col>
                    </Row>
                    <Row className="text-center">
                      <Col xl={4}></Col>
                      <Col xl={4}> <h2 className="text-center">{ERMessage}</h2></Col>
                      <Col xl={4}></Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
          : null}
      </Container>

    </>
  );
}

export default Hospital;
