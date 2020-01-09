import React from 'react';
import PropTypes from 'prop-types';
import {toInt} from 'csssr-school-utils';

import styles from './Filter.module.css';
import logRender from '../../components/LogRender/LogRender';

class Filter extends logRender {
	constructor({props}) {
		super(props);
		
		this.minInput = React.createRef();
		this.maxInput = React.createRef();

	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleInput = this.handleInput.bind(this);
	    this.submit = React.createRef();
	}
	handleSubmit(event) {
    	event.preventDefault();
    	this.props.changeState(this.minInput.current.value, this.maxInput.current.value);
	}
	handleInput(event) {
		let val = Number(event.target.value.replace(/\s+/g,''));
		(val < 0 || isNaN(val)) ? this.submit.current.disabled = true : this.submit.current.disabled = false;
	}
	render() {
		return (
			<div className={styles.filter}>
				<h1 className={styles.filter__title}>Цена</h1>
				<form onSubmit={this.handleSubmit}>
					<label className={styles.filter__label}>
						от 
						<input 
							type='text' 
							className={styles.filter__input}
							defaultValue={toInt(this.props.minPrice)} 
							ref={this.minInput} 
							onInput={this.handleInput}
						/> 
					</label>
					<label className={styles.filter__label}>
						до  
						<input
							type='text' 
							className={styles.filter__input}
							defaultValue={toInt(this.props.maxPrice)} 
							ref={this.maxInput} 
							onInput={this.handleInput}
						/> 
					</label>
					<input 
						type="submit" 
						value="Применить"
						className={styles.filter__submit} 
						ref={this.submit}
					/>
				</form>
			</div>
		);
	}
}


export default Filter;