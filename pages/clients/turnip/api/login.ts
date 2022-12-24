import {Profile} from "../models/profile";
import React from "react";

export const login = (
    username: string,
    password: string,
    setProfile: ((value: (((prevState: (Profile | undefined)) => (Profile | undefined)) | Profile | undefined)) => void) | undefined
) => {
    // todo: cleanup
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username,
        "password": password
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/api/v1/tokens", requestOptions)
        .then(response => {
            if (response.ok) {
                console.log("Testing");
                response.json().then((result) => {
                    console.log(result);
                    setProfile!(result as Profile);
                })
            } else {
                console.log("Error code", response.status);
                response.text().then((text) => {
                    console.log(text);
                })
            }
        })
        .catch(error => console.log('error', error));
}