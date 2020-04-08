import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Select, ListItem, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { userProfileActions, } from '../../../../../controller';
import { UserTypeEnum, } from '../../../../../lib/enums';
import EditUserProfileFormModalButton from '../../../../../features/user-info-block/modal-buttons/edit-user-profile-form-modal-button';

const {
	updateUserTypeAction,
} = userProfileActions;
const {
	ZHAOSHANG,
	AGENT,
	MEMBER,
} = UserTypeEnum;
const TypeTextMap = {
	[ZHAOSHANG]: '招商',
	[AGENT]: '代理',
	[MEMBER]: '会员',
};
// TODO selection 顯示招商 下拉選單不顯示
const typeOptions = [
	{
		value: ZHAOSHANG,
		label: TypeTextMap[ZHAOSHANG],
		disabled: false,
	},
	{
		value: AGENT,
		label: TypeTextMap[AGENT],
	},
	{
		value: MEMBER,
		label: TypeTextMap[MEMBER],
	}
];

const propTypes = {
	type: PropTypes.oneOf([AGENT, MEMBER,ZHAOSHANG,]),
	updateUserTypeAction: PropTypes.func.isRequired,
	userId: PropTypes.number,
};

class TypeEditElement extends Component {
	constructor() {
		super();
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}

	_handleSubmitForm({ type }) {
		const {
			updateUserTypeAction,
			userId,
		} = this.props;

		updateUserTypeAction(userId, type);
	}
	_renderFormBody() {
		const { type, } = this.props;

		return (
			<FormItem
				label="类型"
				itemName="type"
				style={{ display: 'flex', marginBottom: 0, }}
				itemConfig={{ initialValue: type, }}
			>
				<Select
					options={typeOptions}
					style={{ width: '150px' }}
				/>
			</FormItem>
		);
	}
	_renderOperation() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserProfileFormModalButton
				formTitle="类型"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
	render() {
		const { type, } = this.props;
		const { _renderOperation, } = this;

		return (
			<ListItem
				title="类型"
				content={TypeTextMap[type]}
				right={_renderOperation()}
			/>
		);
	}
}

TypeEditElement.propTypes = propTypes;

function mapStateToProps(state) {
	const { profile: userProfile, } = state.userData;

	return {
		userId: userProfile.get('data').toObject().id,
		type: userProfile.get('data').toObject().type,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserTypeAction: (userId, type) => dispatch(updateUserTypeAction(userId, type))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeEditElement);
