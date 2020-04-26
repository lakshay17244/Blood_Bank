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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import WhereCanIDonate from "views/examples/WhereCanIDonate";
import EmergencyBloodRequirements from "views/examples/EmergencyBloodRequirements";
import PledgeOrgans from "views/examples/PledgeOrgans";
import BloodBank from "views/examples/BloodBank";
import Hospital from "views/examples/Hospital";
import DonationCenter from "views/examples/DonationCenter";

// var routes = [
//   {
//     path: "/index",
//     name: "Dashboard",
//     icon: "ni ni-tv-2 text-primary",
//     component: Index,
//     layout: "/admin"
//   },{
//     path: "/EBR",
//     name: "Emergency Blood Requirements",
//     icon: "ni ni-ambulance text-red",
//     component: EmergencyBloodRequirements,
//     layout: "/admin"
//   },
//   {
//     path: "/WCID",
//     name: "Where Can I Donate",
//     icon: "ni ni-square-pin text-green",
//     component: WhereCanIDonate,
//     layout: "/admin"
//   },
//   // {
//   //   path: "/icons",
//   //   name: "Icons",
//   //   icon: "ni ni-planet text-blue",
//   //   component: Icons,
//   //   layout: "/admin"
//   // },
//   // {
//   //   path: "/maps",
//   //   name: "Maps",
//   //   icon: "ni ni-pin-3 text-orange",
//   //   component: Maps,
//   //   layout: "/admin"
//   // },
//   {
//     path: "/user-profile",
//     name: "User Profile",
//     icon: "ni ni-single-02 text-yellow",
//     component: Profile,
//     layout: "/admin"
//   },
//   // {
//   //   path: "/tables",
//   //   name: "Tables",
//   //   icon: "ni ni-bullet-list-67 text-red",
//   //   component: Tables,
//   //   layout: "/admin"
//   // },
//   {
//     path: "/login",
//     name: "Login",
//     icon: "ni ni-key-25 text-info",
//     component: Login,
//     layout: "/auth"
//   },
//   {
//     path: "/register",
//     name: "Register",
//     icon: "ni ni-circle-08 text-pink",
//     component: Register,
//     layout: "/auth"
//   }
// ];


const getallroutes = () => {

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

  if (localStorage.getItem("type") === "Donor") {
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

  if (localStorage.getItem("type") === "Admin") {
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
