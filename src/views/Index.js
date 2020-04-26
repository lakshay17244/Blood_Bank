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
import { Link } from "react-router-dom";
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
import * as req from "../requests"
import AddRemoveAdmins from "../components/AddRemoveAdmins"


const Index = () => {

  // Add New Organization
  const [hasOrganization, sethasOrganization] = useState(true)
  const [name, handleName] = useState('')
  const [patients, handlePatients] = useState('')
  const [address, handleAddress] = useState('')
  const [pincode, handlePincode] = useState('')
  const [registerButton, handleRegister] = useState('Hospital')
  const [addAdmin, handleaddAdmin] = useState('')
  const [totalcapacity, handletotalcapacity] = useState('')
  const [capacityleft, handlecapacityleft] = useState('')
  const [associatedbbid, handleassociatedbbid] = useState('')

  // User Details
  const [type, setType] = useState('')
  const [bloodGroup, setbloodGroup] = useState('B+')

  // Donate Blood
  const [donatedBloodAmount, setdonatedBloodAmount] = useState('')
  const [donatedBloodDCID, setdonatedBloodDCID] = useState('')
  const [donateBloodMessage, setDonateBloodMessage] = useState('')
  const [donatedBloodUserID, setdonatedBloodUserID] = useState('')
  const [showDonationDate, setshowDonationDate] = useState(true)
  const [donations, setDonations] = useState('')
  const [requestCompleted, setrequestCompleted] = useState(false)
  const [requestCompleted1, setrequestCompleted1] = useState(false)

  // Register Organization
  const [registerOrganizationMessage, setregisterOrganizationMessage] = useState('')
  // Table Sorting
  const [sortAsc, setsortAsc] = useState(false)
  const [currHead, setcurrHead] = useState('')



  useEffect(() => {
    if (!requestCompleted) {
      req.getPastDonations(localStorage.getItem('userID')).then((donations) => {
        setDonations(donations)
        setrequestCompleted(true)
      })
    }


    if (!requestCompleted1) {
      req.getAdminOrganization(localStorage.getItem('userID')).then((result) => {
        console.log("====", result)
        sethasOrganization(result)
        setrequestCompleted1(true)
      })
    }

    // Set Type to admin or donor with delay added for user request
    setTimeout(() => {
      // console.log("==>", localStorage.getItem('type'))
      setType(localStorage.getItem('type'))
    }, 500)

    setTimeout(() => {
      // console.log("==>", localStorage.getItem('type'))
      setType(localStorage.getItem('type'))
    }, 3000)

  })

  const donateBlood = () => {
    let today = new Date()
    let month = (today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
    let day = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();
    let dateToday = today.getFullYear() + '-' + month + '-' + (day + 4)

    let toSend = {
      'UserID': donatedBloodUserID.split(","),
      'DateRecieved': dateToday,
      'AdminID': localStorage.getItem("userID"),
      // 'Amount': donatedBloodAmount.split(","),
      // 'DCID': donatedBloodDCID,
      // 'Available': 1,
    }
    console.log("To send = ", toSend)
    req.donateBlood(toSend).then((res) => {
      // console.log("donateBlood Returned", res)
      if (res.status === 200)
        setDonateBloodMessage(res.message)
      else
        setDonateBloodMessage("Error in SQL - " + res.message)
    })

  }

  const getNextDonationDate = () => {
    const data = donations;
    data.sort((a, b) => {
      let d1 = Date.parse(a['DateRecieved'])
      let d2 = Date.parse(b['DateRecieved'])
      if (d1 <= d2)
        return 1
      else
        return -1
    })
    let maxDate = new Date(data[0]['DateRecieved'])
    maxDate.setMonth(maxDate.getMonth() + 3);

    let today = new Date()
    // console.log("Today is ", today === )
    if (showDonationDate && today > maxDate)
      setshowDonationDate(false)

    return Moment(maxDate).format('LL')
  }


  const registerOrganization = () => {
    setregisterOrganizationMessage("")
    let toSend = {}
    let otherAdmins = addAdmin.split(',')
    let myID = localStorage.getItem("userID")
    switch (registerButton) {

      case "Hospital":
        toSend = {
          'Name': name,
          'Address': address,
          'Pincode': pincode,
          'UserID': addAdmin.length > 0 ? [...otherAdmins, myID] : [myID], //Comma separated user IDs array
          'AdmittedPatients': patients
        }
        req.registerOrganization("Hospital", toSend).then(r => {
          setregisterOrganizationMessage(r)
        })
        console.log(toSend)
        break;

      case "BloodBank":
        toSend = {
          'Name': name,
          'Address': address,
          'Pincode': pincode,
          'UserID': addAdmin.length > 0 ? [...otherAdmins, myID] : [myID], //Comma separated user IDs array
          'TotalCapacity': totalcapacity,
          'CapacityLeft': capacityleft
        }
        req.registerOrganization("BloodBank", toSend).then(r => {
          setregisterOrganizationMessage(r)
        })
        console.log(toSend)
        break;

      case "DonationCenter":
        toSend = {
          'Name': name,
          'Address': address,
          'Pincode': pincode,
          'UserID': otherAdmins.length > 0 ? [...otherAdmins, myID] : [myID], //Comma separated user IDs array
          'BBID': associatedbbid
        }
        // console.log(toSend)
        req.registerOrganization("DonationCenter", toSend).then(r => {
          setregisterOrganizationMessage(r)
        })
        break;

      default: break;
    }
  }


  const onSort = (event, sortKey) => {
    var data = donations;
    setcurrHead(sortKey)
    if (sortAsc)
      data.sort((a, b) => {
        if (sortKey == "Date") {
          let d1 = Date.parse(a['DateRecieved'])
          let d2 = Date.parse(b['DateRecieved'])
          if (d1 >= d2)
            return 1
          else
            return -1
        }
        else
          return a[sortKey] - b[sortKey]
      })
    else
      data.sort((a, b) => {
        if (sortKey == "Date") {
          let d1 = Date.parse(a['DateRecieved'])
          let d2 = Date.parse(b['DateRecieved'])
          if (d1 <= d2)
            return 1
          else
            return -1
        }
        else
          return b[sortKey] - a[sortKey]
      })

    setDonations([...data])
    setsortAsc(!sortAsc)
    // console.log(sortAsc)
    // console.log(donations)
  }

  const getTotalBlood = () => {
    let sum = 0
    donations && donations.map(res => {
      sum = sum + res.Amount
    })
    return sum
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>


        {type === 'Admin' ?

          // ----------------------------------------- ADMIN PAGE -----------------------------------------
          <>
            {(hasOrganization["BBE"] == 1 || hasOrganization["DCE"] == 1 || hasOrganization["HE"] == 1) ?
              <>

                <Row >
                  <Col xl={4} l={4} m={4}></Col>
                  <Col xl={4} l={4} m={4}>
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-gradient-info shadow border-0">
                        <h2 className="text-white text-center mb-0">Your Organizations</h2>
                      </CardHeader>
                      <CardBody className="text-center">

                        <Row className="text-center">
                          <Col>

                            {hasOrganization["DCE"] === 1 &&
                              <Link to="/admin/DonationCenter">
                                <Button className="my-2 mx-2" color="primary" type="button" onClick={() => { }}>Donation Center</Button>
                              </Link>}

                          </Col>
                        </Row>
                        <Row>
                          <Col>

                            {hasOrganization["BBE"] === 1 &&
                              <Link to="/admin/BB">
                                <Button className="my-2 mx-2" color="primary" type="button" onClick={() => { }}>Blood Bank</Button>
                              </Link>}

                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {hasOrganization["HE"] === 1 &&
                              <Link to="/admin/Hospital">
                                <Button className="my-2 mx-2" color="primary" type="button" onClick={() => { }}>Hospital</Button>
                              </Link>}
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={4} l={4} m={4}></Col>
                </Row>
              </>
              :
              /* NO ORGANIZATION */
              <Row >
                <Col xl={4} l={4} m={4}></Col>
                <Col xl={4} l={4} m={4}>
                  <Card className="bg-gradient-default shadow">
                    <CardBody>
                      <h2 className="text-white mb-0">You have not been added to any organization yet. More updates to follow.</h2>
                    </CardBody>
                  </Card>
                </Col>
                <Col xl={4} l={4} m={4}></Col>
              </Row>

            }


            <Row className="mt-5">
              <Col xl={4}>

                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                    <h2 className="text-center mb-0">Add Donation Record</h2>
                  </CardHeader>
                  <CardBody>
                    <Form role="form">

                      {/* User ID's */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-badge" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="UserID's" type="text" value={donatedBloodUserID} onChange={(e) => setdonatedBloodUserID(e.target.value)} />
                        </InputGroup>
                      </FormGroup>

                      {/* Amount */}
                      {/* <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-chart-bar-32" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Amounts (Comma Separated)" type="text" value={donatedBloodAmount} onChange={(e) => setdonatedBloodAmount(e.target.value)} />
                        </InputGroup>
                      </FormGroup> */}

                      <div className="text-center">
                        <Button className="my-4" color="primary" type="button" onClick={donateBlood}>Submit</Button>
                      </div>
                    </Form>
                    <h2 className='text-center'>{donateBloodMessage}</h2>
                  </CardBody>
                </Card>

              </Col>
              <Col xl={8}>
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Only Admins Can Do this
                      </h6>
                    <h2 className="mb-0">Add new Organization</h2>
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>Register a</small>
                    </div>

                    <Row className="btn-wrapper text-center">
                      <Col>
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault()
                            handleRegister("Hospital")
                          }}
                          active={registerButton === "Hospital"}
                        >
                          <span className="btn-inner--text">Hospital</span>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault()
                            handleRegister("BloodBank")
                          }}
                          active={registerButton === "BloodBank"}
                        >
                          <span className="btn-inner--text">Blood Bank</span>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="btn-neutral btn-icon mt-0 mt-4 mt-sm-0"
                          color="default"
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault()
                            handleRegister("DonationCenter")
                          }}
                          active={registerButton === "DonationCenter"}
                        >
                          <span className="btn-inner--text">Donation Center</span>
                        </Button>
                      </Col>
                    </Row>
                    {/* </CardHeader> */}
                  </CardHeader>
                  <CardBody>


                    <Form role="form">

                      {/* Name */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Name" type="text" value={name} onChange={(e) => handleName(e.target.value)} />
                        </InputGroup>
                      </FormGroup>


                      {/* Address */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-shop" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Address" type="text" value={address} onChange={(e) => handleAddress(e.target.value)} />
                        </InputGroup>
                      </FormGroup>

                      {/* Pincode */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-square-pin" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Pincode" type="number" value={pincode} onChange={(e) => handlePincode(e.target.value)} />
                        </InputGroup>
                      </FormGroup>

                      {/* Add admins */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-badge" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Add Other Admins by UserID" type="text" value={addAdmin} onChange={(e) => handleaddAdmin(e.target.value)} />
                        </InputGroup>
                      </FormGroup>


                      {registerButton === "Hospital" ? (
                        /* HOSPITAL REGISTRATION */

                        /* Patients */
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Number of Admitted Patients" type="number" value={patients} onChange={(e) => handlePatients(e.target.value)} />
                          </InputGroup>
                        </FormGroup>

                      ) : null}




                      {registerButton === "DonationCenter" ? (
                        /* DONATION CENTER REGISTRATION */

                        /* Associated Blood Bank ID */
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-favourite-28" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Enter Associated Blood Bank ID" type="number" value={associatedbbid} onChange={(e) => handleassociatedbbid(e.target.value)} />
                          </InputGroup>
                        </FormGroup>
                      ) : null}


                      {registerButton === "BloodBank" ? (
                        /* BLOOD BANK REGISTRATION */
                        <>
                          {/* Total Capacity */}
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-ambulance" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Total Blood Capacity (in Litres)" type="number" value={totalcapacity} onChange={(e) => handletotalcapacity(e.target.value)} />
                            </InputGroup>
                          </FormGroup>
                          {/* Capacity Left */}
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-favourite-28" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Capacity Left (in Litres)" type="number" value={capacityleft} onChange={(e) => handlecapacityleft(e.target.value)} />
                            </InputGroup>
                          </FormGroup>
                        </>
                      ) : null}

                      {/* REGISTER BUTTON */}
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="button" onClick={registerOrganization}>
                          Register
                  </Button>
                      </div>
                    </Form>
                    <h2 className="text-center">{registerOrganizationMessage}</h2>

                  </CardBody>
                </Card>
              </Col>

            </Row>
          </> :

          // ----------------------------------------- DONOR PAGE -----------------------------------------



          <Row >
            <Col xl={2} l={2} m={2}></Col>
            <Col xl={8} l={8} m={8}>

              {donations && donations.length > 0 ?
                <Card className="shadow">
                  <CardHeader className="border-0 text-center">
                    <h3 className="mb-0">Past Blood Donations</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>

                        <th onClick={e => onSort(e, 'Date')} scope="col">
                          {currHead === 'Date' && sortAsc ? <i className='ni ni-bold-down mr-2'></i> : null}
                          {currHead === 'Date' && !sortAsc ? <i className='ni ni-bold-up mr-2'></i> : null}
                          Date</th>
                        <th scope="col">Donation Center ID</th>
                        <th scope="col">Donation Center Name</th>
                        <th onClick={e => onSort(e, 'Amount')} scope="col">
                          {currHead === 'Amount' && sortAsc ? <i className='ni ni-bold-down mr-2'></i> : null}
                          {currHead === 'Amount' && !sortAsc ? <i className='ni ni-bold-up mr-2'></i> : null}
                          Amount</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {donations && donations.map((res, index) => {
                        return <tr key={index}>
                          <td> {res.DateRecieved} </td>
                          <td> {res.DCID} </td>
                          <td> {res.Name} </td>
                          <td> {res.Amount} </td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                  <CardFooter className="py-4 text-center">
                    <h2>Total Amount of Blood Donated = {getTotalBlood()} units</h2>
                    {showDonationDate ?
                      <>You can donate blood after <b>{getNextDonationDate()}</b></>
                      :
                      <Link to="/admin/WCID">
                        <Button className="my-4" color="primary" type="button">Donate Blood</Button>
                      </Link>
                    }
                  </CardFooter>
                </Card>
                :
                <Card className="bg-secondary shadow">
                  <CardHeader className="border-0 bg-secondary text-center">
                    <h3 className="mb-0">No Donations Found!</h3>
                  </CardHeader>
                  <CardBody className=' text-center'>
                    <h2>You haven't donated blood yet, start donating now!</h2>
                    <div className="text-center">
                      <Link to="/admin/WCID">
                        <Button className="my-4" color="primary" type="button">
                          Donate Blood
                  </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>

              }


            </Col>
            <Col xl={2} l={2} m={2}></Col>
          </Row>



        }

      </Container>

    </>
  );
}

export default Index;
