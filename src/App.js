import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

class SearchBar extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class ProductCategoryRow extends Component {
  render() {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    );
  }
}

class ProductRow extends Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}


class ProductTable extends Component {
  render() {
    var row = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if(product.category !== lastCategory) {
        row.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      row.push(<ProductRow product={product} key={product.name} />);
    })
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {row}
        </tbody>
      </table>
    );
  }
}


class App extends Component {
  render() {
    var PRODUCTS = [
      { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
      { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
      { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
      { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
      { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
      { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
    ];
    return (
      <div className="App">
        <SearchBar />
        <ProductTable products={PRODUCTS}/>
      </div>
    );
  }
}

export default App;
