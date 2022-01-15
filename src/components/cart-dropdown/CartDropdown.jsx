import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { Link } from 'react-router-dom'

import CustomButton from '../custom-button/CustomButton';
import CartItem from '../cart-item/CartItem';

import './cartDropDown.scss';

const CartDropdown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        !cartItems.length ?
          <span className='empty-message'>Your cart is ampty</span>
        :
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      }
    </div>
    <Link to='/checkout'>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </Link>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);