import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Row, Table } from "reactstrap";
import * as req from "../requests";


const ErrorMessage = (props) => {
    return (<Row>
        <Col xl={4} l={4} m={4}></Col>
        <Col xl={4} l={4} m={4}>
            <Card className="bg-gradient-default shadow">
                <CardBody>
                    <h2 className="text-white mb-0">You have not been added to any {props.message} yet. More updates to follow.</h2>
                </CardBody>
            </Card>
        </Col>
        <Col xl={4} l={4} m={4}></Col>
    </Row>)
}


const AddRemoveAdmins = (props) => {
    const [DidMount, setDidMount] = useState(false);

    // Other Admin Details
    const [BBAdmins, setBBAdmins] = useState([])
    const [DCAdmins, setDCAdmins] = useState([])
    const [HAdmins, setHAdmins] = useState([])

    const [DCInputUserID, setDCInputUserID] = useState('')
    const [BBInputUserID, setBBInputUserID] = useState('')
    const [HSInputUserID, setHSInputUserID] = useState('')
    const [DCRInputUserID, setDCRInputUserID] = useState('')
    const [BBRInputUserID, setBBRInputUserID] = useState('')
    const [HSRInputUserID, setHSRInputUserID] = useState('')


    const addAdmin = (UserID, place, id) => {
        let toSend = {
            "UserID": UserID,
            "place": place,
            "HID": id,
            "BBID": id,
            "DCID": id
        }
        console.log(toSend)
        req.addEmployee(toSend).then(r => {
            console.log("R is = ", r)
            if (r.status === 200) {
                switch (place) {
                    case "hospital":
                        req.getAdmins("H", localStorage.getItem("userID")).then((res) => {
                            setHAdmins(res)
                        })
                        break
                    case "blood_bank":
                        req.getAdmins("BB", localStorage.getItem("userID")).then((res) => {
                            setBBAdmins(res)
                        })
                        break
                    case "donation_centers":
                        req.getAdmins("DC", localStorage.getItem("userID")).then((res) => {
                            setDCAdmins(res)
                        })
                        break
                    default: break
                }
            }
        })
    }

    const removeAdmin = (UserID, place, id) => {
        let toSend = {
            "UserID": UserID,
            "place": place,
            "HID": id,
            "BBID": id,
            "DCID": id
        }
        req.removeEmployee(toSend).then(r => {
            if (r.status === 200) {
                switch (place) {
                    case "hospital":
                        req.getAdmins("H", localStorage.getItem("userID")).then((res) => {
                            setHAdmins(res)
                        })
                        break
                    case "blood_bank":
                        req.getAdmins("BB", localStorage.getItem("userID")).then((res) => {
                            setBBAdmins(res)
                        })
                        break
                    case "donation_centers":
                        req.getAdmins("DC", localStorage.getItem("userID")).then((res) => {
                            setDCAdmins(res)
                        })
                        break
                    default: break
                }
            }
        })
    }

    useEffect(() => {
        if (!DidMount) {
            setDidMount(true)
            let hasOrganization = props.hasOrganization

            if (hasOrganization && hasOrganization["BBE"] === 1) {
                req.getAdmins("BB", localStorage.getItem("userID")).then((res) => {
                    setBBAdmins(res)
                })

            }
            if (hasOrganization && hasOrganization["DCE"] === 1) {
                req.getAdmins("DC", localStorage.getItem("userID")).then((res) => {
                    setDCAdmins(res)
                })

            }
            if (hasOrganization && hasOrganization["HE"] === 1) {
                req.getAdmins("H", localStorage.getItem("userID")).then((res) => {
                    setHAdmins(res)
                })

            }
        }

    }, [DidMount, props])


    return (


        <>
            {props.DC ?
                props && props.hasOrganization && props.hasOrganization.DCE === 1 ?
                    <Row >
                        {/* <Col xl={1} l={1} m={1}></Col> */}
                        <Col xl={12} l={12} m={12}>

                            <div className='scrollspy-example-2'>
                                <Card className="shadow" >
                                    <CardHeader className="border-0 text-center">
                                        <h3 className="mb-0">Donation Center Admins</h3>
                                        <h4 className="text-muted">{DCAdmins && DCAdmins.length > 0 ? "(DCID=" + DCAdmins[0].DCID + ")" : null}</h4>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush mb-4" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">UserID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Pincode</th>
                                                <th scope="col" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DCAdmins && DCAdmins.map((res, index) => {
                                                return <tr key={index}>
                                                    <td> {res.UserID} </td>
                                                    <td> {res.Username} </td>
                                                    <td> {res.Phone} </td>
                                                    <td> {res.Email} </td>
                                                    <td> {res.Address} </td>
                                                    <td> {res.Pincode} </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>
                                </Card >
                            </div>
                            <Row>
                                <Col xl={6} l={6} m={6} >
                                    <div className="mt-4 mx-5 text-center">
                                        <h5>Add Donation Center Admins</h5>
                                        <Input type="number" placeholder="UserID" value={DCInputUserID} onChange={e => setDCInputUserID(e.target.value)} />
                                        <Button className="mt-3" color="primary" type="button" onClick={() => { addAdmin(DCInputUserID, "donation_centers", DCAdmins[0].DCID) }}>Add</Button>
                                    </div>
                                </Col>
                                <Col xl={6} l={6} m={6} >
                                    <div className="mt-4 mx-5 text-center">
                                        <h5>Remove Donation Center Admins</h5>
                                        <Input type="number" placeholder="UserID" value={DCRInputUserID} onChange={e => setDCRInputUserID(e.target.value)} />
                                        <Button className="mt-3 mb-2" color="primary" type="button" onClick={() => { removeAdmin(DCRInputUserID, "donation_centers", DCAdmins[0].DCID) }}>Remove</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        {/* <Col xl={1} l={1} m={1}></Col> */}
                    </Row>
                    :
                    <ErrorMessage message={"Donation Center"} />
                : null
            }

            {props.BB ?

                props && props.hasOrganization && props.hasOrganization.BBE === 1 ?

                    <Row >
                        {/* <Col xl={1} l={1} m={1}></Col> */}
                        <Col xl={12} l={12} m={12}>

                            <div className='scrollspy-example-2'>
                                <Card className="shadow" >
                                    <CardHeader className="border-0 text-center">
                                        <h3 className="mb-0">Blood Bank Admins</h3>
                                        <h4 className="text-muted">{BBAdmins && BBAdmins.length > 0 ? "(BBID=" + BBAdmins[0].BBID + ")" : null}</h4>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush mb-4" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">UserID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Pincode</th>
                                                <th scope="col" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {BBAdmins && BBAdmins.map((res, index) => {
                                                return <tr key={index}>
                                                    <td> {res.UserID} </td>
                                                    <td> {res.Username} </td>
                                                    <td> {res.Phone} </td>
                                                    <td> {res.Email} </td>
                                                    <td> {res.Address} </td>
                                                    <td> {res.Pincode} </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>
                                </Card >
                            </div>
                            <Row>
                                <Col xl={6} l={6} m={6} >
                                    <div className="mt-4 mx-5 text-center">
                                        <h5>Add Blood Bank Admins</h5>
                                        <Input type="number" placeholder="UserID" value={BBInputUserID} onChange={e => setBBInputUserID(e.target.value)} />
                                        <Button className="mt-3" color="primary" type="button" onClick={() => { addAdmin(BBInputUserID, "blood_bank", BBAdmins[0].BBID) }}>Add</Button>
                                    </div>
                                </Col>
                                <Col xl={6} l={6} m={6} >
                                    <div className="mt-4 mx-5 text-center">
                                        <h5>Remove Blood Bank Admins</h5>
                                        <Input type="number" placeholder="UserID" value={BBRInputUserID} onChange={e => setBBRInputUserID(e.target.value)} />
                                        <Button className="mt-3 mb-2" color="primary" type="button" onClick={() => { removeAdmin(BBRInputUserID, "blood_bank", BBAdmins[0].BBID) }}>Remove</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        {/* <Col xl={1} l={1} m={1}></Col> */}
                    </Row>
                    : <ErrorMessage message={"Blood Bank"} />

                : null

            }

            {props.HS ?

                props && props.hasOrganization && props.hasOrganization.HE === 1 ?
                    <Row>
                        {/* <Col xl={1} l={1} m={1}> */}
                        {/* </Col> */}
                        <Col xl={12} l={12} m={12}>
                            <div className='scrollspy-example-2'>
                                <Card className="shadow" >
                                    <CardHeader className="border-0 text-center">
                                        <h3 className="mb-0">Hospital Admins</h3>
                                        <h4 className="text-muted">{HAdmins && HAdmins.length > 0 ? "(HID=" + HAdmins[0].HID + ")" : null}</h4>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush mb-4" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">UserID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Pincode</th>
                                                <th scope="col" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {HAdmins && HAdmins.map((res, index) => {
                                                return <tr key={index}>
                                                    <td> {res.UserID} </td>
                                                    <td> {res.Username} </td>
                                                    <td> {res.Phone} </td>
                                                    <td> {res.Email} </td>
                                                    <td> {res.Address} </td>
                                                    <td> {res.Pincode} </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>
                                </Card >
                            </div>
                            <Row>
                                <Col xl={6} l={6} m={6} >
                                    <div className="mt-4 mx-5 text-center">
                                        <h5>Add Hospital Admins</h5>
                                        <Input type="number" placeholder="UserID" value={HSInputUserID} onChange={e => setHSInputUserID(e.target.value)} />
                                        <Button className="mt-3" color="primary" type="button" onClick={() => { addAdmin(HSInputUserID, "hospital", HAdmins[0].HID) }}>Add</Button>
                                    </div>
                                </Col>
                                <Col xl={6} l={6} m={6} >
                                    <div className="mt-4 mx-5 text-center">
                                        <h5>Remove Hospital Admins</h5>
                                        <Input type="number" placeholder="UserID" value={HSRInputUserID} onChange={e => setHSRInputUserID(e.target.value)} />
                                        <Button className="mt-3 mb-2" color="primary" type="button" onClick={() => { removeAdmin(HSRInputUserID, "hospital", HAdmins[0].HID) }}>Remove</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        {/* <Col xl={1} l={1} m={1}></Col> */}
                    </Row >
                    :
                    <ErrorMessage message={"Hospital"} />
                : null
            }
        </>
    )
}


export default AddRemoveAdmins;