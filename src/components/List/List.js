import React from 'react';
import PropTypes from 'prop-types';
import {toInt} from 'csssr-school-utils';

import ProductItem from 'csssr-school-product-card';
import logRender from '../../components/LogRender/LogRender';
import ratingComponent from '../RatingComponent/RatingComponent';

import styles from './List.module.css';

class List extends logRender {
	render() {
		return (
			<ul className={styles.goodsList} > {
				this.props.products
				.filter(item => 
					toInt(item.price) >= toInt(this.props.minPrice) && 
					toInt(item.price) <= toInt(this.props.maxPrice)
				)
				.map((item) => ( 
					<li className={styles.goodsList__item} key={item.id}>
						<ProductItem 
							isInStock={item.isInStock}
							img={item.img}
							title={item.title}
							price={item.price}
							subPriceContent={item.subPriceContent}
							maxRating={item.maxRating}
							rating={item.rating}
							ratingComponent={ratingComponent}
						/>
					</li>
				))} 
			</ul>
		);
	}
};

List.propTypes = {
	isInStock: PropTypes.bool,
	img: PropTypes.string,
	title: PropTypes.string,
	price: PropTypes.string,
	subPriceContent: PropTypes.string,
	maxRating: PropTypes.number,
	rating: PropTypes.number,
	ratingComponent: PropTypes.func,
};


export default List;