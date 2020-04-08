import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Switch, ListItem, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { userProfileActions, } from '../../../../../controller';
import EditUserProfileFormModalButton from '../../../../../features/user-info-block/modal-buttons/edit-user-profile-form-modal-button';

const {
	updateUserZhuandianAction,
} = userProfileActions;
const propTypes = {
	isEnableDepositZhuandian: PropTypes.bool.isRequired,
	isEnableIncentiveZhuandian: PropTypes.bool.isRequired,
	updateUserZhuandianAction: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
};

class TransferableEditElement extends Component {
	constructor() {
		super();
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
		this._renderContent = this._renderContent.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}
	_handleSubmitForm({ isEnableIncentiveZhuandian, isEnableDepositZhuandian }) {
		const {
			updateUserZhuandianAction,
			userId,
		} = this.props;

		updateUserZhuandianAction(userId, isEnableIncentiveZhuandian, isEnableDepositZhuandian);
	}
	_renderFormBody() {
		const {
			isEnableDepositZhuandian,
			isEnableIncentiveZhuandian,
		} = this.props;

		return (
			<React.Fragment>
				<FormItem
					label="充值转点"
					itemName="isEnableDepositZhuandian"
					itemConfig={{
						initialValue: isEnableDepositZhuandian,
						valuePropName: 'checked'
					}}
				>
					<Switch/>
				</FormItem>
				<FormItem
					label="奖励转点"
					itemName="isEnableIncentiveZhuandian"
					itemConfig={{
						initialValue: isEnableIncentiveZhuandian,
						valuePropName: 'checked'
					}}
				>
					<Switch/>
				</FormItem>
			</React.Fragment>
		);
	}
	_renderContent() {
		const {
			isEnableDepositZhuandian,
			isEnableIncentiveZhuandian,
		} = this.props;

		const blockDepositTransferContent = isEnableDepositZhuandian ? '开启充值转点' : '关闭充值转点';
		const blockActivityTransferContent = isEnableIncentiveZhuandian ? '开启奖励转点' : '关闭奖励转点';

		return (
			<div style={{ whiteSpace: 'nowrap', }}>
				{blockDepositTransferContent}/
				{blockActivityTransferContent}
			</div>
		);
	}
	_renderOperation() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserProfileFormModalButton
				formTitle="转点设定"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
	render() {
		const { _renderContent, _renderOperation, } = this;

		return (
			<ListItem
				title="转点设定"
				content={_renderContent()}
				right={_renderOperation()}
			/>
		);
	}
}

TransferableEditElement.propTypes = propTypes;

function mapStateToProps(state) {
	const { profile: userProfile, } = state.userData;
	const statuses = userProfile.get('data').toObject().statuses || {};

	return {
		userId: userProfile.get('data').toObject().id,
		isEnableDepositZhuandian: statuses.isEnableDepositZhuandian,
		isEnableIncentiveZhuandian: statuses.isEnableIncentiveZhuandian,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserZhuandianAction: (userId, isEnableIncentiveZhuandian, isEnableDepositZhuandian) => dispatch(updateUserZhuandianAction(userId, isEnableIncentiveZhuandian, isEnableDepositZhuandian))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferableEditElement);
