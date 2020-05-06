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
import classnames from "classnames";
import React, { useEffect, useState } from "react";
// import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import * as req from "../../requests";
import Select from 'react-select';

const BloodGroups = [
	{ value: 'A+', label: 'A+' },
	{ value: 'A-', label: 'A-' },
	{ value: 'B+', label: 'B+' },
	{ value: 'B-', label: 'B-' },
	{ value: 'AB+', label: 'AB+' },
	{ value: 'AB-', label: 'AB-' },
	{ value: 'O+', label: 'O+' },
	{ value: 'O-', label: 'O-' }
]



const Register = () => {
	// const [DidMount, setDidMount] = useState(false)
	const [type, settype] = useState('Donor')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [dob, setDob] = useState('')
	const [address, setAddress] = useState('')
	const [pincode, setPincode] = useState('')
	const [password, setPassword] = useState('')
	const [BloodGroup, setBloodGroup] = useState(BloodGroups[2])
	const [date, setdate] = useState(new Date())
	const [wtd, setwtd] = useState(false)
	const [UserMade, setUserMade] = useState(false)
	const [UserIdMade, setUserIdMade] = useState(-1)

	useEffect(() => {
		console.log("REGISTER MOUNTED!")
		let today = new Date()
		let month = (today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
		let day = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();
		let dateToday = today.getFullYear() - 18 + '-' + month + '-' + day
		setdate(dateToday)

	}, [])

	const registerUser = () => {
		let toSend = {
			"user": {
				"Type": type,
				"Username": name,
				"Email": email,
				"Dob": dob,
				"Bloodgroup": BloodGroup.value,
				"Phone": phone,
				"Address": address,
				"Pincode": pincode,
				"Password": password,
				"WTD": wtd ? 1 : 0
			}
		}
		req.createUser(toSend).then(e => {
			if (parseInt(e.status) === 200) {
				setUserMade(true)
				setUserIdMade(e.userid)
			}
		})
	}


	return (
		<>
			<Col lg="6" md="8">
				{!UserMade ?
					<Card className="bg-secondary shadow border-0">
						<CardHeader className="bg-transparent pb-5">
							<div className="text-muted text-center mt-2 mb-4">
								<small>Are you a</small>
							</div>
							<div className="text-center">
								<Button
									className={classnames("btn-neutral btn-icon mr-4", { active: type === 'Donor' })}
									// color="default"
									// href="#pablo"
									onClick={e => {
										e.preventDefault()
										settype('Donor')
									}}
								>
									<span className="btn-inner--icon">
										{/* <img
											alt="..."
											src={require("assets/img/icons/common/github.svg")}
										/> */}
										<i className='ni ni-single-02' />
									</span>
									<span className="btn-inner--text">Donor</span>
								</Button>
								<Button
									// className="btn-neutral btn-icon"
									className={classnames("btn-neutral btn-icon", { active: type !== 'Donor' })}
									color="default"
									href="#pablo"
									onClick={e => {
										e.preventDefault()
										settype('Admin')
									}}
								>
									<span className="btn-inner--icon">
										{/* <img
											alt="..."
											src={require("assets/img/icons/common/google.svg")}
										/> */}
										{/* <i className='ni ni-ambulance'/> */}
										<i className='ni ni-badge' />
									</span>
									<span className="btn-inner--text">Admin</span>
								</Button>
							</div>
						</CardHeader>



						<CardBody className="px-lg-5 py-lg-5">
							<div className="text-center text-muted mb-4">
								<small>Sign up as {type}</small>
							</div>
							<Form role="form">

								{/* Name */}

								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-hat-3" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
									</InputGroup>
								</FormGroup>

								{/* Phone */}

								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-mobile-button" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
									</InputGroup>
								</FormGroup>

								{/* Email */}

								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-email-83" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Email" type="email" autoComplete="new-email" value={email} onChange={(e) => setEmail(e.target.value)} />
									</InputGroup>
								</FormGroup>

								{/* Date of Birth */}

								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-calendar-grid-58 mr-2" /> Dob
											</InputGroupText>
										</InputGroupAddon>
										<Input type="date" pattern="[0-9]*" value={dob} onChange={(e) => setDob(e.target.value)} max={date} />
									</InputGroup>
								</FormGroup>


								{/* Blood Group */}
								{
									type === 'Donor' ?
										(<FormGroup>
											<InputGroup className="input-group-alternative mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="ni ni-favourite-28 mr-2" />
													Blood Group
												</InputGroupText>
												</InputGroupAddon>
												<Select
													className="basic-single my-auto ml-1 w-25"
													classNamePrefix="select"
													defaultValue={"Select"}
													// isDisabled={isDisabled}
													// isLoading={isLoading}
													// isClearable={isClearable}
													value={BloodGroup}
													onChange={(e) => { setBloodGroup(e) }}
													name="color"
													options={BloodGroups}
												/>

											</InputGroup>
										</FormGroup>)
										:
										null
								}



								{/* Address */}

								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-shop" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
									</InputGroup>
								</FormGroup>

								{/* Pincode */}

								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-square-pin" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Pincode" type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
									</InputGroup>
								</FormGroup>

								{/* Password */}
								<FormGroup>
									<InputGroup className="input-group-alternative">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-lock-circle-open" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Password" type="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} value={password} />
									</InputGroup>
								</FormGroup>

								{/* Password Strength
									<div className="text-muted font-italic">
										<small>
											Password Strength:{" "}
											<span className="text-success font-weight-700">Strong</span>
										</small>
									</div> */}
								{type === "Donor" ? (<Row className="my-4">
									<Col xs="12">
										<div className="custom-control custom-control-alternative custom-checkbox">
											<input
												className="custom-control-input"
												id="customCheckRegister"
												type="checkbox"
												checked={wtd}
												onChange={() => setwtd(!wtd)}
											/>
											<label
												className="custom-control-label"
												htmlFor="customCheckRegister"
											>
												<span className="text-muted">
													Willing to donate blood
													</span>
											</label>
										</div>
									</Col>
								</Row>) : null}

								<div className="text-center">
									<Button className="mt-4" color="primary" type="button" onClick={registerUser}>Create account</Button>
								</div>
								<Link to="/auth/login">
									<h4 className="text-muted text-center mt-4">Already have an account?</h4>
								</Link>
							</Form>
						</CardBody>
					</Card>
					:
					<>
						<h1 className="text-white text-center">Congrats for signing up succesfully</h1>
						<h1 className="text-white text-center">Your new USER ID is <b>{UserIdMade}</b></h1>
						<div className="text-center">
							<Link
								className="nav-link-icon text-center"
								to="/auth/login"
							>
								<div className="text-center mt-4">
									<Button className="my-4" color="primary" type="button">Sign in Now</Button>
								</div>
							</Link>
						</div>
					</>
				}
			</Col>

		</>
	);

}

// const mapStateToProps = (state) => {
// 	return {
// 		isLoggedIn: state.isLoggedIn
// 	}
// }

// export default connect(mapStateToProps)(Register);
export default Register