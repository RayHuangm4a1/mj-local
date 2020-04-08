import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Button,
} from 'ljit-react-components';

const propTypes = {
	onSubmit: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
};

class SearchMemberForm extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const { onSubmit } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, { username }) => {
			if (!error) {
				onSubmit(username);
			}
		});
	}

	render() {
		const { _handleSubmit } = this;

		return (
			<div className="search-member-form">
				<Form
					ref={formRef => this.formInstance = formRef}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						label="會員帐号："
						itemName="username"
						itemConfig={{
							initialValue: '',
						}}
					>
						<Input placeholder="请输入帐号" />
					</FormItem>
					<Button
						onClick={_handleSubmit}
					>
						查询
					</Button>
				</Form>
			</div>
		);
	}
}

SearchMemberForm.propTypes = propTypes;
SearchMemberForm.defaultProps = defaultProps;

export default SearchMemberForm;
