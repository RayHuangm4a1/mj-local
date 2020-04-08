import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'ljit-react-components';
import cx from 'classnames';

const PREFIX_CLASS = 'ljit-lottery-wallet';

const propTypes = {
	supervisionWallets: PropTypes.arrayOf(PropTypes.shape({
		userId: PropTypes.number,
		name: PropTypes.string,
		type: PropTypes.number,
		code: PropTypes.number,
		balance: PropTypes.number,
		isUsed: PropTypes.bool,
	})),
	onClickSupervisionWallet: PropTypes.func,
};
const defaultProps = {
	supervisionWallets: [],
	onClickSupervisionWallet: () => {},
};

function SupervisionWallets({ supervisionWallets, onClickSupervisionWallet, }) {
	return (
		<div className="ljit-lottery-wallet__container">
			{
				supervisionWallets.map((item,index) => (
					<div key={`lottery-wallet-${index}`}
						className={cx(`${PREFIX_CLASS}__item`)}
					>
						<div onClick={onClickSupervisionWallet} className={cx(`${PREFIX_CLASS}__item--active`)}>
							<Icon type={Icon.IconTypeEnums.WALLET_MULTICOLOR} size={Icon.SizeEnums.X_SMALL}/>
							<p> {item.name} <span>{item.balance}</span> </p>
						</div>
					</div>
				))
			}
		</div>
	);
}

SupervisionWallets.propTypes = propTypes;
SupervisionWallets.defaultProps = defaultProps;

export default SupervisionWallets;
