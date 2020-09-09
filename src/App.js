import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import HomePage from "./components/pages/homepage/homepage.component";
import ShopPage from "./components/pages/shop/shop.component.jsx";
import SignInAndSignIpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from "./components/header/header.component";

// const HatsPage = () => (
//   <div>
//     <h1>hats page</h1>
//   </div>
// ) Example of linking and routing

//switch will match / first and not render anything else. the moment it sees something that matches, it will stop rendering the rest
//switch is useful because it gives us more control over code. not accidentaly render something we don;t want to.
function App() {
  return (
    //by putting the header outside of the switch we can render it at all times no matter what.
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignIpPage} />
      </Switch>
    </div>
  );
}

export default App;
