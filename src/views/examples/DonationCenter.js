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
// reactstrap components
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from "reactstrap";
import AddRemoveAdmins from "../../components/AddRemoveAdmins";
import * as req from "../../requests";


const DonationCenter = () => {

  const [hasOrganization, sethasOrganization] = useState(true)

  const [DidMount, setDidMount] = useState(false)



  const [donatedBlood, setdonatedBlood] = useState([])
  const [BBDetails, setBBDetails] = useState([])

  const [donateBloodMessage, setDonateBloodMessage] = useState('')
  const [donatedBloodUserID, setdonatedBloodUserID] = useState('')
  const [DCID, setDCID] = useState('')
  const [DCName, setDCName] = useState('')
  const [DCAddress, setDCAddress] = useState('')
  const [Pincode, setPincode] = useState('')

  const [saved, setsaved] = useState(false)
  const [bloodsent, setbloodsent] = useState(false)

  const [Appointments, setAppointments] = useState([])

  useEffect(() => {

    if (!DidMount) {
      setDidMount(true)
      getDCDetails()
      getDonatedBlood()
      getAppointment()
      req.getAdminOrganization(localStorage.getItem('userID')).then((result) => {
        sethasOrganization(result)
      })
      req.getAssociatedBloodBank(localStorage.getItem('userID')).then((result) => {
        setBBDetails(result)
      })
    }
  }, [DidMount])

  const getAppointment = () => {
    let toSend = {
      "UserID": localStorage.getItem("userID")
    }
    req.getAppointment(toSend).then((result) => {
      // console.log(result)
      setAppointments(result)
    })
  }

  const getDonatedBlood = () => {
    req.getDonatedBlood(localStorage.getItem('userID')).then((result) => {
      setdonatedBlood(result)
      setbloodsent(true)
      result.forEach((record) => {
        if (parseInt(record.Available) === 0)
          setbloodsent(false)
      })
    })
  }

  const getDCDetails = () => {
    req.getDCDetails(localStorage.getItem('userID')).then((result) => {
      if (result && result.length > 0) {
        let DC = result[0]
        setDCName(DC.Name)
        setDCAddress(DC.Address)
        setDCID(DC.DCID)
        setPincode(DC.Pincode)
      }
    })
  }

  const updateDCDetails = () => {
    let toSend = {
      "DCID": DCID,
      "Name": DCName,
      "Address": DCAddress,
      "Pincode": Pincode
    }
    req.updateDC(toSend).then(e => {
      if (parseInt(e.status) === 200) {
        getDCDetails()
        setsaved(true)
        setTimeout(() => { setsaved(false) }, 1000)
      }
    })
  }

  const donateBlood = () => {
    let today = new Date()
    let month = (today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
    let day = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();
    let dateToday = today.getFullYear() + '-' + month + '-' + (day)

    let toSend = {
      'UserID': donatedBloodUserID.split(","),
      'DateRecieved': dateToday,
      'AdminID': localStorage.getItem("userID")
    }
    // console.log("To send = ", toSend)
    req.donateBlood(toSend).then((res) => {
      if (res.status === 200) {
        setDonateBloodMessage(res.message)
        getDonatedBlood()
      }
      else
        setDonateBloodMessage("Error in SQL - " + res.message)
    })

  }

  const sendBloodToBloodBank = () => {
    let toSend = {
      "DCID": DCID
    }
    req.sendBloodToBloodBank(toSend).then(e => {
      // console.log("SEND BLOOD TO BLOOD BANK - ", e)
      if (parseInt(e.status) === 200) {
        getDonatedBlood()
        setbloodsent(true)
      }
    })
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* ----------------------------------------- DONOR PAGE ----------------------------------------- */}

        <AddRemoveAdmins hasOrganization={hasOrganization} BB={false} HS={false} DC={true} />

        {hasOrganization && hasOrganization.DCE === 1 ?
          <Row className="mt-6">
            <Col xl={6} l={6} m={6}>
              {BBDetails.length > 0 ?
                <Card className=" bg-secondary shadow border-0 mt-4">
                  <CardHeader className="bg-transparent py-4">
                    <h2 className="text-center my-0">Associated Blood Bank</h2>
                  </CardHeader>
                  <CardBody>
                    <FormGroup><label className="form-control-label">BBID <h2>{BBDetails[0].BBID}</h2></label></FormGroup>
                    <FormGroup><label className="form-control-label">Name <h2>{BBDetails[0].Name}</h2></label></FormGroup>
                    <FormGroup><label className="form-control-label">Address <h2>{BBDetails[0].Address}</h2></label></FormGroup>
                    <FormGroup><label className="form-control-label">Pincode <h2>{BBDetails[0].Pincode}</h2></label></FormGroup>
                  </CardBody>
                </Card> :
                <Card className=" bg-secondary shadow border-0 mt-4">
                  <CardHeader className="bg-transparent py-4">
                    <h2 className="text-center my-0">Associated Blood Bank</h2>
                  </CardHeader>
                  <CardBody className="text-center">
                    <h3> No associated Blood Bank found with this Donation Center</h3>
                  </CardBody>
                </Card>
              }


              <Card className="bg-secondary shadow border-0 mt-5">
                <CardHeader className="bg-transparent pb-5">
                  <h2 className="text-center mb-0">Donation Center Settings</h2>
                </CardHeader>
                <CardBody>
                  <Form role="form">

                    {/* DCID */}
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-userid"
                      > DCID </label>
                      <Input
                        readOnly
                        value={DCID}
                        className="form-control-alternative"
                        placeholder="DCID"
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
                        value={DCName}
                        className="form-control-alternative"
                        placeholder="Name"
                        onChange={(e) => setDCName(e.target.value)}
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
                        value={DCAddress}
                        className="form-control-alternative"
                        placeholder="Address"
                        onChange={(e) => setDCAddress(e.target.value)}
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
                        value={Pincode}
                        className="form-control-alternative"
                        placeholder="Pincode"
                        onChange={(e) => setPincode(e.target.value)}
                        type="text"
                      />
                    </FormGroup>

                    <div className="text-center">
                      <Button className="my-4" disabled={saved} color="primary" type="button" onClick={updateDCDetails}>{saved ? "Saved!" : "Save"}</Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>

            </Col>
            <Col xl={6} l={6} m={6}>
              {donatedBlood && donatedBlood.length > 0 ?
                <>
                  <div className={donatedBlood.length > 6 ? 'scrollspy-example-2 mt-4' : 'mt-4'}>
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
                              <td> {Moment(res.DateRecieved).format('LL')} </td>
                              <td> {parseInt(res.Available) === 0 ? "No" : "Yes"} </td>
                            </tr>
                          })}
                        </tbody>
                      </Table>
                    </Card >
                  </div>
                  <Card className="shadow mt-4" >
                    <CardHeader className="border-0 text-center">
                      <h3 className="mb-0">Send Blood To Blood Bank</h3>
                    </CardHeader>
                    <CardBody className="text-center">
                      <p>Send the collected blood stored with your donation center to the blood bank</p>
                      <Button className="mt-3" disabled={bloodsent} color="primary" type="button" onClick={sendBloodToBloodBank}>{bloodsent ? "SENT!" : "SEND"}</Button>
                    </CardBody>
                  </Card >

                </>
                :
                <Card className="shadow mb-5 mt-4" >
                  <CardBody>
                    <h3 className="mb-0 text-center">There have not been any blood donations to your donation center yet.</h3>
                  </CardBody>
                </Card >}

              {/* ADD DONATION RECORD */}
              <Card className="bg-secondary shadow border-0 my-4">
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


                    <div className="text-center">
                      <Button className="my-4" color="primary" type="button" onClick={donateBlood}>Submit</Button>
                    </div>
                  </Form>
                  <h2 className='text-center'>{donateBloodMessage}</h2>
                </CardBody>
              </Card>



              {Appointments && Appointments.length > 0 ?
                <Card className="shadow my-4" >
                  <CardHeader className="border-0 text-center">
                    <h3 className="mb-0">Appointments</h3>

                  </CardHeader>
                  <Table className="align-items-center table-flush mb-4" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">UserID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Blood Group</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {Appointments.map((res, index) => {
                        return <tr key={index}>
                          <td> {Moment(res.Date).format('LL')} </td>
                          <td> {res.UserID} </td>
                          <td> {res.Name} </td>
                          <td> {res.Phone} </td>
                          <td> {res.BloodGroup} </td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                  <CardFooter>

                    <h3 className="text-center">Your donation center has {Appointments.length} appointments today!</h3>
                  </CardFooter>
                </Card > :
                <Card className="shadow my-4" >
                  <CardHeader className="border-0 text-center">
                    <h3 className="mb-0">Appointments</h3>

                  </CardHeader>
                  <CardBody className="text-center">There aren't any appointments with your Donation Center yet.</CardBody>
                  <CardFooter>


                  </CardFooter>
                </Card >
              }
            </Col>

          </Row>
          : null
        }

      </Container>

    </>
  );
}

export default DonationCenter;
