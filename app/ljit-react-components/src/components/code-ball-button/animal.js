import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AnimalBall from '../code-ball/animal';
import './style.styl';

const {
	SizeEnums,
} = AnimalBall;
const propTypes = {
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	size: PropTypes.oneOf(Object.values(SizeEnums).concat('')),
	className: PropTypes.string,
	style: PropTypes.object,
	isSelected: PropTypes.bool,
	onChange: PropTypes.func,
};
const defaultProps = {
	text: '',
	size: SizeEnums.BIG_32,
	isSelected: false,
	onChange: () => {},
};

class Animal extends Component {
	constructor(props) {
		super(props);

		this._handleClickBall = this._handleClickBall.bind(this);
	}

	_handleClickBall() {
		const { text, onChange, } = this.props;

		onChange(text);
	}

	render() {
		const {
			className,
			style,
			text,
			size,
		} = this.props;
		const { _handleClickBall, } = this;

		return (
			<div
				className={cx('ljit-code-ball-button ljit-code-ball-button--animal', className)}
				onClick={_handleClickBall}
			>
				<AnimalBall
					text={text}
					size={size}
					style={style}
				/>
			</div>
		);
	}
}

Animal.propTypes = propTypes;
Animal.defaultProps = defaultProps;
Animal.SizeEnums = SizeEnums;

export default Animal;
