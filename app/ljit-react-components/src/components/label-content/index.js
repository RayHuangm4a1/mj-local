import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Form as AntdFrom, } from 'antd';
import cx from 'classnames';
import './style.styl';

const ColumnTypeEnums = {
	LARGE: 'large',
	MEDIUM: 'medium',
	SMALL: 'small',
};

const {
	LARGE,
	MEDIUM,
	SMALL,
} = ColumnTypeEnums;

const ColumnEnums = {
	[LARGE]: {
		labelCol: {
			xs: { span: 24, },
			sm: { span: 9, },
		},
		wrapperCol: {
			xs: { span: 24, },
			sm: { span: 15, },
		},
	},
	[MEDIUM]: {
		labelCol: {
			xs: { span: 24, },
			sm: { span: 6, },
		},
		wrapperCol: {
			xs: { span: 24, },
			sm: { span: 18, },
		},
	},
	[SMALL]: {
		labelCol: {
			xs: { span: 24, },
			sm: { span: 4, },
		},
		wrapperCol: {
			xs: { span: 24, },
			sm: { span: 20, },
		},
	},
};

const ValidateStatusEnums = {
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error',
	VALIDATING: 'validating',
};

const {
	SUCCESS,
	WARNING,
	ERROR,
	VALIDATING,
} = ValidateStatusEnums;

const propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	columnType: PropTypes.oneOf([
		LARGE,
		MEDIUM,
		SMALL,
		'',
	]),
	labelColon: PropTypes.bool,
	labelRequired: PropTypes.bool,
	children: PropTypes.any,
	className: PropTypes.string,
	noMargin: PropTypes.bool,
	style: PropTypes.object,
	extraMessage: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	validateStatus: PropTypes.oneOf([
		SUCCESS,
		WARNING,
		ERROR,
		VALIDATING,
		'',
	]),
	helpMessage: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	hasFeedback: PropTypes.bool,
};

const defaultProps = {
	columnType: '',
	noMargin: false,
	hasFeedback: false,
};

class LabelContent extends Component {
	render() {
		const {
			label,
			noMargin,
			columnType,
			labelColon,
			labelRequired,
			className,
			style,
			children,
			extraMessage,
			validateStatus,
			hasFeedback,
			helpMessage,
		} = this.props;
		const columnEnum = ColumnEnums[columnType] || {};

		return (
			<AntdFrom.Item
				label={label}
				labelCol={columnEnum.labelCol}
				colon={labelColon}
				wrapperCol={columnEnum.wrapperCol}
				required={labelRequired}
				className={cx('ljit-label', {
					'ljit-label--no-margin': noMargin,
				}, className)}
				style={style}
				extra={extraMessage}
				validateStatus={validateStatus}
				hasFeedback={hasFeedback}
				help={helpMessage}
			>
				{children}
			</AntdFrom.Item>
		);
	}
}

LabelContent.propTypes = propTypes;
LabelContent.defaultProps = defaultProps;
LabelContent.ColumnTypeEnums = ColumnTypeEnums;
LabelContent.ColumnEnums = ColumnEnums;
LabelContent.ValidateStatusEnums = ValidateStatusEnums;

export default LabelContent;
