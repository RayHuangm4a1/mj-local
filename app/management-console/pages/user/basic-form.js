import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	LabelContent,
	FormItem,
	Input,
	Button,
} from 'ljit-react-components';
import FormBlock from './form-block';

const inputStyle = {
	width: 397,
};

const propTypes = {
	initialValues: PropTypes.shape({
		nickname: PropTypes.string,
		greetings: PropTypes.string,
	}),
	username: PropTypes.string,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	onSubmit: () => {},
};

class BasicForm extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((error, data) => {
			if (error) {
				return;
			}

			this.props.onSubmit(data);
		});
	}

	render() {
		const {
			initialValues,
			username,
		} = this.props;

		return (
			<FormBlock
				header="基本设定"
				footer={(
					<Button
						className="form-button"
						onClick={this._handleSubmit}
					>
						保存设置
					</Button>
				)}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<LabelContent
						className="form-item"
						label="帐号："
						columnType={LabelContent.ColumnTypeEnums.LARGE}
					>
						{username}
					</LabelContent>
					<FormItem
						className="form-item"
						label="昵称："
						itemName="nickname"
						itemConfig={{
							initialValue: initialValues.nickname,
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input
							style={inputStyle}
							placeholder="请输入昵称"
						/>
					</FormItem>
					<FormItem
						className="form-item"
						label="问候语："
						itemName="greetings"
						itemConfig={{
							initialValue: initialValues.greetings,
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input
							style={inputStyle}
							placeholder="请输入问候语"
						/>
					</FormItem>
				</Form>
			</FormBlock>
		);
	}
}

BasicForm.propTypes = propTypes;
BasicForm.defaultProps = defaultProps;

export default BasicForm;
