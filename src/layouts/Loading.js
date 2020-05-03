import React from "react"
import FadeIn from "react-fade-in"
import { Lottie } from "@crello/react-lottie"

import * as legoData from "./heartbeat-medical.json"
import "./center.css"


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
// const defaultOptions2 = {
//     loop: false,
//     autoplay: true,
//     animationData: doneData.default,
//     rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice"
//     }
// };

export default class Loading extends React.Component {

    render() {
        return (
            <FadeIn>
                <Lottie config={defaultOptions} height={200} width={200} />
                <h1 className="text-center">Loading...</h1>
            </FadeIn>
        );
    }
}