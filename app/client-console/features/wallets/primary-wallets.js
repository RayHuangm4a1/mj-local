import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'ljit-react-components';
import cx from 'classnames';

const PREFIX_CLASS = 'ljit-lottery-wallet';

const propTypes = {
	primaryWallets: PropTypes.arrayOf(PropTypes.shape({
		userId: PropTypes.number,
		name: PropTypes.string,
		type: PropTypes.number,
		code: PropTypes.number,
		balance: PropTypes.number,
		isUsed: PropTypes.bool,
	})),
	onClickPrimaryWallet: PropTypes.func,
};
const defaultProps = {
	primaryWallets: [],
	onClickPrimaryWallet: () => {},
};

function PrimaryWallets({ primaryWallets, onClickPrimaryWallet, }) {
	return (
		<div className="ljit-lottery-wallet__container">
			{/* TODO 如果要可以選擇錢包，可以回到 35ad0378 這一個 commit 之前的記錄*/}
			{
				primaryWallets.map((item,index) => (
					<div key={`lottery-wallet-${index}`}
						className={cx(`${PREFIX_CLASS}__item`)}
					>
						<div onClick={onClickPrimaryWallet} className={cx(`${PREFIX_CLASS}__item--active`)}>
							<Icon type={Icon.IconTypeEnums.WALLET_MULTICOLOR} size={Icon.SizeEnums.X_SMALL}/>
							<p> {item.name} <span>{item.balance}</span> </p>
						</div>
						<p> 使用中 </p>
					</div>
				))
			}
		</div>
	);
}

PrimaryWallets.propTypes = propTypes;
PrimaryWallets.defaultProps = defaultProps;

export default PrimaryWallets;
