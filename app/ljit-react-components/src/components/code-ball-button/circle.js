import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CircleBall from '../code-ball/circle';
import './style.styl';

const {
	SizeEnum,
	FontSizeEnum,
	StatusTypeEnum,
} = CircleBall;

const propTypes = {
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	size: PropTypes.oneOf(Object.values(SizeEnum).concat('')),
	fontSize: PropTypes.oneOf(Object.values(FontSizeEnum).concat('')),
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

class Circle extends Component {
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
			isSelected,
		} = this.props;
		const { _handleClickBall, } = this;

		return (
			<div
				className={cx('ljit-code-ball-button ljit-code-ball-button--circle', className)}
				onClick={_handleClickBall}
			>
				<CircleBall
					text={text}
					type={isSelected ? StatusTypeEnum.SELECTED : StatusTypeEnum.PRIMARY}
					size={size}
					fontSize={fontSize}
				/>
			</div>
		);
	}
}

Circle.propTypes = propTypes;
Circle.defaultProps = defaultProps;

Circle.SizeEnum = SizeEnum;
Circle.FontSizeEnum = FontSizeEnum;

export default Circle;
