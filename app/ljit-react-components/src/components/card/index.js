import React, { Component, } from 'react';
import { Card as AntdCard, } from 'antd';
import cx from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
};
const defaultProps = {
	className: '',
	children: '',
};

class Card extends Component {
	render() {
		const { className, children, } = this.props;

		return (
			<AntdCard
				className={cx('ljit-card-border', className)}
			>
				{children}
			</AntdCard>
		);
	}
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;