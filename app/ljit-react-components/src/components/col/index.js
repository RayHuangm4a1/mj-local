import React, { Component, } from 'react';
import { Col as AntdCol, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';


const propTypes = {
	offset: PropTypes.number,
	order: PropTypes.number,
	numberOfMoveToLeft: PropTypes.number,
	numberOfMoveToRight: PropTypes.number,
	span: PropTypes.number,
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	style: PropTypes.object,
};

class Col extends Component {
	render() {
		const {
			offset,
			order,
			numberOfMoveToLeft,
			numberOfMoveToRight,
			span,
			className,
			children,
			style,
		} = this.props;

		return (
			<AntdCol
				offset={offset}
				order={order}
				pull={numberOfMoveToLeft}
				push={numberOfMoveToRight}
				span={span}
				className={cx('ljit-col' , className)}
				style={style}
			>
				{children}
			</AntdCol>
		);
	}
}

Col.propTypes = propTypes;

export default Col;
