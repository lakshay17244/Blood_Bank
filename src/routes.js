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

const getallroutes = (Type = "Anon") => {

  let Routes = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: Index,
      layout: "/admin"
    },
    {
      path: "/user-profile",
      name: "User Profile",
      icon: "ni ni-single-02 text-yellow",
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
      component: EmergencyBloodRequirements,
      layout: "/admin"
    })
    Routes.push(
      {
        path: "/WCID",
        name: "Where Can I Donate",
        icon: "ni ni-square-pin text-green",
        component: WhereCanIDonate,
        layout: "/admin"
      })
    Routes.push(
      {
        path: "/OrganPledge",
        name: "Pledge Organs",
        icon: "ni ni-active-40 text-purple",
        component: PledgeOrgans,
        layout: "/admin"
      })
  }

  if (Type === "Admin") {
    Routes.push({
      path: "/BB",
      name: "Blood Bank",
      icon: "ni ni-ambulance text-red",
      component: BloodBank,
      layout: "/admin"
    })
    Routes.push(
      {
        path: "/Hospital",
        name: "Hospital",
        icon: "ni ni-square-pin text-green",
        component: Hospital,
        layout: "/admin"
      })
    Routes.push(
      {
        path: "/DonationCenter",
        name: "Donation Center",
        icon: "ni ni-active-40 text-purple",
        component: DonationCenter,
        layout: "/admin"
      })
  }
  return Routes
}



export default getallroutes;
