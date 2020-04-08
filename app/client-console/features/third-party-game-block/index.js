import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import ThirdPartyCard from '../../components/third-party-card';
import DashboardBlock from '../../components/dashboard-block';
import ThirdPartyWalletModal from '../third-party-wallet-modal';
import { RouteKeyEnums } from '../../route';
import { ThirdPartyTypeEnums } from '../../lib/enums';
import './style.styl';

const {
	THIRDPARTY
} = RouteKeyEnums;

const {
	IconTypeEnums,
	SizeEnums,
} = Icon;

const {
	OutlineEnum,
	SizeEnum
} = DashboardBlock;

// TODO 確認第三方錢包的 code 與 enums
const ThirdPartyCodeEnums = {
	CQ9: 102,
	WM: 103,
};

const {
	REAL_PERSON,
	ELECTRONIC,
	CHESS,
	FINISH,
	SPORT,
} = ThirdPartyTypeEnums;

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
	usedWalletData: PropTypes.object.isRequired,
};

class ThirdPartyGameBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false,
			thirdPartyWallet: {},
		};
		this._handleClickThirdParty = this._handleClickThirdParty.bind(this);
		this._handleCloseModal = this._handleCloseModal.bind(this);
		this._handleNavigateToThirdParty = this._handleNavigateToThirdParty.bind(this);
		this._handleNavigateToPlatform = this._handleNavigateToPlatform.bind(this);
		this._handleNavigateToHotPlatform = this._handleNavigateToHotPlatform.bind(this);
		this._renderThirdPartyCard = this._renderThirdPartyCard.bind(this);
	}
	// TODO 在可以直接進入第三方遊戲的按鈕之前，先判斷錢包是否低於 10 元並跳出彈跳視窗
	_handleClickThirdParty(thirdParty) {
		const wallet = fakeThirdPartyWallets.filter(wallet => wallet.code === ThirdPartyCodeEnums[thirdParty])[0];

		if (wallet.balance <= 10) {
			this.setState({
				isVisible: true,
				thirdPartyWallet: wallet,
			});
		} else {
			this._handleNavigateToThirdParty(thirdParty);
		}
	}

	_handleCloseModal() {
		this.setState({ isVisible: false, });
	}

	_handleNavigateToThirdParty(thirdParty) {
		// TODO navigate to third party
		console.log(thirdParty);
	}

	_handleNavigateToPlatform(type, platform) {
		const { onNavigate } = this.props;

		onNavigate(`${THIRDPARTY}/${type}/${platform.toLocaleLowerCase()}`);
	}

	_handleNavigateToHotPlatform(type) {
		const { onNavigate } = this.props;

		onNavigate(`${THIRDPARTY}/${type}/hot`);
	}

	_renderThirdPartyCard() {
		const {
			_handleNavigateToHotPlatform,
			_handleNavigateToPlatform,
			_handleClickThirdParty,
		} = this;

		return (
			// TODO get every thirdParties from API
			<React.Fragment>
				<ThirdPartyCard.Standard
					icon={<Icon type={IconTypeEnums.REAL_PERSON}/>}
					title="真人"
					slogin="美女视讯・身临其境！"
					thirdParties={['CQ9','WM']}
					onClickThirdPartyButton={(value) => {_handleClickThirdParty(value);}}
					onClickMore={() => {_handleNavigateToHotPlatform(REAL_PERSON);}}
				/>
				<ThirdPartyCard.Standard
					icon={<Icon type={IconTypeEnums.ELECTRONIC}/>}
					title="电子"
					slogin="梦幻电游・一触即发！"
					thirdParties={['AG','WM']}
					onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(ELECTRONIC, value);}}
					onClickMore={() => {_handleNavigateToHotPlatform(ELECTRONIC);}}
				/>
				<ThirdPartyCard.Standard
					icon={<Icon type={IconTypeEnums.CHESS}/>}
					title="棋牌"
					slogin="極致棋牌・欲罷不能！"
					thirdParties={['JDB','WM']}
					onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(CHESS, value);}}
					onClickMore={() => {_handleNavigateToHotPlatform(CHESS);}}
				/>
				<ThirdPartyCard.Standard
					icon={<Icon type={IconTypeEnums.FINISH}/>}
					title="捕鱼"
					slogin="金山銀山・捕魚一番！"
					thirdParties={['CQ','WM']}
					onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(FINISH, value);}}
					onClickMore={() => {_handleNavigateToHotPlatform(FINISH);}}
				/>
				<ThirdPartyCard.Standard
					icon={<Icon type={IconTypeEnums.SPORT}/>}
					title="体育"
					slogin="精彩賽事・等你来战！"
					thirdParties={['XE','WM']}
					onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(SPORT, value);}}
					onClickMore={() => {_handleNavigateToHotPlatform(SPORT);}}
				/>
			</React.Fragment>
		);
	}
	render() {
		const {
			isVisible,
			thirdPartyWallet,
		} = this.state;
		const {
			_renderThirdPartyCard,
			_handleNavigateToThirdParty,
			_handleCloseModal,
		} = this;

		return (
			<div className="ljit-third-party-game-block">
				<DashboardBlock
					icon={<Icon type={IconTypeEnums.ELECTRONIC} size={SizeEnums.XX_LARGE}/>}
					items={[
						{
							id: 'game',
							name: '外接遊戲',
							content: _renderThirdPartyCard()
						}
					]}
					outline={OutlineEnum.STRING}
					size={SizeEnum.LARGE}>
				</DashboardBlock>
				<ThirdPartyWalletModal.EnterGame
					isVisible={isVisible}
					intoWallet={thirdPartyWallet.name}
					intoWalletBalance={thirdPartyWallet.balance}
					onCloseModal={_handleCloseModal}
					onClickEntryGame={() => {_handleNavigateToThirdParty(thirdPartyWallet.name);}}
				/>
			</div>
		);
	}
}

ThirdPartyGameBlock.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		// TODO get third party info
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyGameBlock);

// TODO get third party wallet from API
const fakeThirdPartyWallets = [
	{
		balance: 9,
		code: 102,
		id: 23,
		name: "CQ9",
		type: 1,
		userId: 12,
	},
	{
		balance: 13,
		code: 103,
		id: 23,
		name: "WM",
		type: 1,
		userId: 12,
	}
];
