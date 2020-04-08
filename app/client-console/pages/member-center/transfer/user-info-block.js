import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	UserAvatar,
	Tooltip,
	Icon,
	Statistic,
	Button,
	DecimalNumber,
} from 'ljit-react-components';
import {
	walletPropType,
	walletAccumulator,
} from './utils';

const propTypes = {
	className: PropTypes.string,
	userData: PropTypes.shape({
		username: PropTypes.string,
		avatar: PropTypes.string,
	}).isRequired,
	usedWalletData: walletPropType.isRequired,
	walletsData: PropTypes.shape({
		primary: PropTypes.arrayOf(walletPropType),
		supervision: PropTypes.arrayOf(walletPropType),
	}).isRequired,
	onClickUpdateWalletButton: PropTypes.func,
};
const defaultProps = {
	className: '',
	onClickUpdateWalletButton: () => {},
	onClickWithdrawAndRechargeLogButton: () => {},
};

const PREFIX_CLASS = 'user-info-block';

function UserInfoBlock({
	className,
	userData,
	usedWalletData,
	walletsData,
	onClickUpdateWalletButton,
}) {
	const { balance: userBalance = 0, } = usedWalletData;
	const { username = '', avatar, } = userData;
	const { primary, supervision, } = walletsData;
	const primaryBalance = primary.reduce(walletAccumulator, 0);
	const supervisionBalance = supervision.reduce(walletAccumulator, 0);

	const userName = (
		<Fragment>
			<span>{username}</span>
			<Tooltip
				placement="bottom"
				title={
					`为了确保您能及时投注，建议您在充值成功后，先将资金从中心钱包转入您所需要投注的游戏钱包内。
					监管账户余额每月4号、7号、10号、13号、19号、22号、25号、28号凌晨03点自动划入彩票余额。
					监管账户只可用于发放分红，监管账户被冻结后资金不自动划入彩票余额。`
				}
				overlayColor={Tooltip.ColorEnums.WHITE}
				overlayStyle={{ minWidth: '416px', whiteSpace: 'pre-line', }}
			>
				<span className={`${PREFIX_CLASS}__tooltip-icon-wrapper`}>
					<Icon
						className={`${PREFIX_CLASS}__tooltip-icon`}
						type={Icon.IconTypeEnums.QUESTION_CIRCLE_FILL}
					/>
				</span>
			</Tooltip>
		</Fragment>
	);
	const description = (
		<div>
			余额 <DecimalNumber data={userBalance} hasSeparator/> 元
		</div>
	);

	return (
		<div className={cx(PREFIX_CLASS, className)}>
			<div className={`${PREFIX_CLASS}__user-avatar`}>
				<UserAvatar
					key={username}
					size={56}
					src={avatar}
					userName={userName}
					description={description}
				/>
			</div>
			<div className={`${PREFIX_CLASS}__wallet`}>
				<Statistic
					className="primary-wallet-statistic"
					title="彩票錢包A"
					value={primaryBalance}
					suffix="元"
					sizeType={Statistic.SizeTypeEnums.MEDIUM}
				/>
			</div>
			<div className={`${PREFIX_CLASS}__wallet`}>
				<Statistic
					className="supervision-wallet-statistic"
					title="監管钱包总额"
					value={supervisionBalance}
					suffix="元"
					sizeType={Statistic.SizeTypeEnums.MEDIUM}
				/>
			</div>
			<div className={`${PREFIX_CLASS}__button`}>
				<Button
					key="更新钱包"
					outline={Button.OutlineEnums.HOLLOW}
					color={Button.ColorEnums.ORANGE}
					onClick={onClickUpdateWalletButton}
				>
					更新钱包
				</Button>
			</div>
		</div>
	);
}

UserInfoBlock.propTypes = propTypes;
UserInfoBlock.defaultProps = defaultProps;

export default UserInfoBlock;
