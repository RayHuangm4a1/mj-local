// TODO move file to correct level
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ljit-react-components';
import BankItem from './bank-item';
import './style.styl';

const fakeData = [
	{
		bank: '工商銀行',
		account: '1234231212323077',
		holder: '測試者',
		bindConut: 1,
		createdAt: (new Date).toISOString(),
	},
];

const propTypes = {
	// TODO use correct data schema
	bankCardsData: PropTypes.arrayOf(PropTypes.shape({
		bank: PropTypes.string,
		holder: PropTypes.string,
		account: PropTypes.string,
		createdAt: PropTypes.string,
		bindConut: PropTypes.number,
	})),
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {
	bankCardsData: fakeData
};

function BanksPage({
	onNavigate,
	bankCardsData,
}) {
	const _handleClickAddBankCard = () => {
		// TODO navigate create bankcard page
	};
	const _handleClickDeleteBankCard = (cardData) => {
		// TODO dispatch remove bankcard action
	};
	const _renderBankItems = () => {
		return bankCardsData.map(cardData => {
			return (
				<BankItem
					key={cardData.account}
					cardData={cardData}
					onClickDelete={_handleClickDeleteBankCard}
				/>
			);
		});
	};

	return (
		<div className="banks-page">
			<div className="banks-page__bank-items">
				{_renderBankItems()}
			</div>
			<Button
				onClick={_handleClickAddBankCard}
				color={Button.ColorEnums.ORANGE}
			>
				新增银行卡
			</Button>
		</div>
	);
}

BanksPage.propTypes = propTypes;
BanksPage.defaultProps = defaultProps;

export default BanksPage;
