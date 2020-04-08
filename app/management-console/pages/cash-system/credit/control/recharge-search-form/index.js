import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CollapsableForm, } from 'ljit-react-components';
import {
	FormTypeEnum,
	FieldsMap,
	FieldNameGroupMap,
} from './utils';

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;

const propTypes = {
	formType: PropTypes.oneOf([
		FormTypeEnum.BANK,
		FormTypeEnum.SHOPPING,
		FormTypeEnum.PAYMENT_TRANSFER,
	]).isRequired,
	form: PropTypes.object,
	onSearch: PropTypes.func,
	collapseLimit: PropTypes.number,
};
const defaultProps = {
	onSearch: () => {},
	collapseLimit: 2,
};

class RechargeSearchForm extends Component {
	constructor() {
		super();
		this.state = {
			expand: true,
		};
		this._handleSubmitClick = this._handleSubmitClick.bind(this);
		this._handleCancelClick = this._handleCancelClick.bind(this);
		this._getCollapseFieldNames = this._getCollapseFieldNames.bind(this);
		this._getExpandFieldNames = this._getExpandFieldNames.bind(this);
		this._renderField = this._renderField.bind(this);
		this._renderFields = this._renderFields.bind(this);
	}

	_handleSubmitClick() {
		const form = this.collapsableFormInstance.getForm();
		const { onSearch, } = this.props;

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSearch(values);
			}
		});
	}

	_handleCancelClick() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
	}

	_getCollapseFieldNames() {
		const { formType, collapseLimit, } = this.props;
		const fieldNames = mappingFieldNameGroup(formType);

		return fieldNames.slice(0, collapseLimit);
	}
	_getExpandFieldNames() {
		const { formType, } = this.props;
		const fieldNames = mappingFieldNameGroup(formType);

		return fieldNames;
	}

	_renderField(fieldName = '') {
		const Field = mappingFields(fieldName);

		return <Field {...this.props} />;
	}
	_renderFields(fieldNames = []) {
		return fieldNames
			.filter(checkFieldExistFromMap)
			.map(this._renderField);
	}

	render() {
		const { expand, } = this.state;
		const collapseFieldNames = this._getCollapseFieldNames();
		const expandFieldNames = this._getExpandFieldNames();

		return (
			<CollapsableForm
				expand={expand}
				onSubmit={this._handleSubmitClick}
				onCancel={this._handleCancelClick}
				submitText="查询"
				cancelText="重置"
				collapseType={CollapseTypeEnum.INSERTROW}
				columnSize={ColumnSizeEnums.SMALL}
				expandChildren={this._renderFields(expandFieldNames)}
				collapseChildren={this._renderFields(collapseFieldNames)}
				ref={(refForm) => this.collapsableFormInstance = refForm}
			/>
		);
	}
}

RechargeSearchForm.propTypes = propTypes;
RechargeSearchForm.defaultProps = defaultProps;
RechargeSearchForm.FormTypeEnum = FormTypeEnum;

function mappingFieldNameGroup(formType = '') {
	return FieldNameGroupMap[formType] || [];
}

function checkFieldExistFromMap(fieldName = '') {
	return typeof FieldsMap[fieldName] !== 'undefined';
}

function mappingFields(fieldName = '') {
	return FieldsMap[fieldName];
}

export default RechargeSearchForm;
