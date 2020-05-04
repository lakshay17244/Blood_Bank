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
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux"
import _ from "lodash"
import {
  CardFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Form,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";

import Header from "components/Headers/Header.js";
import * as req from "../../requests"
import AddRemoveAdmins from "../../components/AddRemoveAdmins"

const BloodBank = (props) => {

  // const [DidMount, setDidMount] = useState(false)

  const [associatedDCs, setassociatedDCs] = useState(true)

  const [BBID, setBBID] = useState('')
  const [BBName, setBBName] = useState('')
  const [BBAddress, setBBAddress] = useState('')
  const [BBPincode, setBBPincode] = useState('')
  const [BBCapacity, setBBCapacity] = useState('')
  const [saved, setsaved] = useState(false)

  const [BBDetails, setBBDetails] = useState([])

  const [BBStoredBlood, setBBStoredBlood] = useState([])

  const updateBBDetails = () => {
    let toSend = {
      "BBID": BBID,
      "Name": BBName,
      "Address": BBAddress,
      "Pincode": BBPincode,
      "TotalCapacity": BBCapacity
    }

    req.updateBB(toSend).then(e => {
      // console.log("UPDATE BB DETAILS - ", e)
      if (e.status === 200) {
        getBBDetails()
        setsaved(true)
        setTimeout(() => { setsaved(false) }, 1000)
      }
    })
  }

  const getBBDetails = useCallback(
    () => {
      req.getBBDetails(props.UserID).then((result) => {
        setBBDetails(result)
        if (result && result.length > 0) {
          let BB = result[0]
          setBBName(BB.Name)
          setBBAddress(BB.Address)
          setBBID(BB.BBID)
          setBBPincode(BB.Pincode)
          setBBCapacity(BB.TotalCapacity)
        }
      })
    },
    [props.UserID],
  )

  const getBBStoredBlood = useCallback(
    () => {
      req.getBBStoredBlood(props.UserID).then((result) => {
        setBBStoredBlood(result)
      })
    },
    [props.UserID],
  )

  const sumTotalStoredBlood = useCallback(
    () => {
      let total = 0
      BBStoredBlood && BBStoredBlood.forEach(res => {
        total = total + res.Amount
      })
      return total
    },
    [BBStoredBlood],
  )


  const getAssociatedDonationCenter = useCallback(
    () => {
      req.getAssociatedDonationCenter(props.UserID).then((result) => {
        setassociatedDCs(result)
      })
    }, [props.UserID])


  useEffect(() => {
    if (props.hasBloodBank) {
      getAssociatedDonationCenter()
      getBBStoredBlood()
      getBBDetails()
    }
  }, [props.hasBloodBank, getAssociatedDonationCenter, getBBStoredBlood, getBBDetails])


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- BLOOD BANK PAGE ----------------------------------------- */}

        <AddRemoveAdmins BB={true} HS={false} DC={false} />
        {props.hasBloodBank ?

          < Row className="mt-6">
            <Col xl={6} l={6} m={6}>

              {BBDetails && BBDetails.length > 0 ?
                <Card className="bg-secondary shadow border-0 mt-4">
                  <CardHeader className="bg-transparent pb-5">
                    <h2 className="text-center mb-0">Blood Bank Details</h2>
                  </CardHeader>
                  <CardBody>
                    <Form role="form">

                      {/* BBID */}
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-userid"
                        > BBID </label>
                        <Input
                          readOnly
                          value={BBID}
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
                          value={BBName}
                          className="form-control-alternative"
                          placeholder="Name"
                          onChange={(e) => setBBName(e.target.value)}
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
                          value={BBAddress}
                          className="form-control-alternative"
                          placeholder="Address"
                          onChange={(e) => setBBAddress(e.target.value)}
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
                          value={BBPincode}
                          className="form-control-alternative"
                          placeholder="Pincode"
                          onChange={(e) => setBBPincode(e.target.value)}
                          type="text"
                        />
                      </FormGroup>

                      {/* Total Capacity */}

                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-userid"
                        > Total Capacity </label>
                        <Input
                          value={BBCapacity}
                          className="form-control-alternative"
                          placeholder="Total Capacity"
                          onChange={(e) => setBBCapacity(e.target.value)}
                          type="text"
                        />
                      </FormGroup>

                      <div className="text-center">
                        <Button className="my-4" disabled={saved} color="primary" type="button" onClick={updateBBDetails}>{saved ? "Saved!" : "Save"}</Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                :
                <Card className="bg-secondary shadow border-0 mt-4">
                  <CardHeader className="bg-transparent pb-5">
                    <h2 className="text-center mb-0">Blood Bank Details</h2>
                  </CardHeader>
                  <CardBody>
                    <h2 className="text-center">Sorry, can't Find your blood bank details</h2>
                  </CardBody>
                </Card>
              }


            </Col>
            <Col xl={6} l={6} m={6}>
              {associatedDCs && associatedDCs.length > 0 ?

                <Card className="shadow" >
                  <CardHeader className="border-0 text-center">
                    <h3 className="mb-0">Associated Donation Centers</h3>

                  </CardHeader>
                  <div className={associatedDCs.length > 6 ? 'scrollspy-example-2' : ''}>
                    <Table bordered hover className="align-items-center table-flush mb-4" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">DCID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Address</th>
                          <th scope="col">Pincode</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {associatedDCs.map((res, index) => {
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
                </Card >
                :
                <Card className="shadow mt-4" >
                  <CardBody>
                    <h3 className="mb-0 text-center">There are no donation centers associated with your blood bank yet.</h3>
                  </CardBody>
                </Card >
              }

              {
                BBStoredBlood && BBStoredBlood.length > 0 ?

                  <Card className="shadow mt-4" >
                    <CardHeader className="border-0 text-center">
                      <h3 className="mb-0">Stored Blood</h3>

                    </CardHeader>
                    <div className={BBStoredBlood.length > 6 ? 'scrollspy-example-2' : ''}>
                      <Table bordered hover className="align-items-center table-flush mb-4" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Amount</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {BBStoredBlood.map((res, index) => {
                            return <tr key={index}>
                              <td> {res.BloodGroup} </td>
                              <td> {res.Amount} </td>
                            </tr>
                          })}
                        </tbody>
                      </Table>
                    </div>
                    <CardFooter>
                      {sumTotalStoredBlood() > 0 && <h3 className="text-center">Total Amount of Stored Blood = {sumTotalStoredBlood()}</h3>}
                      <h3 className="text-center"> Capacity Left = {BBCapacity - sumTotalStoredBlood()} units</h3>
                    </CardFooter>
                  </Card >

                  :
                  <Card className="shadow my-4" >
                    <CardBody>
                      <h3 className="mb-0 text-center">There is no stored blood in your blood bank</h3>
                    </CardBody>
                  </Card >

              }
            </Col>

          </Row>

          : null}

      </Container>

    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: _.get(state, 'isLoggedIn', false),
    UserID: _.get(state, "UserDetails.UserID"),
    hasBloodBank: _.get(state, "UserDetails.hasBloodBank", false)
  }
}

export default connect(mapStateToProps)(BloodBank);