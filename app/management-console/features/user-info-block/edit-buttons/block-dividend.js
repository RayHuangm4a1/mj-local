import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, RadioGroup, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { userProfileActions, } from '../../../controller';
import EditUserProfileFormModalButton from '../modal-buttons/edit-user-profile-form-modal-button';

const { enableUserDividendAction, disbleUserDividendAction, } = userProfileActions;

const propTypes = {
	userId: PropTypes.number,
	isDividendable: PropTypes.bool,
	enableUserDividendAction: PropTypes.func.isRequired,
	disbleUserDividendAction: PropTypes.func.isRequired,
};
const defaultProps = {
	userId: null,
	isDividendable: false,
};

class BlockDividendEditButton extends Component {
	constructor() {
		super();
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
	}

	_handleSubmitForm({ isDividendable: updatedIsDividendable, }) {
		const {
			userId,
			disbleUserDividendAction,
			enableUserDividendAction,
		} = this.props;

		if (updatedIsDividendable) {
			enableUserDividendAction(userId);
		} else {
			disbleUserDividendAction(userId);
		}
	}

	_renderFormBody() {
		const { isDividendable, } = this.props;

		return (
			<FormItem
				label="分红冻结"
				itemName="isDividendable"
				itemConfig={{ initialValue: isDividendable, }}
			>
				<RadioGroup options={[
					{ label: '未冻结', value: true, },
					{ label: '冻结', value: false, },
				]} />
			</FormItem>
		);
	}

	render() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserProfileFormModalButton
				formTitle="分红冻结"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
}

BlockDividendEditButton.propTypes = propTypes;
BlockDividendEditButton.defaultProps = defaultProps;

function mapStateToProps(state) {
	const userProfileData = state.userData.profile.get('data').toObject();
	const { id: userId, statuses = {}, } = userProfileData;
	const { isDividendable,  } = statuses;

	return {
		userId,
		isDividendable,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableUserDividendAction: (userId) => dispatch(enableUserDividendAction(userId)),
		disbleUserDividendAction: (userId) => dispatch(disbleUserDividendAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockDividendEditButton);
