import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
} from 'ljit-react-components';
import {
	withThirdPartySelector,
	ThirdPartySelectionGroup,
} from './third-party-selector';
import { fakeThirdPartyTypeSelections, fakeThirdPartyPlatformSelectionsGroup, } from './fake-data';
import ThirdPartyWalletModal from '../../features/third-party-wallet-modal';
import ThirdPartyCard from '../../components/third-party-card';
import { connect } from 'ljit-store-connecter';

const propTypes = {
	thirdPartySelector: PropTypes.object.isRequired,
};

// TODO 確認第三方錢包的 code enums
const ThirdPartyCodeEnums = {
	AG: 102,
	KY: 103,
	JDB: 104,
};

class ThirdPartySubPage extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: false,
			modalThirdPartyWallet: {},
			thirdPartyGameIndex: '',
		};
		this._handleWalletLessThanTen = this._handleWalletLessThanTen.bind(this);
		this._handleCloseModal = this._handleCloseModal.bind(this);
		this._handleToggleFavorite = this._handleToggleFavorite.bind(this);
		this._handleRedirectGame = this._handleRedirectGame.bind(this);
	}

	_handleWalletLessThanTen(index) {
		this.setState({
			thirdPartyGameIndex: index,
		});
		const { tag, gameUrl } = fakeThirdPartyGameData[index];
		const wallet = fakeThirdPartyWallets.filter(wallet => wallet.code === ThirdPartyCodeEnums[tag])[0];

		if (wallet.balance <= 10) {
			this.setState({
				isVisible: true,
				modalThirdPartyWallet: wallet,
			});
		} else {
			this._handleRedirectGame(gameUrl);
		}
	}

	_handleCloseModal() {
		this.setState({ isVisible: false, });
	}

	_handleToggleFavorite(index) {
		// TODO post API to add favorite
		console.log(index);
	}

	_handleRedirectGame() {
		// TODO redirect to game url
		console.log(fakeThirdPartyGameData[this.state.thirdPartyGameIndex]);
		this._handleCloseModal();
	}

	render() {
		const {
			thirdPartySelector = {},
		} = this.props;
		const {
			thirdPartyTypeKey,
		} = thirdPartySelector;
		const {
			_handleToggleFavorite,
			_handleRedirectGame,
			_handleWalletLessThanTen,
			_handleCloseModal,
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
					<div className="third-party__game">
						{
							fakeThirdPartyGameData.map((game, index) => {
								const { imageSrc, title, isFavorite, tag } = game;

								return (
									<ThirdPartyCard.Single
										key={index}
										imageSrc={imageSrc}
										tag={tag}
										title={title}
										isFavorite={isFavorite}
										onClickFavorite={() => {_handleToggleFavorite(index); }}
										onClick={() => {_handleWalletLessThanTen(index); }}
									/>
								);
							})
						}
					</div>
					<ThirdPartyWalletModal.EnterGame
						isVisible={isVisible}
						intoWallet={modalThirdPartyWallet.name}
						intoWalletBalance={modalThirdPartyWallet.balance}
						onCloseModal={_handleCloseModal}
						onClickEntryGame={_handleRedirectGame}
					/>
				</Col>
			</Row>
		);
	}
}

ThirdPartySubPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {

	};
}
function mapDispatchToProps(dispatch) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withThirdPartySelector(ThirdPartySubPage));

// TODO get third party game data from API
const fakeThirdPartyGameData = [
	{
		imageSrc: 'https://oc1.ocstatic.com/images/logo_small.png',
		title: '五龍補魚',
		gameUrl: 'http://google.com',
		isFavorite: false,
		tag: 'JDB',
	},
	{
		imageSrc: 'https://oc1.ocstatic.com/images/logo_small.png',
		title: '五龍補魚',
		gameUrl: 'http://google.com',
		isFavorite: true,
		tag: 'JDB',
	},
	{
		imageSrc: 'https://oc1.ocstatic.com/images/logo_small.png',
		title: '龙王捕鱼',
		gameUrl: 'http://google.com',
		isFavorite: false,
		tag: 'JDB',
	},
	{
		imageSrc: 'https://oc1.ocstatic.com/images/logo_small.png',
		title: '五龍補魚',
		gameUrl: 'http://google.com',
		isFavorite: true,
		tag: 'JDB',
	},
	{
		imageSrc: 'https://oc1.ocstatic.com/images/logo_small.png',
		title: '五龍補魚',
		gameUrl: 'http://google.com',
		isFavorite: true,
		tag: 'JDB',
	},
	{
		imageSrc: 'https://oc1.ocstatic.com/images/logo_small.png',
		title: '财神捕鱼',
		gameUrl: 'http://google.com',
		isFavorite: false,
		tag: 'JDB',
	},
];

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
	},
	{
		balance: 9,
		code: 104,
		id: 23,
		name: "JDB",
		type: 1,
		userId: 12,
	},
];
