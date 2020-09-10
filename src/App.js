import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import HomePage from "./components/pages/homepage/homepage.component";
import ShopPage from "./components/pages/shop/shop.component.jsx";
import SignInAndSignIpPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import Header from "./components/header/header.component.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// const HatsPage = () => (
//   <div>
//     <h1>hats page</h1>
//   </div>
// ) Example of linking and routing

//switch will match / first and not render anything else. the moment it sees something that matches, it will stop rendering the rest
//switch is useful because it gives us more control over code. not accidentaly render something we don;t want to.

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot.data())
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          }, () => {
            console.log(this.state)
          });
        });
      }
      this.setState({ currentUser: userAuth });
      // createUserProfileDocument(user)
      // console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      //by putting the header outside of the switch we can render it at all times no matter what.
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignIpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
