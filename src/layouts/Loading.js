import { Lottie } from "@crello/react-lottie"
import React from "react"
import FadeIn from "react-fade-in"
import "./center.css"
import * as heartbeat from "./heartbeat-medical.json"



const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartbeat.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default class Loading extends React.Component {

    render() {
        return (
            <div className="splash-screen">
                <FadeIn>
                    <Lottie config={defaultOptions} height={200} width={200} />
                    <h1 className="text-center">Loading...</h1>
                </FadeIn>
            </div>

        );
    }
}