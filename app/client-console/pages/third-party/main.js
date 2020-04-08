import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Icon,
} from 'ljit-react-components';
import {
	withThirdPartySelector,
	ThirdPartySelectionGroup,
} from './third-party-selector';
import { fakeThirdPartyTypeSelections, fakeThirdPartyPlatformSelectionsGroup, } from './fake-data';
import ThirdPartyCard from '../../components/third-party-card';
import ThirdPartyWalletModal from '../../features/third-party-wallet-modal';
import { RouteKeyEnums } from '../../route';
import { connect } from 'ljit-store-connecter';
import { ThirdPartyTypeEnums } from '../../lib/enums';

const {
	THIRDPARTY
} = RouteKeyEnums;

const {
	SizeEnums,
	IconTypeEnums,
} = Icon;

const {
	X_LARGE,
} = SizeEnums;

const {
	CROWN_COLOR,
} = IconTypeEnums;

const {
	CHESS,
	REAL_PERSON,
	ELECTRONIC,
	FISHING,
	SPORT,
} = ThirdPartyTypeEnums;

// TODO 確認第三方錢包的 enums
const ThirdPartyCodeEnums = {
	AG: 102,
	KY: 103,
};

const propTypes = {
	thirdPartySelector: PropTypes.object.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

class ThirdPartyMainPage extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: false,
			modalThirdPartyWallet: {},
		};
		this._handleCloseModal = this._handleCloseModal.bind(this);
		this._handleClickThirdParty = this._handleClickThirdParty.bind(this);
		this._handleNavigateToThirdParty = this._handleNavigateToThirdParty.bind(this);
		this._handleNavigateToPlatform = this._handleNavigateToPlatform.bind(this);
	}

	_handleCloseModal() {
		this.setState({
			isVisible: false,
		});
	}
	// TODO 在可以直接進入第三方遊戲的按鈕之前，先判斷錢包是否低於 10 元並跳出彈跳視窗
	_handleClickThirdParty(value) {
		const wallet = fakeThirdPartyWallets.filter(wallet => wallet.code === ThirdPartyCodeEnums[value])[0];

		if (wallet.balance <= 10) {
			this.setState({
				isVisible: true,
				modalThirdPartyWallet: wallet,
			});
		} else {
			this._handleNavigateToThirdParty(value);
		}
	}

	_handleNavigateToThirdParty(value) {
		// TODO onNavigate to third party game
		console.log(value);
	}

	_handleNavigateToPlatform(value, type) {
		const { onNavigate } = this.props;

		onNavigate(`${THIRDPARTY}/${type}/${value.toLocaleLowerCase()}`);
	}

	render() {
		const {
			thirdPartySelector = {},
		} = this.props;
		const {
			thirdPartyTypeKey,
		} = thirdPartySelector;
		const {
			_handleCloseModal,
			_handleClickThirdParty,
			_handleNavigateToThirdParty,
			_handleNavigateToPlatform,
		} = this;
		const {
			isVisible,
			modalThirdPartyWallet,
		} = this.state;
		// TODO group third party platform by type
		const thirdPartyPlatformSelections = fakeThirdPartyPlatformSelectionsGroup[thirdPartyTypeKey] || [];

		return (
			<Row>
				<Col className="third-party__column">
					<ThirdPartySelectionGroup
						thirdPartyTypeSelections={fakeThirdPartyTypeSelections}
						thirdPartyPlatformSelections={thirdPartyPlatformSelections}
						{...thirdPartySelector}
					/>
				</Col>
				<Col className="third-party__column">
					<div className="third-party__home">
						<ThirdPartyCard.Image
							imageSrc='https://www.w3schools.com/howto/img_snow.jpg'
							icon={<Icon type={CROWN_COLOR} size={X_LARGE}/>}
							title="真人"
							thirdParties={['AG', 'KY']}
							onClickThirdPartyButton={(value) => {_handleClickThirdParty(value);}}
						/>
						<ThirdPartyCard.Image
							imageSrc='https://www.w3schools.com/howto/img_snow.jpg'
							icon={<Icon type={CROWN_COLOR} size={X_LARGE}/>}
							title="棋牌"
							thirdParties={['JDB']}
							onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(value, CHESS);}}
						/>
						<ThirdPartyCard.Image
							imageSrc='https://www.w3schools.com/howto/img_snow.jpg'
							icon={<Icon type={CROWN_COLOR} size={X_LARGE}/>}
							title="电子"
							thirdParties={['AG']}
							onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(value, ELECTRONIC);}}
						/>
						<ThirdPartyCard.Image
							imageSrc='https://www.w3schools.com/howto/img_snow.jpg'
							icon={<Icon type={CROWN_COLOR} size={X_LARGE}/>}
							title="捕鱼"
							thirdParties={['CQ']}
							onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(value, FISHING);}}
						/>
						<ThirdPartyCard.Image
							imageSrc='https://www.w3schools.com/howto/img_snow.jpg'
							icon={<Icon type={CROWN_COLOR} size={X_LARGE}/>}
							title="体育"
							thirdParties={['XE']}
							onClickThirdPartyButton={(value) => {_handleNavigateToPlatform(value, SPORT);}}
						/>
					</div>
					<ThirdPartyWalletModal.EnterGame
						isVisible={isVisible}
						intoWallet={modalThirdPartyWallet.name}
						intoWalletBalance={modalThirdPartyWallet.balance}
						onCloseModal={_handleCloseModal}
						onClickEntryGame={() => {_handleNavigateToThirdParty(modalThirdPartyWallet.name);}}
					/>
				</Col>
			</Row>
		);
	}
}

ThirdPartyMainPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {

	};
}
function mapDispatchToProps(dispatch) {
	return {

	};
}
export default connect(mapStateToProps, mapDispatchToProps)(withThirdPartySelector(ThirdPartyMainPage));

// TODO get third party wallet from API
const fakeThirdPartyWallets = [
	{
		balance: 9,
		code: 102,
		id: 23,
		name: "AG",
		type: 1,
		userId: 12,
	},
	{
		balance: 13,
		code: 103,
		id: 23,
		name: "KY",
		type: 1,
		userId: 12,
	}
];
