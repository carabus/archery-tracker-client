import React, { Component } from "react";
import { socialLogin } from "../../actions/auth";

export default class FacebookLogin extends Component {
  componentDidMount() {
    document.addEventListener("FBObjectReady", this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener("FBObjectReady", this.initializeFacebookLogin);
  }

  /**
   * Init FB object and check Facebook Login status
   */
  initializeFacebookLogin = () => {
    this.FB = window.FB;
    this.checkLoginStatus();
  };

  /**
   * Check login status
   */
  checkLoginStatus = () => {
    this.FB.getLoginStatus(this.facebookLoginHandler);
  };

  /**
   * Check login status and call login api is user is not logged in
   */
  facebookLogin = () => {
    console.log("facebook login", window.FB);
    if (!window.FB) return;

    window.FB.getLoginStatus(response => {
      if (response.status === "connected") {
        this.facebookLoginHandler(response);
      } else {
        window.FB.login(this.facebookLoginHandler, { scope: "public_profile" });
      }
    });
  };

  /**
   * Handle login response
   */
  facebookLoginHandler = response => {
    if (response.status === "connected") {
      window.FB.api("/me", userData => {
        let result = {
          ...response,
          user: userData
        };
        console.log(userData);
        this.props.dispatch(socialLogin(userData.id));
        //this.props.onLogin(true, result);
      });
    } else {
      console.log("login failed");
      //this.props.onLogin(false);
    }
  };

  render() {
    //let { children } = this.props;
    return <div onClick={this.facebookLogin}>Facebook Login</div>;
  }
}