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

const DonationCenter = () => {

  const [hasOrganization, sethasOrganization] = useState(true)
  const [requestCompleted1, setrequestCompleted1] = useState(false)
  const [requestCompleted, setrequestCompleted] = useState(false)
  const [donatedBlood, setdonatedBlood] = useState([])

  useEffect(() => {
    if (!requestCompleted1) {
      req.getAdminOrganization(localStorage.getItem('userID')).then((result) => {
        // console.log(result)
        sethasOrganization(result)
        setrequestCompleted1(true)
      })
    }
    if (!requestCompleted) {
      req.getDonatedBlood(localStorage.getItem('userID')).then((result) => {
        console.log("====",result)
        setdonatedBlood(result)
        setrequestCompleted(true)
      })
    }
  })


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- DONOR PAGE ----------------------------------------- */}

        <AddRemoveAdmins hasOrganization={hasOrganization} BB={false} HS={false} DC={true} />


        <Row className="mt-6">
          <Col xl={2} l={2} m={2}></Col>
          <Col xl={8} l={8} m={8}>
            {donatedBlood && donatedBlood.length > 0 ?
              <div className='scrollspy-example-2'>
                <Card className="shadow" >
                  <CardHeader className="border-0 text-center">
                    <h3 className="mb-0">Blood Donation Records</h3>

                  </CardHeader>
                  <Table className="align-items-center table-flush mb-4" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">UserID</th>
                        <th scope="col">Blood Group</th>
                        <th scope="col">Date Recieved</th>
                        <th scope="col">Sent To Blood Bank</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {donatedBlood.map((res, index) => {
                        return <tr key={index}>
                          <td> {res.UserID} </td>
                          <td> {res.BloodGroup} </td>
                          <td> {res.DateRecieved} </td>
                          <td> {res.Available} </td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                </Card >
              </div>
              :
              <Card className="shadow mb-5" >
                <CardBody>
                  <h3 className="mb-0 text-center">There have not been any blood donations to your donation center yet.</h3>
                </CardBody>
              </Card >}
          </Col>
          <Col xl={2} l={2} m={2}></Col>
        </Row>



      </Container>

    </>
  );
}

export default DonationCenter;
