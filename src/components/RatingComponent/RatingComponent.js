import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './RatingComponent.module.css';

class RatingComponent extends React.Component {
	render() {
		return <div className={cn(styles.star, {
			[styles.filled]: this.props.isFilled,
			[styles.empty]: !this.props.isFilled
		})}/>;
	}
};

RatingComponent.propTypes = {
	isFilled: PropTypes.bool
};

export default RatingComponent;