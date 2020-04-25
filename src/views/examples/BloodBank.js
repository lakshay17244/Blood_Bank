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

const BloodBank = () => {

  const [hasOrganization, sethasOrganization] = useState(true)
  const [requestCompleted1, setrequestCompleted1] = useState(false)

  useEffect(() => {
    if (!requestCompleted1) {
      req.getAdminOrganization(localStorage.getItem('userID')).then((result) => {
        // console.log(result)
        sethasOrganization(result)
        setrequestCompleted1(true)
      })
    }
  })


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- DONOR PAGE ----------------------------------------- */}

        <AddRemoveAdmins hasOrganization={hasOrganization} BB={true} HS={false} DC={false} />


        <Row className="mt-6">
          <Col xl={2} l={2} m={2}></Col>
          <Col xl={8} l={8} m={8}>

          </Col>
          <Col xl={2} l={2} m={2}></Col>
        </Row>



      </Container>

    </>
  );
}

export default BloodBank;
