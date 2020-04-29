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
import emailjs from 'emailjs-com';

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

const WhereCanIDonate = () => {

  // User Details
  const [type, setType] = useState('')
  const [bloodGroup, setbloodGroup] = useState('B+')

  // Donate Blood
  const [AppointmentDate, setAppointmentDate] = useState('')
  const [AppointmentDCID, setAppointmentDCID] = useState('')
  const [booked, setbooked] = useState(false)


  const [donorAppointments, setdonorAppointments] = useState([])

  const [nearbydc, setnearbydc] = useState('')
  const [alldc, setalldc] = useState('')
  const [requestCompleted, setrequestCompleted] = useState(false);
  const [request1Completed, setrequest1Completed] = useState(false);
  const [donations, setDonations] = useState('')
  const [nextDonationDate, setnextDonationDate] = useState(Moment(new Date()).format('LL'))

  const getNextDonationDate = (data) => {
    if (data && data.length > 0) {
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

      console.log("Today is ", Moment(maxDate).format('LL'))

      setnextDonationDate(Moment(maxDate).format('YYYY-MM-DD'))
    }
    else {
      setnextDonationDate(Moment(new Date()).format('YYYY-MM-DD'))
    }

  }


  const bookAppointment = () => {
    let toSend = {
      "DCID": AppointmentDCID,
      "UserID": localStorage.getItem("userID"),
      "Date": AppointmentDate
    }
    let DC = searchDC(AppointmentDCID)

    let paramsToSend = {
      "email": localStorage.getItem("email"),
      "name": localStorage.getItem("name"),
      "dcname": DC.Name,
      "address": DC.Address,
      "date": Moment(AppointmentDate).format('LL')
    }

    console.log(paramsToSend)
    emailjs.send('default_service', 'lifeconnect', paramsToSend, "user_JgWQwKm41WMzpHGUh9O3x")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    req.bookAppointment(toSend).then(r => {
      if (r.status === 200) {
        setbooked(true)
        getDonorAppointments()
      }
    })
  }


  const searchDC = (DCID) => {
    let res = []
    alldc.map(r => {
      if (r['DCID'] == DCID) {
        res = r;
      }
    })
    return res;
  }
  const getDonorAppointments = () => {
    req.getDonorAppointments(localStorage.getItem("userID")).then(r => {
      if (r && r.length > 0) {
        setdonorAppointments(r)
      }
    })
  }


  useEffect(() => {
    if (!requestCompleted) {
      setrequestCompleted(true)
      getDonorAppointments()

      req.getPastDonations(localStorage.getItem('userID')).then((donations) => {
        setDonations(donations)
        getNextDonationDate(donations)
      })

      req.getnearbydc(localStorage.getItem('userID')).then((nearbydc) => {
        setnearbydc(nearbydc)
      })
    }
    if (!request1Completed) {
      setrequest1Completed(true)
      req.getalldc(localStorage.getItem('userID')).then((alldc) => {
        setalldc(alldc)
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


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- DONOR PAGE ----------------------------------------- */}

        <Row >
          <Col xl={6} l={6} m={6}>

            {nearbydc && nearbydc.length > 0 ?
              <Card className="shadow">
                <CardHeader className="border-0 text-center">
                  <h3 className="mb-0">Nearby Blood Donation Centers</h3>
                </CardHeader>
                <div className='scrollspy-example-2'>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        {/* <th onClick={e => onSort(e, 'Date')} scope="col">Date</th> */}
                        <th scope="col">Donation Center ID</th>
                        <th scope="col">Donation Center Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Pincode</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {nearbydc && nearbydc.map((res, index) => {
                        return <tr key={index}>
                          <td> {res.DCID} </td>
                          <td> {res.Name} </td>
                          <td> {res.Address} </td>
                          <td> {res.Pincode} </td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                </div>
                <CardFooter className="py-4 text-center">
                </CardFooter>
              </Card>
              :
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0 bg-secondary text-center">
                  <h3 className="mb-0">No Nearby Blood Donation Centers Found!</h3>
                </CardHeader>
                <CardBody className=' text-center'>
                  <h2>We tried searching near your address, but could not find any nearby blood donation centers</h2>
                  <div className="text-center">
                    <Link to="/admin/EBR">
                      <Button className="my-4" color="primary" type="button" onClick={() => { }}>
                        Check Emergency Blood Requirements
                  </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>

            }
          </Col>
          <Col xl={6} l={6} m={6}>
            {alldc && alldc.length > 0 ?
              <Card className="shadow">
                <CardHeader className="border-0 text-center">
                  <h3 className="mb-0">All Blood Donation Centers</h3>
                </CardHeader>
                <div className='scrollspy-example-2'>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        {/* <th onClick={e => onSort(e, 'Date')} scope="col">Date</th> */}
                        <th scope="col">Donation Center ID</th>
                        <th scope="col">Donation Center Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Pincode</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {alldc && alldc.map((res, index) => {
                        return <tr key={index}>
                          <td> {res.DCID} </td>
                          <td> {res.Name} </td>
                          <td> {res.Address} </td>
                          <td> {res.Pincode} </td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                </div>
                <CardFooter className="py-4 text-center">
                </CardFooter>
              </Card>
              : null}
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={2} l={2} m={2}></Col>
          <Col xl={8} l={8} m={8}>
            <Card className="shadow my-4">
              <CardHeader className="border-0 text-center">
                <h2 className="mb-0">Appointments</h2>
              </CardHeader>
              <CardBody>
                {donorAppointments && donorAppointments.length > 0 ?
                  <h3>You have an appointment at <b>{donorAppointments[0].Name}</b>, <b>{donorAppointments[0].Address}</b> on <b>{Moment(donorAppointments[0].Date).format('YYYY-MM-DD')}</b></h3>
                  :
                  <>
                    <h4 className="text-center">Select any donation center from above</h4>
                    <Form role="form">

                      {/* DCID */}
                      <FormGroup>
                        <Input
                          value={AppointmentDCID}
                          onChange={e => setAppointmentDCID(e.target.value)}
                          className="form-control-alternative"
                          placeholder="DCID"
                          type="text"
                        />
                      </FormGroup>

                      {/* Date */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58 mr-2" /> Date Of Appointment
                      </InputGroupText>
                          </InputGroupAddon>
                          <Input type="date" pattern="[0-9]*" value={AppointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} min={nextDonationDate} />
                        </InputGroup>
                      </FormGroup>

                      <div className="text-center">
                        <Button className="my-4" disabled={booked} color="primary" type="button" onClick={bookAppointment}>{booked ? "Booked!" : "Book"}</Button>
                      </div>
                    </Form>

                  </>
                }
              </CardBody>
              <CardFooter className="py-4 text-center">
              </CardFooter>
            </Card>

          </Col>
          <Col xl={2} l={2} m={2}></Col>
        </Row>



      </Container>

    </>
  );
}

export default WhereCanIDonate;
