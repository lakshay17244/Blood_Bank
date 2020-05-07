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
import { Card, CardFooter, CardHeader, Col, Container, Row, Table } from "reactstrap";
import * as req from "../../requests";
import { connect } from 'react-redux';
import _ from "lodash"



const EmergencyBloodRequirements = (props) => {

  const [DidMount, setDidMount] = useState(false);

  const [ERNearby, setERNearby] = useState([])
  const [ERAll, setERAll] = useState([])


  useEffect(() => {
    if (!DidMount) {
      setDidMount(true)
      req.getDonorERNearby(props.UserID).then((ER) => {
        setERNearby(ER)
      })
      req.getDonorERAll(props.UserID).then(ER => {
        setERAll(ER)
      })
    }

  }, [DidMount, props.UserID])


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
                  <Table bordered hover className="align-items-center table-flush" responsive>
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
                  <Table bordered hover className="align-items-center table-flush" responsive>
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

const mapStateToProps = (state) => {
  return {
    hasDonationCenter: _.get(state, "UserDetails.hasDonationCenter", false),
    UserID: _.get(state, "UserDetails.UserID")
  }
}

export default connect(mapStateToProps)(EmergencyBloodRequirements);
