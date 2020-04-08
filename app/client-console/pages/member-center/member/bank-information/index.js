import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import BankCards from './bank-cards';
import AddBankCardModal from './add-bank-card-modal';
import DeleteBankCardModal from './delete-bank-card-modal';
import { connect, } from 'ljit-store-connecter';
import { userBankCardsAction, } from '../../../../controller';
import { withLoadingStatusNotification, notifications, } from '../../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import './style.styl';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;
const {
	fetchUserBankCardsAction,
	createUserBankCardAction,
	deleteUserBankCardAction,
} = userBankCardsAction;

const propTypes = {
	userData: PropTypes.shape({
		// TODO get real name from userData
		realName: PropTypes.string,
	}),
	userBankCardsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		bankName: PropTypes.string,
		number: PropTypes.string,
		payer: PropTypes.string,
		activatedAt: PropTypes.string,
		withdrawableAt: PropTypes.string,
	})),
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	loadingStatusMessage: PropTypes.string,
	createLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	createLoadingStatusMessage: PropTypes.string,
	deleteLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	deleteLoadingStatusMessage: PropTypes.string,
	fetchUserBankCardsAction: PropTypes.func.isRequired,
	createUserBankCardAction: PropTypes.func.isRequired,
	deleteUserBankCardAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
};

const defaultProps = {};

const PREFIX_CLASS = 'ljit-member-bank-info';

class MemberBankInformationPage extends Component {
	constructor() {
		super();

		this.state = {
			isAddBankCardModalVisible: false,
			isDeleteBankCardModalVisible: false,
			bankCardId: null,
		};

		this._handleClickAddBankCard = this._handleClickAddBankCard.bind(this);
		this._handleClickDeleteBankCard = this._handleClickDeleteBankCard.bind(this);
		this._handleSubmitAddBankCard = this._handleSubmitAddBankCard.bind(this);
		this._handleSubmitDeleteBankCard = this._handleSubmitDeleteBankCard.bind(this);
	}

	_handleClickAddBankCard() {
		this.setState({ isAddBankCardModalVisible: true, });
	}
	_handleClickDeleteBankCard(bankCardId) {
		this.setState({
			isDeleteBankCardModalVisible: true,
			bankCardId,
		});
	}
	_handleSubmitAddBankCard({ payer, number, }) {
		this.props.createUserBankCardAction(number, { payer, });
		this.setState({ isAddBankCardModalVisible: false, });
	}
	_handleSubmitDeleteBankCard(password) {
		const { bankCardId, } = this.state;

		this.props.deleteUserBankCardAction(bankCardId, password);
		this.setState({
			isDeleteBankCardModalVisible: false,
			bankCardId: null,
		});
	}

	render() {
		const { userBankCardsData, userData, } = this.props;
		const {
			_handleClickAddBankCard,
			_handleClickDeleteBankCard,
			_handleSubmitAddBankCard,
			_handleSubmitDeleteBankCard,
		} = this;
		const {
			isAddBankCardModalVisible,
			isDeleteBankCardModalVisible,
		} = this.state;
		// TODO get realName from userData, if not real name, set payer by user input. remove "測試者" after api data is ok
		const { realName = "測試者" } = userData;

		return (
			<div className={PREFIX_CLASS}>
				<BankCards
					bankCards={userBankCardsData}
					onClickAddCard={_handleClickAddBankCard}
					onClickUnbindCard={_handleClickDeleteBankCard}
				/>
				<AddBankCardModal
					isVisible={isAddBankCardModalVisible}
					payer={realName}
					onSubmit={_handleSubmitAddBankCard}
					onCancel={() => this.setState({ isAddBankCardModalVisible: false, })}
				/>
				<DeleteBankCardModal
					isVisible={isDeleteBankCardModalVisible}
					onSubmit={_handleSubmitDeleteBankCard}
					onCancel={() => this.setState({ isDeleteBankCardModalVisible: false, })}
				/>
			</div>
		);
	}

	componentDidMount() {
		this.props.fetchUserBankCardsAction();
	}
	componentDidUpdate(prev) {
		const {
			createLoadingStatus,
			deleteLoadingStatus,
			notifyHandlingAction,
		} = this.props;

		if (prev.createLoadingStatus === LOADING && createLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('添加银行卡成功'));
		}
		if (prev.deleteLoadingStatus === LOADING && deleteLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('解除银行卡绑定成功'));
		}
	}
}

MemberBankInformationPage.propTypes = propTypes;
MemberBankInformationPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		userData: state.user.get('data').toObject(),
		userBankCardsData: state.userBankCards.get('data').toArray(),
		loadingStatus: state.userBankCards.get('loadingStatus'),
		loadingStatusMessage: state.userBankCards.get('loadingStatusMessage'),
		createLoadingStatus: state.userBankCards.get('createLoadingStatus'),
		createLoadingStatusMessage: state.userBankCards.get('createLoadingStatusMessage'),
		deleteLoadingStatus: state.userBankCards.get('deleteLoadingStatus'),
		deleteLoadingStatusMessage: state.userBankCards.get('deleteLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchUserBankCardsAction: () => dispatch(fetchUserBankCardsAction()),
		createUserBankCardAction: (number, { payer }) => dispatch(createUserBankCardAction(number, { payer })),
		deleteUserBankCardAction: (bankCardId, password) => dispatch(deleteUserBankCardAction(bankCardId, password)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'loadingStatus',
				loadingStatusMessage: 'loadingStatusMessage',
			},
			{
				loadingStatus: 'createLoadingStatus',
				loadingStatusMessage: 'createLoadingStatusMessage',
			},
			{
				loadingStatus: 'deleteLoadingStatus',
				loadingStatusMessage: 'deleteLoadingStatusMessage',
			},
		],
		MemberBankInformationPage)
);

