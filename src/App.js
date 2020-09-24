import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import { createStructuredSelector } from "reselect";
import HomePage from "./components/pages/homepage/homepage.component";
import ShopPage from "./components/pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import Header from "./components/header/header.component.jsx";
import CheckoutPage from "./components/pages/checkout/checkout.component";

import {
  auth,
  createUserProfileDocument

} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

// const HatsPage = () => (
//   <div>
//     <h1>hats page</h1>
//   </div>
// ) Example of linking and routing

//switch will match / first and not render anything else. the moment it sees something that matches, it will stop rendering the rest
//switch is useful because it gives us more control over code. not accidentaly render something we don;t want to.

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null,
  //   };
  // }      !!!! constructor, super and state no longer needed because we used redux

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot.data())
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
      // addCollectionAndDocuments("collections", collectionArray.map(({title, items}) => ({title,items})));
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
        <Header
        // currentUser={this.state.currentUser}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
