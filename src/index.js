import React from 'react';
import ReactDOM from 'react-dom';
import {maxBy, minBy} from 'csssr-school-utils';

import products from './products.json';

import Title from './components/Title/Title';
import List from './components/List/List';
import Filter from './components/Filter/Filter';

class App extends React.Component	{
	constructor(props) {
		super(props);
		
		this.state = {
			minPrice: minBy(obj => obj.price, products).price,
			maxPrice: maxBy(obj => obj.price, products).price,
			minPriceError: '',
			maxPriceError: '',
			inputDisabled: false
		}
	}
	setErrorMessage = (priceValue, priceName, min, max) => {
		let errorText = this.errorСhecking(priceValue, priceName, min, max);

		let minPriceError = (priceName === 'minPrice') ? errorText : this.state.minPriceError;
		let maxPriceError = (priceName === 'maxPrice') ? errorText : this.state.maxPriceError;

		this.setState({ 
			[priceName + 'Error']: errorText,
			inputDisabled: (minPriceError !== '' || maxPriceError !== '') ? true : false
		});

	}

	memoizer = (fn) => {
		let cache = {};
		return function (priceValue, priceName, min, max) {
			if (typeof cache[priceName] === 'undefined') cache[priceName] = {};
			if (typeof cache[priceName][priceValue] !== 'undefined') {
				if (cache[priceName][priceValue] === 'Максимальное значение фильтра меньше минимального') 
					cache[priceName][priceValue] = fn(priceValue, priceName, min, max);
				return cache[priceName][priceValue];
			}
			else { 
				cache[priceName][priceValue] = fn(priceValue, priceName, min, max);
				return cache[priceName][priceValue];
			}
		}
	}

	errorСhecking = this.memoizer((priceValue, priceName, min, max) => {
		let val = Number(priceValue.replace(/\s+/g,''));
		min = Number(min.replace(/\s+/g,''));
		max = Number(max.replace(/\s+/g,''));

		switch (true) {
			case (isNaN(val) || val < 0) :
				return 'Введите неотрицательное число';
			case (priceValue === '') : 
				return 'Введите значение фильтра';
			case ((priceName === 'maxPrice' && val < min) || (priceName === 'minPrice' && val > max)) :
				return 'Максимальное значение фильтра меньше минимального';
			default: 
				return '';
		}
	})

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
					setErrorMessage = {this.setErrorMessage}
					minPrice={this.state.minPrice}
					maxPrice={this.state.maxPrice}
					inputDisabled={this.state.inputDisabled}
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
