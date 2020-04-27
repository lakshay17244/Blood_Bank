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

import Header from "components/Headers/Header.js";
import * as req from "../../requests"
import { Link } from 'react-router-dom'
import AddRemoveAdmins from "../../components/AddRemoveAdmins"

const Hospital = () => {

  const [hasOrganization, sethasOrganization] = useState(true)
  const [requestCompleted1, setrequestCompleted1] = useState(false)
  const [requestCompleted2, setrequestCompleted2] = useState(false)
  const [requestCompleted3, setrequestCompleted3] = useState(false)

  // Hospital Details

  const [HID, setHID] = useState('')
  const [HName, setHName] = useState('')
  const [HAddress, setHAddress] = useState('')
  const [HPincode, setHPincode] = useState('')
  const [saved, setsaved] = useState(false)
  const [PatientDetails, setPatientDetails] = useState([])
  const [HDetails, setHDetails] = useState([])
  const [RemovePatientID, setRemovePatientID] = useState('')
  const [AddPatiendBG, setAddPatiendBG] = useState('B+')

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
    req.getHDetails(localStorage.getItem('userID')).then((result) => {
      setHDetails(result)
      if (result && result.length > 0) {
        let H = result[0]
        setHName(H.Name)
        setHAddress(H.Address)
        setHID(H.HID)
        setHPincode(H.Pincode)
      }
      setrequestCompleted2(true)
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
    req.getPatientDetails(localStorage.getItem('userID')).then((result) => {
      console.log("=====", result)
      setPatientDetails(result)
      setrequestCompleted3(true)
    })
  }

  useEffect(() => {
    if (!requestCompleted1) {
      req.getAdminOrganization(localStorage.getItem('userID')).then((result) => {
        // console.log(result)
        sethasOrganization(result)
        setrequestCompleted1(true)
      })
    }

    if (!requestCompleted2) {
      getHDetails()
    }

    if (!requestCompleted3) {
      getPatientDetails()
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

              {PatientDetails && PatientDetails.length > 0 ?
                // <div className='scrollspy-example-2 mt-4'>
                <>
                  <Card className="shadow mt-4" >
                    <CardHeader className="border-0 text-center">
                      <h3 className="mb-0">Record of Admitted Patients</h3>

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
                            <td> {res.AdmissionDate} </td>
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
                    <h3 className="mb-0 text-center">There are no admitted patients in your hospital yet.</h3>
                  </CardBody>
                </Card >
              }

              <Row>
                <Col xl={6}>
                  <div className="mt-4 mx-2 text-center">
                    <h5>Add Patient</h5>
                    {/* <FormGroup> */}
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
                    {/* </FormGroup> */}
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
          : null}
      </Container>

    </>
  );
}

export default Hospital;
