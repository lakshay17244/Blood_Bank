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
import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";


const PledgeOrgans = () => {

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
