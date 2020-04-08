import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	LabelContent,
	FormItem,
	Button,
	Input,
} from 'ljit-react-components';

const propTypes = {
	searchText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	onSearch: PropTypes.func,
};
const defaultProps = {
	searchText: '查询',
	onSearch: () => {},
};

class PointChangeSearchForm extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit(event) {
		event.preventDefault();
		const {
			onSearch,
		} = this.props;
		const form = this.formInstance.getForm();

		return form.validateFields((error, data) => {
			if (!error) {
				onSearch(data);
			}
		});
	}

	render() {
		const {
			searchText,
		} = this.props;

		return (
			<Form
				onSubmit={this._handleSubmit}
				onCancel={this._handleReset}
				submitButtonDisabled
				cancelButtonDisabled
				ref={(formRef) => this.formInstance = formRef}
			>
				<FormItem
					noMargin
					label="帐号："
					className="member-log__item member-log__item--inline"
					itemName="username"
					itemConfig={{
						initialValue: '',
					}}
				>
					<Input
						placeholder="请输入帐号"
						style={{ width: 264 }}
					/>
				</FormItem>
				<LabelContent
					className="member-log__item member-log__item--inline"
				>
					<Button
						type="primary"
						htmlType="submit"
						onClick={this._handleSubmit}
					>
						{searchText}
					</Button>
				</LabelContent>
			</Form>
		);
	}
}

PointChangeSearchForm.propTypes = propTypes;
PointChangeSearchForm.defaultProps = defaultProps;

export default PointChangeSearchForm;
