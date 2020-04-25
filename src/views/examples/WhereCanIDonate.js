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
import {Link} from 'react-router-dom'

const WhereCanIDonate = () => {

  // User Details
  const [type, setType] = useState('')
  const [bloodGroup, setbloodGroup] = useState('B+')

  // Donate Blood
  const [donatedBloodAmount, setdonatedBloodAmount] = useState('')
  const [donatedBloodDCID, setdonatedBloodDCID] = useState('')
  const [donateBloodMessage, setDonateBloodMessage] = useState('')
  const [donatedBloodUserID, setdonatedBloodUserID] = useState('')

  const [nearbydc, setnearbydc] = useState('')
  const [alldc, setalldc] = useState('')
  const [requestCompleted, setrequestCompleted] = useState(false);
  const [request1Completed, setrequest1Completed] = useState(false);

  useEffect(() => {
    if (!requestCompleted) {
      req.getnearbydc(localStorage.getItem('userID')).then((nearbydc) => {
        setnearbydc(nearbydc)
        setrequestCompleted(true)
      })
    }
    if (!request1Completed) {
      req.getalldc(localStorage.getItem('userID')).then((alldc) => {
        setalldc(alldc)
        setrequest1Completed(true)
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
          <Col xl={2} l={2} m={2}></Col>
          <Col xl={8} l={8} m={8}>

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
          <Col xl={2} l={2} m={2}></Col>
        </Row>

        <Row className="mt-6">
          <Col xl={2} l={2} m={2}></Col>
          <Col xl={8} l={8} m={8}>

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
          <Col xl={2} l={2} m={2}></Col>
        </Row>



      </Container>

    </>
  );
}

export default WhereCanIDonate;
