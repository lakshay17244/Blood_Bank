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
import BloodBank from "views/examples/BloodBank";
import DonationCenter from "views/examples/DonationCenter";
import EmergencyBloodRequirements from "views/examples/EmergencyBloodRequirements";
import Hospital from "views/examples/Hospital";
import Login from "views/examples/Login.js";
import PledgeOrgans from "views/examples/PledgeOrgans";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import WhereCanIDonate from "views/examples/WhereCanIDonate";
import Index from "views/Index.js";
import * as BlueHeartbeat from "./components/LottieFiles/BlueHeartbeat.json";
import * as DCIcon from "./components/LottieFiles/DCIcon.json";
import * as WhereCanIDonateIcon from "./components/LottieFiles/DeliveryIcon.json";
import * as PledgeOrgansIcon from "./components/LottieFiles/HeartBowIcon.json";
import * as HospitalIcon2 from "./components/LottieFiles/HospitalIcon2.json";
import * as NinjaIcon from "./components/LottieFiles/NinjaIcon.json";
import * as SpinningPlusSign from "./components/LottieFiles/SpinningPlusSign.json";

const DCIconOptions = {
  loop: true,
  autoplay: true,
  animationData: DCIcon.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const getOptions = (jsonFile) => {
  return {
    loop: true,
    autoplay: true,
    animationData: jsonFile.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
}


const getallroutes = (Type = "Anon") => {

  let Routes = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      iconAnimated: { ...getOptions(SpinningPlusSign) },
      component: Index,
      layout: "/admin"
    },
    {
      path: "/user-profile",
      name: "User Profile",
      icon: "ni ni-single-02 text-yellow",
      iconAnimated: { ...getOptions(NinjaIcon) },
      component: Profile,
      layout: "/admin"
    },
    {
      path: "/login",
      name: "Login",
      icon: "ni ni-key-25 text-info",
      component: Login,
      layout: "/auth"
    },
    {
      path: "/register",
      name: "Register",
      icon: "ni ni-circle-08 text-pink",
      component: Register,
      layout: "/auth"
    }
  ];

  if (Type === "Donor") {
    Routes.push({
      path: "/EBR",
      name: "Emergency Blood Requirements",
      icon: "ni ni-ambulance text-red",
      iconAnimated: { ...DCIconOptions },
      component: EmergencyBloodRequirements,
      layout: "/admin"
    })
    Routes.push(
      {
        path: "/WCID",
        name: "Where Can I Donate",
        icon: "ni ni-square-pin text-green",
        iconAnimated: { ...getOptions(WhereCanIDonateIcon) },
        component: WhereCanIDonate,
        layout: "/admin"
      })
    Routes.push(
      {
        path: "/OrganPledge",
        name: "Pledge Organs",
        icon: "ni ni-active-40 text-purple",
        iconAnimated: { ...getOptions(PledgeOrgansIcon) },
        component: PledgeOrgans,
        layout: "/admin"
      })
  }

  if (Type === "Admin") {
    Routes.push({
      path: "/BB",
      name: "Blood Bank",
      icon: "ni ni-ambulance text-red",
      iconAnimated: {...getOptions(DCIcon)},
      component: BloodBank,
      layout: "/admin"
    })
    Routes.push(
      {
        path: "/Hospital",
        name: "Hospital",
        icon: "ni ni-square-pin text-green",
        iconAnimated: {...getOptions(HospitalIcon2)},
        component: Hospital,
        layout: "/admin"
      })
    Routes.push(
      {
        path: "/DonationCenter",
        name: "Donation Center",
        icon: "ni ni-active-40 text-purple",
        iconAnimated: {...getOptions(BlueHeartbeat)},
        component: DonationCenter,
        layout: "/admin"
      })
  }
  return Routes
}



export default getallroutes;
