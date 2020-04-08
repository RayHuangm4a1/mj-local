import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

// TODO add color needed
const ColorEnums = {
	ORANGE: '#ff8113',
	WHITE: '#fff',
	GREY: '#dddbdb',
	BLACK: '#646464',
	BLUE: 'blue',
	GREEN: 'green',
	YELLOW: 'yellow',
};
const propTypes = {
	left: PropTypes.string,
	right: PropTypes.string,
	onClickLeft: PropTypes.func,
	onClickRight: PropTypes.func,
	activeBackgroundColor: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	activeColor: PropTypes.PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	inActiveBackgroundColor: PropTypes.PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	inActiveColor: PropTypes.PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	className: PropTypes.string,
	isLeftActive: PropTypes.bool,
};
const defaultProps = {
	onClickLeft: () => {},
	onClickRight: () => {},
	activeBackgroundColor: ColorEnums.ORANGE,
	activeColor: ColorEnums.WHITE,
	inActiveBackgroundColor: ColorEnums.GREY,
	inActiveColor: ColorEnums.BLACK,
	className: '',
	isLeftActive: true,
};

class Toggle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLeftActive: props.isLeftActive,
		};

		this._handleClickLeft = this._handleClickLeft.bind(this);
		this._handleClickRight = this._handleClickRight.bind(this);
	}
	_handleClickLeft() {
		const { onClickLeft, } = this.props;

		onClickLeft();
		this.setState({ isLeftActive: true, });
	}
	_handleClickRight() {
		const { onClickRight, } = this.props;

		onClickRight();
		this.setState({ isLeftActive: false, });
	}

	render() {
		const {
			left,
			right,
			activeBackgroundColor,
			activeColor,
			inActiveBackgroundColor,
			inActiveColor,
			className,
		} = this.props;
		const { isLeftActive, } = this.state;
		const { _handleClickLeft, _handleClickRight, } = this;
		const toggleBackground = `linear-gradient(to left, ${inActiveBackgroundColor} 50%, ${activeBackgroundColor} 50%)`;
		const itemBackground =  `linear-gradient(to right, ${inActiveBackgroundColor} 50%, ${activeBackgroundColor} 50%)`;
		const leftColor = isLeftActive ? activeColor : inActiveColor;
		const rightColor = isLeftActive ? inActiveColor : activeColor;

		return (
			<div
				className={cx('ljit-toggle', className, {
					['ljit-toggle--left-active']: isLeftActive,
				})}
				style={{ backgroundImage: toggleBackground, }}
			>
				<div
					onClick={_handleClickLeft}
					className={cx('ljit-toggle__item',{
						['ljit-toggle__item--left-active']: isLeftActive,
					})}
					style={{
						backgroundImage: itemBackground,
						color: leftColor,
					}}
				>
					{left}
				</div>
				<div
					onClick={_handleClickRight}
					className={cx('ljit-toggle__item',{
						['ljit-toggle__item--right-active']: !isLeftActive,
					})}
					style={{
						backgroundImage: itemBackground,
						color: rightColor,
					}}
				>
					{right}
				</div>
			</div>
		);
	}
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

Toggle.ColorEnums = ColorEnums;

export default Toggle;
