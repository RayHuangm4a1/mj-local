import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Select,
	LabelContent,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import EditUserProfileFormModalButton from '../../modal-buttons/edit-user-profile-form-modal-button';
import { userProfileActions, } from '../../../../controller';
import { PlatformBonusPropTypes, } from '../../utils';
import "./style.styl";

const {
	updateUserBonusAction,
} = userProfileActions;

const propTypes = {
	userId: PropTypes.number,
	platformBonus: PlatformBonusPropTypes,
	userBonus: PropTypes.number,
	updateUserBonusAction: PropTypes.func.isRequired,
};

const getBonusOptions = (bonusList) => {
	if (bonusList.length) {
		return bonusList.map(bonus => ({ label: bonus, value: bonus, }));
	} else {
		return [];
	}
};

class BonusEditButton extends Component {
	constructor() {
		super();

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
	}

	_handleSubmitForm(values) {
		const {
			userId,
			updateUserBonusAction,
		} = this.props;
		const { bonus, } = values;

		updateUserBonusAction(userId, bonus);
	}

	_renderFormBody() {
		const {
			platformBonus,
			userBonus,
		} = this.props;
		const bonusList = platformBonus && platformBonus.list ? platformBonus.list : [];

		return (
			<React.Fragment>
				<FormItem
					label="奖金号"
					itemName="bonus"
					itemConfig={{ initialValue: userBonus, }}
				>
					<Select
						style={{ width: 180, }}
						options={getBonusOptions(bonusList)}
					/>
				</FormItem>
				<LabelContent
					label="注意事项"
					className="bouns-edit-button__remind-text"
				>
					若修改其下级的奖金号将会受到影响 <br/>（下级奖金号不得高过上级)
				</LabelContent>
			</React.Fragment>
		);
	}

	render() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserProfileFormModalButton
				formTitle="奖金号"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
}

BonusEditButton.propTypes = propTypes;

function mapStateToProps(state) {
	const {
		platform: platformReducer,
		userData,
	} = state;
	const { profile: userProfileReducer, } = userData;
	const platformData = platformReducer.get('data').toObject();
	const userProfileData = userProfileReducer.get('data').toObject();

	return {
		userId: userProfileData.id,
		platformBonus: platformData.bonus,
		userBonus: userProfileData.bonus,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserBonusAction: (...args) => dispatch(updateUserBonusAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BonusEditButton);
