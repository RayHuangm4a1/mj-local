import { Form as AntdForm, Row, Col, Button, } from 'antd';
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const formItemLayout = {
	wrapperCol: {
		span: 10,
		offset: 0,
	},
};

const FormContext = React.createContext({});

const propTypes = {
	submitText: PropTypes.string,
	cancelText: PropTypes.string,
	isSubmitDisabled: PropTypes.bool,
	isCancelDisabled: PropTypes.bool,
	submitButtonDisabled: PropTypes.bool,
	cancelButtonDisabled: PropTypes.bool,
	footer:  PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	children: PropTypes.node,
	form: PropTypes.object,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	onChange: PropTypes.func,
};

const defaultProps = {
	submitText: '确认',
	cancelText: '取消',
	isSubmitDisabled: false,
	isCancelDisabled: false,
	submitButtonDisabled: false,
	cancelButtonDisabled: false,
	onSubmit: () => {},
	onCancel: () => {},
	onChange: () => {},
};

class Form extends Component {
	constructor() {
		super();

		this._renderOperatingButtonsRow = this._renderOperatingButtonsRow.bind(this);
		this._renderOperatingButtons = this._renderOperatingButtons.bind(this);
	}
	getForm() {
		return this.props.form;
	}
	_renderOperatingButtonsRow() {
		return (
			<Row className="ljit-form-button-row" type="flex" align="top" justify="start">
				<Col span={8} offset={16} key="buttons" className="ljit-form-col" style={{ textAlign: 'right', }}>
					{this._renderOperatingButtons()}
				</Col>
			</Row>
		);
	}
	_renderOperatingButtons() {
		const {
			submitText,
			cancelText,
			footer,
			onSubmit,
			onCancel,
			isSubmitDisabled,
			isCancelDisabled,
			submitButtonDisabled,
			cancelButtonDisabled, } = this.props;
		const buttons = [];

		if (!submitButtonDisabled) {
			buttons.push(<Button className="ljit-form-search-btn"
				key="search-btn"
				type="primary"
				htmlType="submit"
				disabled={isSubmitDisabled}
				onClick={onSubmit}>
				{submitText}
			</Button>);
		}

		if (!cancelButtonDisabled) {
			buttons.push(<Button className="ljit-form-reset-btn"
				key="reset-btn"
				disabled={isCancelDisabled}
				onClick={onCancel}>
				{cancelText}
			</Button>);
		}

		return (
			<AntdForm.Item style={formItemLayout}>
				{footer}
				{buttons}
			</AntdForm.Item>
		);
	}
	render() {
		const { children, form, submitButtonDisabled, cancelButtonDisabled, } = this.props;

		return (
			<FormContext.Provider value={form}>
				<AntdForm className="ljit-form">
					{children}
					{!submitButtonDisabled || !cancelButtonDisabled ? this._renderOperatingButtonsRow() : null}
				</AntdForm>
			</FormContext.Provider>

		);
	}
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

const WrappedForm = AntdForm.create({
	onValuesChange(props, changedValues, allValues) {
		const { onChange, } = props;

		if (typeof onChange === 'function') {
			onChange(allValues);
		}
	},
})(Form);

export default WrappedForm;

export function connectForm(WrappedComponent) {
	return class ConnectedFormComponents extends  Component {
		render() {
			return (
				<FormContext.Consumer>
					{(form) => (
						<WrappedComponent
							{...this.props}
							form={form}
						/>
					)}
				</FormContext.Consumer>
			);
		}
	};
}
