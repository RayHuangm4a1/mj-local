import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import ImportForm from '../form/import-form';
import PageBlock from '../../../../components/page-block';
import { connect } from 'ljit-store-connecter';
import { bankCardBlackListActions, } from '../../../../controller';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const { addBankCardsToBlackListAction, } = bankCardBlackListActions;

const propTypes = {
	onBack: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	addBankCardsToBlackListAction: PropTypes.func.isRequired,
	addBankCardToBlackListLoadingStatus:  PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]),
};

class AccountMemberBankBannedImportPage extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit({ numbers }) {
		const { addBankCardsToBlackListAction, } = this.props;
		const bankCards = numbers
			.split('/')
			.map(number => ({ number: number.trim(), }));

		addBankCardsToBlackListAction(bankCards);
	}

	render() {
		const { _handleSubmit, } = this;
		const { onBack, } = this.props;

		return (
			<Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					style={{ marginBottom: 24 }}
					onClick={onBack}
				>
					返回上一層
				</Button>
				<PageBlock
					noMinHeight
				>
					<ImportForm
						ref={ref => this.importFormInstance = ref}
						label="银行卡号：（不同银行卡号请用 / 隔开)"
						itemName="numbers"
						placeholder="请输入银行卡号"
						onSubmit={_handleSubmit}
						itemConfig={{
							rules: [{
								required: true,
								message: '请至少输入一组银行卡号',
							},],
						}}
					/>
				</PageBlock>
			</Fragment>
		);
	}

	componentDidUpdate(prevProps) {
		const { addBankCardToBlackListLoadingStatus, notifyHandlingAction, } = this.props;

		if (prevProps.addBankCardToBlackListLoadingStatus === LOADING && addBankCardToBlackListLoadingStatus === SUCCESS) {
			this.importFormInstance.resetFrom();
			notifyHandlingAction(new Success('新增银行卡黑名单成功'));
		}
	}
}

AccountMemberBankBannedImportPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		addBankCardToBlackListLoadingStatus: state.bankCardBlackList.get('addBankCardToBlackListLoadingStatus'),
		addBankCardToBlackListLoadingStatusMessage: state.bankCardBlackList.get('addBankCardToBlackListLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addBankCardsToBlackListAction: (bankCards) => dispatch(addBankCardsToBlackListAction(bankCards)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification([
		{
			loadingStatus: 'addBankCardToBlackListLoadingStatus',
			loadingStatusMessage: 'addBankCardToBlackListLoadingStatusMessage',
		},
	],
	AccountMemberBankBannedImportPage)
);
