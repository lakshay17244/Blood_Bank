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
import Header from "components/Headers/Header.js";
import emailjs from 'emailjs-com';
// reactstrap components
import Moment from 'moment';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from "reactstrap";
import * as req from "../../requests";
import { connect } from 'react-redux';
import _ from "lodash"


const WhereCanIDonate = (props) => {

  // Donate Blood
  const [AppointmentDate, setAppointmentDate] = useState('')
  const [AppointmentDCID, setAppointmentDCID] = useState('')
  const [booked, setbooked] = useState(false)


  const [donorAppointments, setdonorAppointments] = useState([])

  const [nearbydc, setnearbydc] = useState('')
  const [alldc, setalldc] = useState('')
  const [DidMount, setDidMount] = useState(false);

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

      setnextDonationDate(Moment(maxDate).format('YYYY-MM-DD'))
    }
    else {
      setnextDonationDate(Moment(new Date()).format('YYYY-MM-DD'))
    }

  }


  const bookAppointment = () => {
    let toSend = {
      "DCID": AppointmentDCID,
      "UserID": props.UserID,
      "Date": AppointmentDate
    }
    let DC = searchDC(AppointmentDCID)

    let paramsToSend = {
      "email": props.Email,
      "name": props.Name,
      "dcname": DC.Name,
      "address": DC.Address,
      "date": Moment(AppointmentDate).format('LL')
    }
    emailjs.send('default_service', 'lifeconnect', paramsToSend, process.env.REACT_APP_EMAILJSUSERID)
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
    if (alldc && alldc.length > 0) {
      alldc.forEach(r => {
        if (parseInt(r['DCID']) === parseInt(DCID)) {
          res = r;
        }
      })
    }
    return res;
  }
  const getDonorAppointments = useCallback(
    () => {
      req.getDonorAppointments(props.UserID).then(r => {
        if (r && r.length > 0) {
          setdonorAppointments(r)
        }
      })
    },
    [props.UserID],
  )


  useEffect(() => {
    if (!DidMount) {
      setDidMount(true)
      getDonorAppointments()

      req.getPastDonations(props.UserID).then((donations) => {

        getNextDonationDate(donations)
      })

      req.getnearbydc(props.UserID).then((nearbydc) => {
        setnearbydc(nearbydc)
      })

      req.getalldc(props.UserID).then((alldc) => {
        setalldc(alldc)
      })
    }
  }, [DidMount, props.UserID, getDonorAppointments])


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- DONOR PAGE ----------------------------------------- */}

        <Row >

          {!_.isEmpty(alldc) ?
            <>
              {/* SHOW NEARBY DONATION CENTERS */}
              <Col xl={6} l={6} m={6}>
                {!_.isEmpty(nearbydc) ?
                  <Card className="shadow">
                    <CardHeader className="border-0 text-center">
                      <h3 className="mb-0">Nearby Blood Donation Centers</h3>
                    </CardHeader>
                    <div className={nearbydc.length > 6 ? 'scrollspy-example-2' : ''}>
                      <Table bordered hover className="align-items-center table-flush" responsive>
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
                  <Card className="shadow">
                    <CardHeader className="border-0 text-center">
                      <h3 className="mb-0">No Nearby Blood Donation Centers Found!</h3>
                    </CardHeader>
                    <CardBody className=' text-center'>
                      <h2>We tried searching near your address, but could not find any nearby blood donation centers</h2>
                    </CardBody>
                  </Card>}
              </Col>
              {/* SHOW ALL DONATION CENTERS */}
              <Col xl={6} l={6} m={6}>
                <Card className="shadow mt-4 mt-sm-0">
                  <CardHeader className="border-0 text-center">
                    <h3 className="mb-0">All Blood Donation Centers</h3>
                  </CardHeader>
                  <div className={alldc.length > 6 ? 'scrollspy-example-2' : ''}>
                    <Table bordered hover className="align-items-center table-flush" responsive>
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
              </Col>
            </>
            :
            <>
              <Col xl={8} l={8} m={8} className="mx-auto">
                <Card className="bg-secondary shadow">
                  <CardHeader className="border-0 bg-secondary text-center">
                    <h3 className="mb-0">No Blood Donation Centers Found!</h3>
                  </CardHeader>
                  <CardBody className=' text-center'>
                    <h2>We tried searching, but could not find any blood donation centers</h2>
                    <div className="text-center">
                      <Link to="/admin/EBR">
                        <Button className="my-4" color="primary" type="button" onClick={() => { }}>
                          Check Emergency Blood Requirements
                </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </>}
        </Row>


        {/* APPOINTMENT BOOKING */}
        {!_.isEmpty(alldc) ?
          <Row className="mt-6">
            <Col xl={8} l={8} m={8} className="mx-auto">
              <Card className="shadow my-4">
                <CardHeader className="border-0 text-center">
                  <h2 className="mb-0">Appointments</h2>
                </CardHeader>
                <CardBody>
                  {donorAppointments && donorAppointments.length > 0 ?
                    <h3 className="text-center">You have an appointment at <b>{donorAppointments[0].Name}</b>, <b>{donorAppointments[0].Address}</b> on <b>{Moment(donorAppointments[0].Date).format('YYYY-MM-DD')}</b></h3>
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
          </Row>
          :
          null}
      </Container>

    </>
  );
}


const mapStateToProps = (state) => {
  return {
    UserID: _.get(state, "UserDetails.UserID"),
    Name: _.get(state, "UserDetails.Username"),
    Email: _.get(state, "UserDetails.Email")
  }
}

export default connect(mapStateToProps)(WhereCanIDonate);
