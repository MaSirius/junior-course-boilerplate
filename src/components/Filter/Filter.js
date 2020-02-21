import React from 'react';
import PropTypes from 'prop-types';
import {toInt} from 'csssr-school-utils';

import styles from './Filter.module.css';
import logRender from '../../components/LogRender/LogRender';

class Filter extends logRender {
	constructor(props) {
		super(props);

		this.min = this.props.minPrice;
		this.max = this.props.maxPrice;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput(event) {
		if (event.target.name == 'minPrice') this.min = event.target.value;
		if (event.target.name == 'maxPrice') this.max = event.target.value;
		
		this.props.setDisabled(event.target.value);
	}
	handleSubmit(event) {
		event.preventDefault(event.target.value);
		this.props.changeState(this.min, this.max);
	}
	render() {
		return (
			<div className={styles.filter}>
				<h1 className={styles.filter__title}>Цена</h1>
				<form onSubmit={this.handleSubmit}>
					<label className={styles.filter__label}>
						от 
						<input 
							name='minPrice'
							type='text' 
							className={styles.filter__input}
							defaultValue={toInt(this.props.minPrice)} 
							onInput={this.handleInput}
						/> 
					</label>
					<label className={styles.filter__label}>
						до  
						<input
							name='maxPrice'
							type='text' 
							className={styles.filter__input}
							defaultValue={toInt(this.props.maxPrice)} 
							onInput={this.handleInput}
						/> 
					</label>
					<input 
						type="submit" 
						value="Применить"
						className={styles.filter__submit} 
						disabled={this.props.inputDisabled}
						onSubmit={this.handleSubmit}
					/>
				</form>
			</div>
		);
	}
}

export default Filter;