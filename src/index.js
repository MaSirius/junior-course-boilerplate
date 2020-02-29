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
			minPriceError: '',
			maxPriceError: '',
		}
	}
	setErrorMessage = (value, name) => {
		this.setState({ 
			[name + 'Error']: value
		});
	}
	errorСhecking = (priceValue, priceName, min, max) => {
		let val = Number(priceValue.replace(/\s+/g,''));
		
		min = Number(min.replace(/\s+/g,''));
		max = Number(max.replace(/\s+/g,''));

		if (isNaN(val)) { 
			this.setErrorMessage('Введите число', priceName);
		} else if (priceValue === '') { 
			this.setErrorMessage('Введите значение фильтра', priceName);
		} else if (val < 0) { 
			this.setErrorMessage('Введите положительное число', priceName);
		} else if (priceName === 'maxPrice' && val < min) {
			this.setErrorMessage('Максимальное значение фильтра меньше минимального', priceName);
		} else {
			if (priceName === 'minPrice') {
				(val > max) ? this.setErrorMessage('Максимальное значение фильтра меньше минимального', 'maxPrice') : this.setErrorMessage( '',  'maxPrice');
			}
			this.setErrorMessage( '', priceName);
		}
	}

	changeState = (min, max) => {
		if (this.state.minPriceError === '' && this.state.maxPriceError === '') {
			this.setState({ 
				minPrice: min,
				maxPrice: max,
			});
		}
	}
	render() {
		return (
			<React.Fragment>
				<Title>Список товаров</Title>
				<Filter 
					changeState = {this.changeState}
					errorСhecking = {this.errorСhecking}
					minPrice={this.state.minPrice}
					maxPrice={this.state.maxPrice}
					minPriceError={this.state.minPriceError}
					maxPriceError={this.state.maxPriceError}
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
