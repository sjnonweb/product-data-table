import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockOnlyChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText}
          onChange={this.handleFilterChange}
        />
        <p>
          <input type="checkbox" checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
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
    this.props.products.forEach((product) => {
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if(product.category !== lastCategory) {
        row.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      row.push(<ProductRow product={product} key={product.name} />);
    });
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
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
    this.onInStockOnlyChange = this.onInStockOnlyChange.bind(this);
  }
  
  onFilterTextChange(filterText) {
    this.setState({
      filterText
    })
  }

  onInStockOnlyChange(inStockOnly) {
    this.setState({
      inStockOnly
    })
  }

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
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.onFilterTextChange}
          onInStockOnlyChange={this.onInStockOnlyChange}
        />
        <ProductTable
          products={PRODUCTS}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

export default App;
