import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import RectangleBall from '../code-ball/rectangle';
import './style.styl';

const {
	SizeEnum,
	FontSizeEnum,
	StatusTypeEnum,
	BorderRadiusEnum,
} = RectangleBall;

const propTypes = {
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	size: PropTypes.oneOf(Object.values(SizeEnum).concat('')),
	fontSize: PropTypes.oneOf(Object.values(FontSizeEnum).concat('')),
	borderRadius: PropTypes.oneOf(Object.values(BorderRadiusEnum).concat('')),
	className: PropTypes.string,
	isSelected: PropTypes.bool,
	onChange: PropTypes.func,
};
const defaultProps = {
	text: '',
	size: SizeEnum.MIDDLE,
	fontSize: FontSizeEnum.MIDDLE,
	isSelected: false,
	onChange: () => {},
};

class Rectangle extends Component {
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
			text,
			size,
			fontSize,
			borderRadius,
			isSelected,
		} = this.props;
		const { _handleClickBall, } = this;

		return (
			<div
				className={cx('ljit-code-ball-button ljit-code-ball-button--rectangle', className)}
				onClick={_handleClickBall}
			>
				<RectangleBall
					text={text}
					type={isSelected ? StatusTypeEnum.SELECTED : StatusTypeEnum.PRIMARY}
					size={size}
					fontSize={fontSize}
					borderRadius={borderRadius}
				/>
			</div>
		);
	}
}

Rectangle.propTypes = propTypes;
Rectangle.defaultProps = defaultProps;

Rectangle.SizeEnum = SizeEnum;
Rectangle.FontSizeEnum = FontSizeEnum;
Rectangle.BorderRadiusEnum = BorderRadiusEnum;

export default Rectangle;
