import React, { Component } from "react";
import "./App.css";
import ProductList from "./components/product-list";
import Cart from "./components/cart";
import "h8k-components";

const title = "HackerShop";

class App extends Component {
  constructor() {
    super();
    const products = [...PRODUCTS].map((product, index) => {
      product.cartQuantity = 0;
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;

      return product;
    });
    this.state = {
      cart: {
        items: [],
        subTotal: 0,
        totalPrice: 0,
        discount: 0,
        selectedCoupon: "0",
      },
      products,
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  addToCart= (index)=> {
    const products = this.state.products;
    products[index].cartQuantity = 1;
    let cart = { ...this.state.cart };
    cart.items.push({
      id: products[index].id,
      price: products[index].price,
      item: products[index].heading,
      quantity: 1,
    });
    cart.subTotal = cart.subTotal +products[index].price;
    cart.totalPrice = cart.subTotal -cart.discount
    console.log(cart)
    this.setState({
      products,
      cart,
    });
  };

  removeFromCart(index) {
    const products = this.state.products;
    products[index].cartQuantity = 0;
    let cart = { ...this.state.cart };
    let cartIndex = this.state.cart.items.findIndex(
      (item) => item.id === products[index].id
    );
    cart.items.splice(cartIndex, 1);
    cart.subTotal = cart.subTotal -products[index].price;
    cart.totalPrice = cart.subTotal -cart.discount
    this.setState({
      cart,
      products,
    });
  }

  discountCart = (e) =>{
    const products = this.state.products;
    let cart = { ...this.state.cart };
    if (e.target.value ==='10'){
      cart.discount = this.state.cart.subTotal * 10/100
      cart.totalPrice = cart.subTotal -cart.discount
      this.setState({
        products,
        cart
      })
    }else if (e.target.value ==='20'){
      cart.discount = this.state.cart.subTotal * 20/100
      cart.totalPrice = cart.subTotal -cart.discount
      this.setState({
        products,
        cart
      })
    }else{
      cart.discount = 0
      cart.totalPrice = cart.subTotal -cart.discount
      this.setState({
        products,
        cart
      })
    }
  }

  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <div className="layout-row shop-component">
          <ProductList products={this.state.products} addToCart={this.addToCart}  removeFromCart= {this.removeFromCart}/>
          <Cart cart={this.state.cart} discountCart={this.discountCart} />
        </div>
      </div>
    );
  }
}

export const PRODUCTS = [
  {
    heading: "Cap - $10",
    name: "Cap",
    price: 10,
  },
  {
    heading: "Hand Bag - $30",
    name: "HandBag",
    price: 30,
  },
  {
    heading: "Shirt - $30",
    name: "Shirt",
    price: 30,
  },
  {
    heading: "Shoes - $50",
    name: "Shoe",
    price: 50,
  },
  {
    heading: "Pant - $40",
    name: "Pant",
    price: 40,
  },
  {
    heading: "Slipper - $20",
    name: "Slipper",
    price: 20,
  },
];
export default App;
