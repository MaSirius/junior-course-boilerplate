import React from 'react';
import ReactDOM from 'react-dom';
import {maxBy, minBy} from 'csssr-school-utils';

import products from './products.json';

import Title from './components/Title/Title';
import List from './components/List/List';
import Filter from './components/Filter/Filter';

class App extends React.Component  {
	constructor(props) {
  		super(props);
  		this.state = {
  			minPrice: minBy(obj => obj.price, products).price,
  			maxPrice: maxBy(obj => obj.price, products).price, 
  		}
  	}
	changeState = (min, max) => {
		this.setState({ 
			minPrice: min,
			maxPrice: max,
		});
	}
  	render() {
		return (
		  	<React.Fragment>
	    		<Title>Список товаров</Title>
	    		<Filter 
	    			changeState = {this.changeState}
	    			minPrice={this.state.minPrice}
	    			maxPrice={this.state.maxPrice}
	    		/>
	      		<List 
	      			products={products} 
              		minPrice={this.state.minPrice}
              		maxPrice={this.state.maxPrice}
            	/>
	    	</React.Fragment>
		);
	};
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
 );
