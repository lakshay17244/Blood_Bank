import axios from 'axios';


const URL = "http://127.0.0.1:5000/"
// const URL = "https://dbmsbloodbank.herokuapp.com/"

export const getWTDDonors = async (BG) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getWTDDonors/` + BG)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const getDonorAppointments = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getDonorAppointments/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const bookAppointment = async (toSend) => {
    let details = "Couldn't Do the request";
    await axios({
        method: 'post',
        url: URL + "makeAppointment",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}


export const getAppointment = async (toSend) => {
    let details = "Couldn't Do the request";
    await axios({
        method: 'post',
        url: URL + "getAppointment",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}


export const addemergencyrequirement = async (toSend) => {

    let details = "Couldn't Do the request";
    // console.log("addemergencyrequirement sending - ", toSend)
    await axios({
        method: 'post',
        url: URL + "addemergencyrequirement",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}

export const removeemergencyrequirement = async (toSend) => {

    let details = "Couldn't Do the request";
    // console.log("removeemergencyrequirement sending - ", toSend)
    await axios({
        method: 'post',
        url: URL + "removeemergencyrequirement",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}


export const withdrawBlood = async (toSend) => {
    let details = "Couldn't Do the request";
    await axios({
        method: 'post',
        url: URL + "withdrawBlood",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}


export const checkBloodAvailabilityNearby = async (BG, UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `checkBloodAvailabilityNearby/` + BG + "/" + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const checkBloodAvailability = async (BG) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `checkBloodAvailability/` + BG)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const addPatient = async (toSend) => {
    let details = "Couldn't Do the request";
    await axios({
        method: 'post',
        url: URL + "addPatient",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}



export const removePatient = async (PID) => {
    let details = "Couldn't Do the request";
    let toSend = {
        "PID": PID
    }
    // console.log("Updating DC", toSend)
    await axios({
        method: 'post',
        url: URL + "removePatient",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}

export const getPatientDetailsUnderYou = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getPatientDetailsUnderYou/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const getPatientDetails = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getPatientDetails/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const getHDetails = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getHDetails/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getAssociatedDonationCenter = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getAssociatedDonationCenter/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const sendBloodToBloodBank = async (toSend) => {
    let details = "Couldn't Do the request";
    // console.log("Updating DC", toSend)
    await axios({
        method: 'post',
        url: URL + "sendBloodToBloodBank",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details

}


export const getBBStoredBlood = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getBBStoredBlood/` + UserID)
        .then(res => {
            details = res.data;
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const getBBDetails = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getBBDetails/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const getDCDetails = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getDCDetails/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const updateBB = async (toSend) => {
    let details = "Couldn't Do the request";
    // console.log("Updating DC", toSend)
    await axios({
        method: 'post',
        url: URL + "updateBB",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details

}

export const updateDC = async (toSend) => {
    let details = "Couldn't Do the request";
    // console.log("Updating DC", toSend)
    await axios({
        method: 'post',
        url: URL + "updateDC",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details

}

export const updateH = async (toSend) => {
    let details = "Couldn't Do the request";
    // console.log("Updating H", toSend)
    await axios({
        method: 'post',
        url: URL + "updateH",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details

}

export const getAssociatedBloodBank = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getAssociatedBloodBank/` + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}



export const getDonatedBlood = async (UserID) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getDonatedBlood/` + UserID)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const addEmployee = async (toSend) => {
    let details = "Couldn't Do the request";

    await axios({
        method: 'post',
        url: URL + "addemployee",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}

export const removeEmployee = async (toSend) => {
    let details = "Couldn't Do the request";

    await axios({
        method: 'post',
        url: URL + "rmvemployee",
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        console.log(res)
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}

export const getAdmins = async (type, UserID) => {
    let details = "Couldn't Do the request";

    let path = "";

    switch (type) {
        case "BB":
            path = "getbbemployees/"
            break;
        case "DC":
            path = "getdcemployees/"
            break;
        case "H":
            path = "gethsemployees/"
            break;
        default: return details
    }
    await axios.get(URL + path + UserID)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getAdminOrganization = async (UserId) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getAdminOrganization/` + UserId)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getemergencyrequirements = async (UserId) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getemergencyrequirements/` + UserId)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}

export const getDonorERNearby = async (UserId) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getDonorERNearby/` + UserId)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getDonorERAll = async (UserId) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getDonorERAll/` + UserId)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}



export const getnearbyhospitals = async (UserId) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getnearbyhospitals/` + UserId)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getallhospitals = async () => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getallhospitals`)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getnearbydc = async (UserId) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getnearbydc/` + UserId)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getalldc = async () => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getalldc`)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const registerOrganization = async (organization, toSend) => {
    let details = "Couldn't Do the request";
    console.log("Registering this -> ", organization)
    let path = ""

    switch (organization) {
        case "Hospital":
            path = "addhospital"
            break;

        case "BloodBank":
            path = "addbloodbank"
            break;

        case "DonationCenter":
            path = "adddonationcenter"
            break;

        default: return "ERROR"
    }

    await axios({
        method: 'post',
        url: URL + path,
        headers: { 'Content-Type': 'application/json' },
        data: toSend
    }).then(res => {
        console.log(res)
        details = res.data.message
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}


export const getPastDonations = async (UserId) => {
    let details = "Couldn't Do the request";
    await axios.get(URL + `getpastdonations/` + UserId)
        .then(res => {
            details = res.data;
            // console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const donateBlood = async (donationDetails) => {
    let details = "Couldn't Do the request";
    await axios({
        method: 'post',
        url: URL + "donateblood",
        headers: { 'Content-Type': 'application/json' },
        data: donationDetails
    }).then(res => {
        console.log(res)
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details
}


export const updateUser = async (userDetails) => {
    let details = "Couldn't Do the request";
    await axios({
        method: 'post',
        url: URL + "updateuser",
        headers: { 'Content-Type': 'application/json' },
        data: userDetails
    }).then(res => {
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details

    // let dummy = {
    //     message: "Success",
    //     status: 200,
    //     userid: 122
    // }
    // return dummy

}


export const createUser = async (userDetails) => {
    let details = "Couldn't Do the request";
    console.log("Creating user", userDetails)
    await axios({
        method: 'post',
        url: URL + "createuser",
        headers: { 'Content-Type': 'application/json' },
        data: userDetails
    }).then(res => {
        // console.log(res)
        details = res.data
    }).catch(e => {
        console.log("ERROR | " + e)
        details = e
    });
    return details

    // let dummy = {
    //     message: "Success",
    //     status: 200,
    //     userid: 122
    // }
    // return dummy

}


export const loginAPI = async (UserId, Password) => {

    let result = 401
    let message = ""
    // console.log("===>", UserId)
    // console.log("===>", Password)
    await axios({
        method: 'post',
        url: URL + "login",
        headers: { 'Content-Type': 'application/json' },
        data: {
            "UserID": UserId,
            "Password": Password
        }
    }).then(res => {
        result = res.data.status
        message = res.data.message
    }).catch(e => {
        console.log("ERROR | " + e)
    });

    let loggedIn = result === 200;
    return {
        "loggedIn": loggedIn,
        "message": message
    };


    // let dummy = {
    //     loggedIn: true,
    //     message: "Logged in successfully"
    // }
    // return dummy
}


export const getUserDetails = async (UserId) => {
    let details = "Couldn't Do the request";

    await axios.get(URL + `showprofile/` + UserId)
        .then(res => {
            details = res.data;
            localStorage.setItem("name", details.Username)
            localStorage.setItem("type", details.Type)
            localStorage.setItem("email", details.Email)
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;

    // let dummy =
    // {
    //     Address: "6085/2 D-6 SANTUSHTI APARTMENTS",
    //     Age: 18,
    //     Email: "asd",
    //     Phone: "9999563824",
    //     Pincode: "110070",
    //     Type: "Admin",
    //     UserID: 114,
    //     Username: "Lakshay Sharma",
    // }
    // return dummy
}