import React from 'react';

import axios from 'axios';


const URL = "http://127.0.0.1:5000/"



export const createUser = async (userDetails) => {
    const details = "Couldn't Do the requset";
    console.log("Creating user",userDetails)
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
}


export const loginAPI = async (UserId, Password) => {

    let result = 401
    let message = ""
    console.log("===>",UserId)
    console.log("===>",Password)
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
}

export const getUserDetails = async (UserId) => {
    const details = "Couldn't Do the requset";

    await axios.get(URL + `showprofile/` + UserId)
        .then(res => {
            details = res.data;
            // console.log(details);

        }).catch(e => {
            details = e
            console.log("ERROR")
        });

    return details;
}