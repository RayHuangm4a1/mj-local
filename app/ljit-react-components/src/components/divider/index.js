import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Divider as AntDivider, } from 'antd';
import './style.styl';

const OrientationEnums = {
	LEFT: 'left',
	RIGHT: 'right',
	CENTER: 'center',
};
const {
	LEFT,
	RIGHT,
	CENTER,
} = OrientationEnums;
const DirectionTypeEnums = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
};
const {
	HORIZONTAL,
	VERTICAL,
} = DirectionTypeEnums;
const propTypes = {
	className: PropTypes.string,
	isDashed: PropTypes.bool,
	style: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	orientation: PropTypes.oneOf([
		LEFT,
		RIGHT,
		CENTER,
	]),
	type: PropTypes.oneOf([
		HORIZONTAL,
		VERTICAL,
	]),
};
const defaultProps = {
	className: '',
	children: '',
	isDashed: false,
	orientation: CENTER,
	style: {},
	type: HORIZONTAL,
};

class Divider extends Component {
	render() {
		const {
			className,
			isDashed,
			orientation,
			style,
			type,
			children,
		} = this.props;

		return (
			<AntDivider
				className={cx('ljit-divider', className)}
				dashed={isDashed}
				orientation={orientation}
				style={style}
				type={type}
			>
				{children}
			</AntDivider>
		);
	}
}

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider.OrientationEnums = OrientationEnums;
Divider.DirectionTypeEnums = DirectionTypeEnums;

export default Divider;