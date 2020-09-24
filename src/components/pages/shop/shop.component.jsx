import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../collections-overview/collections-overview.component";

import CollectionPage from "../collection/collection.component";

import {
  firestore,
  convertCollectionsSnapShotToMap,
} from "../../../firebase/firebase.utils";

import {connect} from 'react-redux'
import { updateCollections } from "./shop.actions";

class ShopPage extends React.Component {
  unsubscribeFromSnapShop = null;

  componentDidMount() {
    const {updateCollections} = this.props
    const collectionRef = firestore.collection("collections");

    this.unsubscribeFromSnapShop = collectionRef.onSnapShot(
      async (snapShot) => {
        const collectionsMap = convertCollectionsSnapShotToMap(snapShot);
        // console.log(collctionsMap)
        updateCollections(collectionsMap)
      }
    );
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
  } 
)

export default connect(null, mapDispatchToProps) (ShopPage);
