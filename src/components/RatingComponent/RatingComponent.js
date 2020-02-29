import React from 'react';
import PropTypes from 'prop-types';
import styles from './RatingComponent.module.css';

class RatingComponent extends React.Component {
	render() {
		return <div className={`${styles.star} ${(this.props.isFilled) ? styles.filled : styles.empty}`}/>;
	}
};

RatingComponent.propTypes = {
	isFilled: PropTypes.bool
};

export default RatingComponent;