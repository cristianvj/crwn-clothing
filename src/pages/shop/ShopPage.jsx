import React, { Component } from 'react';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';
import SHOP_DATA from './shopData';

class ShopPage extends Component {
  constructor(props){
    super(props)
    this.state={
      collections: SHOP_DATA
    }
  }
  render() {
    return (
      <div className="shop-page">
        {
          this.state.collections.map( ({ id, ...otherCollectionProps }) => (
            <CollectionPreview key = { id } { ...otherCollectionProps } />
          ))
        }
      </div>
    );
  }
}

export default ShopPage;
