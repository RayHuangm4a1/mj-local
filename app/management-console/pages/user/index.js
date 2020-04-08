import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import BasicForm from './basic-form';
import ChangePasswordForm from './change-password-form';
import BindGoogleForm from './bind-google-form';
import './style.styl';

const propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string,
		nickname: PropTypes.string,
		greetings: PropTypes.string,
	}),
};
const defaultProps = {};

class UserPage extends Component {
	constructor() {
		super();
		this.handleBasicFormSubmit = this.handleBasicFormSubmit.bind(this);
		this.handleChangePasswordFormSubmit = this.handleChangePasswordFormSubmit.bind(this);
		this.handleBindGoogleFormSubmit = this.handleBindGoogleFormSubmit.bind(this);
	}

	handleBasicFormSubmit(data) {
		// TODO call api
	}

	handleChangePasswordFormSubmit(data) {
		// TODO call api
	}

	handleBindGoogleFormSubmit(data) {
		// TODO call api
	}

	render() {
		const {
			user = {
				username: 'user1',
			},
			nickname = '澳大利亞當山德勒',
			greetings = '哈囉你好嗎衷心感謝珍重再見期待再相逢',
		} = this.props;

		return (
			<div className="user-page">
				<BasicForm
					username={user.username}
					initialValues={{
						nickname,
						greetings,
					}}
					onSubmit={this.handleBasicFormSubmit}
				/>
				<ChangePasswordForm
					onSubmit={this.handleChangePasswordFormSubmit}
				/>
				<BindGoogleForm
					onSubmit={this.handleBindGoogleFormSubmit}
				/>
			</div>
		);
	}
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default UserPage;
