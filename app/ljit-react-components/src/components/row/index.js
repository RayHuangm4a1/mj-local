import React, { Component, } from 'react';
import { Row as AntdRow, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AlignEnums = {
	TOP: 'top',
	MIDDLE: 'middle',
	BOTTOM: 'bottom',
};

const { TOP, MIDDLE, BOTTOM, } = AlignEnums;

const FlexJustifyEnums = {
	START: 'start',
	END: 'end',
	CENTER: 'center',
	SPACE_AROUND: 'space-around',
	SPACE_BETWEEN: 'space-between',
};

const { START, END, CENTER, SPACE_AROUND, SPACE_BETWEEN, } = FlexJustifyEnums;

const TypeEnums = {
	FLEX: 'flex',
};

const propTypes = {
	align: PropTypes.oneOf([
		TOP,
		MIDDLE,
		BOTTOM,
		'',
	]),
	gutter: PropTypes.number,
	flexLayout: PropTypes.oneOf([
		START,
		END,
		CENTER,
		SPACE_AROUND,
		SPACE_BETWEEN,
		'',
	]),
	type: PropTypes.oneOf([
		TypeEnums.FLEX,
		'',
	]),
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

class Row extends Component {
	render() {
		const {
			align,
			gutter,
			flexLayout,
			type,
			className,
			children,
		} = this.props;

		return (
			<AntdRow
				align={align}
				gutter={gutter}
				justify={flexLayout}
				type={type}
				className={cx('ljit-row' , className)}
			>
				{children}
			</AntdRow>
		);
	}
}

Row.propTypes = propTypes;
Row.AlignEnums = AlignEnums;
Row.FlexJustifyEnums = FlexJustifyEnums;
Row.TypeEnums = TypeEnums;

export default Row;
