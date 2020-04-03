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
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col
} from "reactstrap";

class Register extends React.Component {


	constructor(props) {
		super(props);

		let today = new Date()
		let month = (today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
		let day = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();
		let dateToday = today.getFullYear() - 18 + '-' + month + '-' + day



		this.state = {
			type: 'Donor',
			name: '',
			number: '',
			email: '',
			dob: '',
			address: '',
			pincode: '',
			password: '',
			bloodGroup: 'B+',
			date: dateToday
		}
	}

	toggleState(type) {

		this.setState({
			type: type
		})
	}

	handleName(e) {
		this.setState({
			name: e.target.value
		})
	}
	handleNumber(e) {
		this.setState({
			number: e.target.value
		})
	}
	handleEmail(e) {
		this.setState({
			email: e.target.value
		})
	}
	handleDob(e) {
		this.setState({
			dob: e.target.value
		})
	}
	handleAddress(e) {
		this.setState({
			address: e.target.value
		})
	}
	handlePincode(e) {
		this.setState({
			pincode: e.target.value
		})
	}
	handlePassword(e) {
		this.setState({
			password: e.target.value
		})
	}
	handleBloodgroup(e) {
		this.setState({
			bloodGroup: e.target.value
		})
	}

	render() {
		console.log("state = ", this.state);
		return (
			<>
				<Col lg="6" md="8">
					<Card className="bg-secondary shadow border-0">
						<CardHeader className="bg-transparent pb-5">
							<div className="text-muted text-center mt-2 mb-4">
								<small>Are you a</small>
							</div>
							<div className="text-center">
								<Button
									className={classnames("btn-neutral btn-icon mr-4", { active: this.state.type==='Donor'})}
									// color="default"
									// href="#pablo"
									onClick={e => {
										e.preventDefault()
										this.toggleState('Donor')
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
									className={classnames("btn-neutral btn-icon", { active: this.state.type!=='Donor'})}
									color="default"
									href="#pablo"
									onClick={e => {
										e.preventDefault()
										this.toggleState('Admin')
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
								<small>Sign up as {this.state.type}</small>
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
										<Input placeholder="Name" type="text" value={this.state.name} onChange={(e) => this.handleName(e)} />
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
										<Input placeholder="Phone" type="number" value={this.state.number} onChange={(e) => this.handleNumber(e)} />
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
										<Input placeholder="Email" type="email" autoComplete="new-email" value={this.state.email} onChange={(e) => this.handleEmail(e)} />
									</InputGroup>
								</FormGroup>

								{/* Date of Birth */}

								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-calendar-grid-58 mr-2" /> DOB
                      </InputGroupText>
										</InputGroupAddon>
										<Input type="date" pattern="[0-9]*" value={this.state.dob} onChange={(e) => this.handleDob(e)} max={this.state.date} />
									</InputGroup>
								</FormGroup>


								{/* Blood Group */}
								{
									this.state.type === 'Donor' ?
										(<FormGroup>
											<InputGroup className="input-group-alternative mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="ni ni-favourite-28 mr-2" />
													Blood Group
												</InputGroupText>
												</InputGroupAddon>
												<select value={this.state.bloodGroup} onChange={(e) => this.handleBloodgroup(e)}>
													<option value="A+">A+</option>
													<option value="A-">A-</option>
													<option value="B+">B+</option>
													<option value="B-">B-</option>
													<option value="AB+">AB+</option>
													<option value="AB-">AB-</option>
													<option value="O+">O+</option>
													<option value="O-">O-</option>
												</select>
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
										<Input placeholder="Address" type="text" value={this.state.address} onChange={(e) => this.handleAddress(e)} />
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
										<Input placeholder="Pincode" type="number" value={this.state.pincode} onChange={(e) => this.handlePincode(e)} />
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
										<Input placeholder="Password" type="password" autoComplete="new-password" />
									</InputGroup>
								</FormGroup>

								{/* Password Strength
									<div className="text-muted font-italic">
										<small>
											Password Strength:{" "}
											<span className="text-success font-weight-700">Strong</span>
										</small>
									</div> */}

								<Row className="my-4">
									<Col xs="12">
										<div className="custom-control custom-control-alternative custom-checkbox">
											<input
												className="custom-control-input"
												id="customCheckRegister"
												type="checkbox"
											/>
											<label
												className="custom-control-label"
												htmlFor="customCheckRegister"
											>
												<span className="text-muted">
													I agree with the{" "}
													<a href="#pablo" onClick={e => e.preventDefault()}>
														Privacy Policy
                          </a>
												</span>
											</label>
										</div>
									</Col>
								</Row>
								<div className="text-center">
									<Button className="mt-4" color="primary" type="button">
										Create account
                  </Button>
								</div>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</>
		);
	}
}

export default Register;
