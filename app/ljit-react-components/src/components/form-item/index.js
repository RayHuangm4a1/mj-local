import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Form as AntdFrom, } from 'antd';
import { connectForm, } from '../form';
import cx from 'classnames';
import './style.styl';

export const ColumnTypeEnums = {
	LARGE: 'large',
	MEDIUM: 'medium',
	SMALL: 'small',
};

const {
	LARGE,
	MEDIUM,
	SMALL,
} = ColumnTypeEnums;

export const ColumnEnums = {
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

const propTypes = {
	itemName: PropTypes.string.isRequired,
	itemConfig: PropTypes.shape({
		initialValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array,
			PropTypes.number,
		]),
		rules: PropTypes.array,
	}),
	form: PropTypes.object.isRequired,
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
	groupItemNames: PropTypes.arrayOf(PropTypes.string),
	groupItemConfigs: PropTypes.objectOf(
		PropTypes.shape({
			initialValue: PropTypes.string,
			rules: PropTypes.array,
		})
	),
	isInputGroup: PropTypes.bool,
	extraMessage: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
};

const defaultProps = {
	itemName: '',
	columnType: '',
	noMargin: false,
	itemConfig: {},
	groupItemNames: [],
	groupItemConfigs: {},
	isInputGroup: false,
};

class FormItem extends Component {
	constructor(props) {
		super(props);

		this._renderSingleInput = this._renderSingleInput.bind(this);
		this._renderGroupInput = this._renderGroupInput.bind(this);
	}
	_renderSingleInput() {
		const {
			itemName,
			itemConfig,
			children,
			form,
		} = this.props;

		return (
			form.getFieldDecorator(itemName, itemConfig)(children)
		);
	}
	_renderGroupInput() {
		const {
			children,
			form,
			groupItemNames,
			groupItemConfigs,
		} = this.props;

		let items = [];
		let nestedChildren;

		if (children.props) {
			nestedChildren = children.props.children;
		}
		if (nestedChildren) {
			items = groupItemNames.map((name, i) => {
				return form.getFieldDecorator(name, groupItemConfigs[name])(nestedChildren[i]);
			});
		}

		const updatedChildren = React.cloneElement(children, {
			children: items,
		});

		return updatedChildren;
	}

	render() {
		const {
			label,
			noMargin,
			columnType,
			labelColon,
			labelRequired,
			className,
			style,
			isInputGroup,
			extraMessage,
		} = this.props;
		const { _renderSingleInput, _renderGroupInput, } = this;
		const columnEnum = ColumnEnums[columnType] || {};

		return (
			<AntdFrom.Item
				label={label}
				labelCol={columnEnum.labelCol}
				colon={labelColon}
				wrapperCol={columnEnum.wrapperCol}
				required={labelRequired}
				className={cx('ljit-form-label', {
					'ljit-form-label--no-margin': noMargin,
				}, className)}
				style={style}
				extra={extraMessage}
			>
				{isInputGroup ? _renderGroupInput() : _renderSingleInput() }
			</AntdFrom.Item>
		);
	}
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

const WrapperFormItem = connectForm(FormItem);

WrapperFormItem.ColumnTypeEnums = ColumnTypeEnums;
WrapperFormItem.ColumnEnums = ColumnEnums;

export default WrapperFormItem;
