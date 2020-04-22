import React from 'react';

import axios from 'axios';


const URL = "http://127.0.0.1:5000/"


export const getemergencyrequirements = async (UserId) => {
    const details = "Couldn't Do the request";
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

export const getnearbyhospitals = async (UserId) => {
    const details = "Couldn't Do the request";
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
    const details = "Couldn't Do the request";
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
    const details = "Couldn't Do the request";
    await axios.get(URL + `getnearbydc/` + UserId)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const getalldc = async () => {
    const details = "Couldn't Do the request";
    await axios.get(URL + `getalldc`)
        .then(res => {
            details = res.data;
            console.log(details);
        }).catch(e => {
            details = e
            console.log("ERROR")
        });
    return details;
}


export const registerOrganization = async (organization,toSend) => {
    const details = "Couldn't Do the request";
    console.log("Registering this -> ", organization)
    let path =""

    switch (organization) {
        case "Hospital":
            path="addhospital"
            break;

        case "BloodBank":
            path="addbloodbank"
            break;

        case "DonationCenter":
            path="adddonationcenter"
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
    const details = "Couldn't Do the request";
    let send = URL + `getpastdonations/` + UserId
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
    const details = "Couldn't Do the request";
    console.log("Donating this -> ", donationDetails)
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
    const details = "Couldn't Do the request";
    console.log("Updating user", userDetails)
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
    const details = "Couldn't Do the request";
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
        console.log(res)
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
    const details = "Couldn't Do the request";

    await axios.get(URL + `showprofile/` + UserId)
        .then(res => {
            details = res.data;
            // console.log(details);

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