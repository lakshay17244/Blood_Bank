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

const PledgeOrgans = () => {

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
            <Card className="shadow">
              <CardHeader className="border-0 text-center">
                <h2 className="mb-0">Pledge For Organ Donation After Death</h2>
              </CardHeader>
              <CardBody>
                <h3>Organ Donation is the process of donating organs or biological tissue to a living reciepient, who
                    is in need of a transplant. Pledge for organ donation with Organ India.</h3>
              </CardBody>
              <CardFooter className="py-4 text-center">
                <Button href="https://www.organindia.org/" className="my-4" color="primary" type="button" target="_blank">
                  Pledge
                  </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xl={2} l={2} m={2}></Col>
        </Row>

      </Container>

    </>
  );
}

export default PledgeOrgans;
