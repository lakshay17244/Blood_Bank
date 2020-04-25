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
import {
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

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import * as req from "../requests"


const IndexCopy = () => {

  // Add New Organization
  const [hasOrganization, sethasOrganization] = useState(true)
  // const [organization, setOrganization] = useState('')
  const [name, handleName] = useState('')
  const [patients, handlePatients] = useState('')
  const [address, handleAddress] = useState('')
  const [pincode, handlePincode] = useState('')
  const [registerButton, handleRegister] = useState('Hospital')
  const [addAdmin, handleaddAdmin] = useState('')
  const [totalcapacity, handletotalcapacity] = useState('')
  const [capacityleft, handlecapacityleft] = useState('')
  const [associatedbbid, handleassociatedbbid] = useState('')

  const [type, setType] = useState('')

  useEffect(() => {

    // Set Type to admin or donor with delay added for user request
    setTimeout(() => {
      console.log("==>", localStorage.getItem('type'))
      setType(localStorage.getItem('type'))
    }, 500)

    setTimeout(() => {
      console.log("==>", localStorage.getItem('type'))
      setType(localStorage.getItem('type'))
    }, 3000)

  })


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }


  const registerOrganization = () => {
    let toSend = {}
    switch (registerButton) {

      case "Hospital":
        toSend = {
          'Name': name,
          'Address': address,
          'Pincode': pincode,
          'UserID': addAdmin.split(','), //Comma separated user IDs array
          'AdmittedPatients': patients
        }
        console.log(toSend)
        break;

      case "BloodBank":
        toSend = {
          'Name': name,
          'Address': address,
          'Pincode': pincode,
          'UserID': addAdmin.split(','), //Comma separated user IDs array
          'TotalCapacity': totalcapacity,
          'CapacityLeft': capacityleft
        }
        console.log(toSend)
        break;

      case "DonationCenter":
        toSend = {
          'Name': name,
          'Address': address,
          'Pincode': pincode,
          'UserID': addAdmin.split(','), //Comma separated user IDs array
          'BBID': associatedbbid
        }
        console.log(toSend)
        break;

      default: break;
    }
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {hasOrganization ?
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
          :
          (
            <>
              <Row>
                <Col className="mb-5 mb-xl-0" xl={8}>
                  {/* <Card className="bg-gradient-default shadow"> */}
                  {/* <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader> */}


                  {/* Chart */}
                  {/* <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody> */}
                  {/* </Card> */}
                </Col>


                <Col xl={4}>
                  {/* <Card className="shadow"> */}


                  {/* <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader> */}


                  {/* Chart */}
                  {/* <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody> */}
                  {/* </Card> */}
                </Col>
              </Row>


              <Row className="mt-5">
                <Col className="mb-5 mb-xl-0" xl={8}>
                  {/* <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card> */}
                </Col>
                <Col xl={4}>
                  {/*<Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
              */}
                </Col>
              </Row>

            </>
          )
        }


        {type === 'Admin' ? (
          <Row className="mt-5">
            <Col xl={2}></Col>
            <Col xl={8}>
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                  {/* <Row className="align-items-center"> */}
                  {/* <div className="col"> */}
                  <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Only Admins Can Do this
                      </h6>
                  <h2 className="mb-0">Add new Organization</h2>
                  {/* </div> */}
                  {/* </Row> */}
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


                </CardBody>
              </Card>
            </Col>
            <Col xl={2}></Col>
          </Row>
        ) : null}

      </Container>

    </>
  );
}

export default IndexCopy;
