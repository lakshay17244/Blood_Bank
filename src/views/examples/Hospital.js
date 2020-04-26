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

  // Hospital Details

  const [HID, setHID] = useState('')
  const [HName, setHName] = useState('')
  const [HAddress, setHAddress] = useState('')
  const [HPincode, setHPincode] = useState('')
  const [saved, setsaved] = useState(false)

  const [HDetails, setHDetails] = useState([])

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
  })


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- DONOR PAGE ----------------------------------------- */}

        <AddRemoveAdmins hasOrganization={hasOrganization} BB={false} HS={true} DC={false} />


        {hasOrganization && hasOrganization.H === 1 ?

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

            </Col>
          </Row>
          : null}
      </Container>

    </>
  );
}

export default Hospital;
