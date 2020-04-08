import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Input,
	LabelContent,
	HeaderButtonBar,
	InputDynamicTable,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { connect } from 'ljit-store-connecter';
import { bankCardBlackListActions, } from '../../../../controller';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import uuid from 'uuid';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import '../style.styl';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const { addBankCardsToBlackListAction, } = bankCardBlackListActions;
const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const { ValidateStatusEnums, } = LabelContent;
const { SUCCESS: VALIDATE_SUCCESS, ERROR, } = ValidateStatusEnums;

const propTypes = {
	onBack: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	addBankCardsToBlackListAction: PropTypes.func.isRequired,
	addBankCardToBlackListLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]),
};

class AccountMemberBankBannedMultiAddPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputBankCards: [{ key: uuid(), }],
		};

		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handleSubmitAdd() {
		let isValid = true;
		const { addBankCardsToBlackListAction, } = this.props;
		const { inputBankCards, } = this.state;

		for (let i = 0; i < inputBankCards.length; i++) {
			const { number, blockedPayer, description, } = inputBankCards[i];
			const { validateStatus: blockedPayerValidateStatus, } = validateBlockedPayer(blockedPayer);
			const { validateStatus: descriptionValidateStatus, } = validateDescription(description);

			if (!number || blockedPayerValidateStatus === ERROR || descriptionValidateStatus == ERROR) {
				isValid = false;
				break;
			}
		}

		if (isValid) {
			const bankCards = inputBankCards.map(({ blockedPayer, number, description, }) => ({
				blockedPayer,
				number: number.trim(),
				description,
			}));

			addBankCardsToBlackListAction(bankCards);
		} else {
			this.setState({
				//this will trigger "number" validateStatus Change
				inputBankCards: inputBankCards.map((item) => item.number ? item : Object.assign({}, item, { number: null, }))
			});
		}
	}
	_renderTable() {
		const { inputBankCards } = this.state;
		const columns = [{
			title:'姓名',
			dataIndex:'blockedPayer',
			renderField: (record, rowIndex, onChange) => {
				const { validateStatus, helpMessage } = validateBlockedPayer(record.blockedPayer);

				return (
					<LabelContent
						validateStatus={validateStatus}
						helpMessage={helpMessage}
					>
						<Input
							placeholder="请输入姓名"
							value={record.blockedPayer}
							onChange={(e) => onChange('blockedPayer', e.target.value, rowIndex)}
						/>
					</LabelContent>
				);
			}
		},{
			title:'银行卡号',
			dataIndex:'number',
			renderField: (record, rowIndex, onChange) => (
				<LabelContent
					validateStatus={record.number !== null ? VALIDATE_SUCCESS : ERROR}
					helpMessage={record.number !== null ? null : '银行卡号为必填'}
				>
					<Input
						placeholder="请输入卡号"
						value={record.number}
						onChange={(e) => onChange('number', e.target.value ? e.target.value : null, rowIndex)}
					/>
				</LabelContent>
			)
		},{
			title:'备注',
			dataIndex:'description',
			renderField: (record, rowIndex, onChange) => {
				const { validateStatus, helpMessage, } = validateDescription(record.description);

				return (
					<LabelContent
						validateStatus={validateStatus}
						helpMessage={helpMessage}
					>
						<Input
							placeholder="请输入备注"
							value={record.description}
							onChange={(e) => onChange('description', e.target.value, rowIndex)}
						/>
					</LabelContent>
				);
			}
		},];

		return (
			<InputDynamicTable
				columns={columns}
				value={inputBankCards}
				onChange={(inputBankCards) => this.setState({ inputBankCards, })}
				className="management-bank-banned__table"
			/>
		);
	}

	render() {
		const {
			_handleSubmitAdd,
			_renderTable,
		} = this;
		const { onBack } = this.props;

		return (
			<React.Fragment >
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
					<HeaderButtonBar
						right={(
							<Button
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={_handleSubmitAdd}
								style={{ width: 98, marginBottom: 30 }}
							>
								新增
							</Button>
						)}
					/>
					{_renderTable()}
				</PageBlock>
			</React.Fragment>
		);
	}

	componentDidUpdate(prevProps) {
		const { addBankCardToBlackListLoadingStatus, notifyHandlingAction, } = this.props;

		if (prevProps.addBankCardToBlackListLoadingStatus === LOADING && addBankCardToBlackListLoadingStatus === SUCCESS) {
			this.setState({ inputBankCards: [{ key: uuid(), }], });
			notifyHandlingAction(new Success('新增银行卡黑名单成功'));
		}
	}
}

AccountMemberBankBannedMultiAddPage.propTypes = propTypes;

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
	AccountMemberBankBannedMultiAddPage)
);

function validateBlockedPayer(blockedPayer) {
	let validateStatus = VALIDATE_SUCCESS;
	let helpMessage = null;
	const pattern = /^[A-Za-z\u4e00-\u9fa5/]+$/;

	if (blockedPayer) {
		if (!pattern.test(blockedPayer)) {
			helpMessage = '持卡人姓名不能包含数字和特殊字元',
			validateStatus = ERROR;
		} else if (blockedPayer.length > 32) {
			helpMessage = '持卡人姓名不能超過32個字元';
			validateStatus = ERROR;
		}
	}

	return { validateStatus, helpMessage, };
}

function validateDescription(description) {
	let validateStatus = VALIDATE_SUCCESS;
	let helpMessage = null;

	if (description) {
		if (description.length > 32) {
			helpMessage = '持卡人姓名不能超過32個字元';
			validateStatus = ERROR;
		}
	}

	return { validateStatus, helpMessage, };
}
