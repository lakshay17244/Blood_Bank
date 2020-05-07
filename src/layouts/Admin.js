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
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import getallroutes from "routes.js";
import im from "../assets/img/brand/argon-react.png";
import { getUserDetails, login, logout } from "../redux/actions_and_reducers/actions";
import Loading from "./Loading";

const Admin = (props) => {
  let history = useHistory();
  // const mainContent = useRef();

  const [DidMount, setDidMount] = useState(false)
  const [LoadedUserDetails, setLoadedUserDetails] = useState(false)


  useEffect(() => {
    return () => {
      document.body.classList.remove("bg-default");
    }
  }, [])

  useEffect(() => {
    if (!DidMount) {
      console.log("Admin.js Mounted", props)
      setDidMount(true)
      let { isLoggedIn, UserDetailsLoading, UserDetails } = props
      // let UserID = localStorage.getItem("UserID");
      let access_token = localStorage.getItem("access_token");

      if (isLoggedIn) {
        // If user is logged in and UserDetails haven't been fetched or fetching yet => Fetch User Details
        if (!UserDetailsLoading && _.isEmpty(UserDetails)) {
          props.getUserDetails().then(() => {
            setLoadedUserDetails(true)
          })
        }
        else
          setLoadedUserDetails(true)
      }

      else {
        // TRY TO AUTO LOGIN
        if (access_token)
          props.login("", "", true).then(e => {
            if (e.status === 200) {
              if (!UserDetailsLoading && _.isEmpty(UserDetails)) {
                props.getUserDetails().then(() => setLoadedUserDetails(true))
              }
            }
            else
              history.push("/auth/login") && props.logout()
          })
        else
          history.push("/auth/login") && props.logout()
      }

      // If not loaded, then go ahead...
      // setTimeout(() => setLoadedUserDetails(true), 5000)
    }

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.scrollTop = 0;

  }, [DidMount, props, history])


  const getRoutes = routes => {
    return LoadedUserDetails ? routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    }) : null;
  };
  const getBrandText = path => {
    let routes = getallroutes(props.Type)
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (

    <>
      {LoadedUserDetails ?
        <>
          <Sidebar
            {...props}
            routes={getallroutes(props.Type)}
            logo={{
              innerLink: "/admin/index",
              // imgSrc: require("assets/img/brand/argon-react.png"),
              imgSrc: im,
              imgAlt: "..."
            }}
          />
          <div className="main-content">
            <AdminNavbar
              {...props}
              brandText={getBrandText(props.location.pathname)}
            />
            <Switch>
              {getRoutes(getallroutes(props.Type))}
              {/* <Redirect from="*" to="/auth/login" /> */}
            </Switch>
            <Container fluid>
              {/* <AdminFooter /> */}
            </Container>
          </div>
        </> :
        <Loading />
      }
    </>
  );

}


const mapStateToProps = (state) => {
  return {
    Type: _.get(state, "UserDetails.Type", "Anon"),
    isLoggedIn: _.get(state, "isLoggedIn", false),
    UserDetailsLoading: _.get(state, "UserDetailsLoading", false)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    getUserDetails: (UserID) => dispatch(getUserDetails(UserID)),
    login: (u, p, a) => dispatch(login(u, p, a)),
    logout: () => dispatch(logout(false)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
