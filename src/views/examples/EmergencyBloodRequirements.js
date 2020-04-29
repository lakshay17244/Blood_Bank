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


const EmergencyBloodRequirements = () => {

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
  const [request2Completed, setrequest2Completed] = useState(false);

  const [ERNearby, setERNearby] = useState([])
  const [ERAll, setERAll] = useState([])


  useEffect(() => {
    // if (!requestCompleted) {
    //   setrequestCompleted(true)
    //   req.getnearbyhospitals(localStorage.getItem('userID')).then((nearbydc) => {
    //     setnearbydc(nearbydc)
    //   })
    // }
    // if (!request1Completed) {
    //   setrequest1Completed(true)
    //   req.getallhospitals(localStorage.getItem('userID')).then((alldc) => {
    //     setalldc(alldc)
    //   })
    // }

    if (!request2Completed) {
      setrequest2Completed(true)
      req.getDonorERNearby(localStorage.getItem('userID')).then((ER) => {
        setERNearby(ER)
      })
      req.getDonorERAll(localStorage.getItem('userID')).then(ER => {
        setERAll(ER)
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
          <Col xl={1} l={1} m={1}></Col>
          <Col xl={10} l={10} m={10}>
            {ERNearby && ERNearby.length > 0 ?
              <Card className="shadow">
                <CardHeader className="border-0 text-center">
                  <h3 className="mb-0">Emergency Blood Requirements Near You</h3>
                </CardHeader>
                <div className={ERNearby.length > 6 ? 'scrollspy-example-2' : ''}>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        {/* <th onClick={e => onSort(e, 'Date')} scope="col">Date</th> */}
                        <th scope="col">Blood Needed</th>
                        <th scope="col">Hospital ID</th>
                        <th scope="col">Hospital Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Hospital Address</th>
                        <th scope="col">Pincode</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {ERNearby && ERNearby.map((res, index) => {
                        return <tr key={index}>
                          <td> {res.BloodNeeded} </td>
                          <td> {res.HID} </td>
                          <td> {res.Name} </td>
                          <td> {Moment(res.DateRecieved).format('LL')} </td>
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
              <Card className="shadow my-4">
                <CardHeader className="border-0 text-center">
                  <h3 className="mb-0">There are no emergency requirements near you for your blood group.</h3>
                </CardHeader>
              </Card>

            }


            {ERAll && ERAll.length > 0 ?
              <Card className="shadow my-4">
                <CardHeader className="border-0 text-center">
                  <h3 className="mb-0">All Emergency Blood Requirements</h3>
                </CardHeader>
                <div className={ERAll.length > 6 ? 'scrollspy-example-2' : ''}>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        {/* <th onClick={e => onSort(e, 'Date')} scope="col">Date</th> */}
                        <th scope="col">Blood Needed</th>
                        <th scope="col">Hospital ID</th>
                        <th scope="col">Hospital Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Hospital Address</th>
                        <th scope="col">Pincode</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {ERAll && ERAll.map((res, index) => {
                        return <tr key={index}>
                          <td> {res.BloodNeeded} </td>
                          <td> {res.HID} </td>
                          <td> {res.Name} </td>
                          <td> {Moment(res.DateRecieved).format('LL')} </td>
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
              <Card className="shadow my-4">
                <CardHeader className="border-0 text-center">
                  <h3 className="mb-0">There are no emergency requirements for your blood group.</h3>
                </CardHeader>
              </Card>

            }
          </Col>
          <Col xl={1} l={1} m={1}></Col>
        </Row>

        <Row className="mt-6">
          <Col xl={6} l={6} m={6}>

            {
              // alldc && alldc.length > 0 ?
              // <Card className="shadow my-4">
              //   <CardHeader className="border-0 text-center">
              //     <h3 className="mb-0">All Hospitals</h3>
              //   </CardHeader>
              //   <div className={ alldc.length > 6 ? 'scrollspy-example-2' : ''}>
              //     <Table className="align-items-center table-flush" responsive>
              //       <thead className="thead-light">
              //         <tr>
              //           {/* <th onClick={e => onSort(e, 'Date')} scope="col">Date</th> */}
              //           <th scope="col">Hospital ID</th>
              //           <th scope="col">Hospital Name</th>
              //           <th scope="col">Address</th>
              //           <th scope="col">Pincode</th>
              //           <th scope="col" />
              //         </tr>
              //       </thead>
              //       <tbody>
              //         {alldc && alldc.map((res, index) => {
              //           return <tr key={index}>
              //             <td> {res.HID} </td>
              //             <td> {res.Name} </td>
              //             <td> {res.Address} </td>
              //             <td> {res.Pincode} </td>
              //           </tr>
              //         })}
              //       </tbody>
              //     </Table>
              //   </div>
              //   <CardFooter className="py-4 text-center">
              //   </CardFooter>
              // </Card>
              // : null
            }
          </Col>


          <Col xl={6} l={6} m={6}>

            {
              // nearbydc && nearbydc.length > 0 ?
              // <Card className="shadow my-4">
              //   <CardHeader className="border-0 text-center">
              //     <h3 className="mb-0">Nearby Hospitals</h3>
              //   </CardHeader>
              //   <div className={ nearbydc.length > 6 ? 'scrollspy-example-2' : ''}>
              //     <Table className="align-items-center table-flush" responsive>
              //       <thead className="thead-light">
              //         <tr>
              //           {/* <th onClick={e => onSort(e, 'Date')} scope="col">Date</th> */}
              //           <th scope="col">Hospital ID</th>
              //           <th scope="col">Hospital Name</th>
              //           <th scope="col">Address</th>
              //           <th scope="col">Pincode</th>
              //           <th scope="col" />
              //         </tr>
              //       </thead>
              //       <tbody>
              //         {nearbydc && nearbydc.map((res, index) => {
              //           return <tr key={index}>
              //             <td> {res.HID} </td>
              //             <td> {res.Name} </td>
              //             <td> {res.Address} </td>
              //             <td> {res.Pincode} </td>
              //           </tr>
              //         })}
              //       </tbody>
              //     </Table>
              //   </div>
              //   <CardFooter className="py-4 text-center">
              //   </CardFooter>
              // </Card>
              // :
              // <Card className="bg-secondary shadow">
              //   <CardHeader className="border-0 bg-secondary text-center">
              //     <h3 className="mb-0">No Nearby Hospitals Found!</h3>
              //   </CardHeader>
              //   <CardBody className=' text-center'>
              //     <h2>We tried searching near your address, but could not find any nearby hospitals</h2>
              //     <div className="text-center">
              //     </div>
              //   </CardBody>
              // </Card>


            }
          </Col>

        </Row>



      </Container>

    </>
  );
}

export default EmergencyBloodRequirements;
