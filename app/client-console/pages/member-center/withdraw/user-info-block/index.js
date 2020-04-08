import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	UserAvatar,
	Button,
	HeaderButtonBar,
	DecimalNumber,
} from 'ljit-react-components';

const propTypes = {
	className: PropTypes.string,
	userData: PropTypes.shape({
		username: PropTypes.string,
		userProfile: PropTypes.string,
		balance: PropTypes.number,
		avatar: PropTypes.string,
	}),
	walletData: PropTypes.shape({
		name: PropTypes.string,
		balance: PropTypes.number,
	}),
	onClickUpdateWalletButton: PropTypes.func,
	onClickRechargeAndWithdrawalLogButton: PropTypes.func,
};
const defaultProps = {
	className: '',
	userData: {},
	walletData: {},
	onClickUpdateWalletButton: () => {},
	onClickWithdrawAndRechargeLogButton: () => {},
};
const PREFIX_CLASS = 'user-info-block';

function UserInfoBlock({
	className,
	userData,
	walletData,
	onClickUpdateWalletButton,
	onClickRechargeAndWithdrawalLogButton,
}) {
	const { balance = 0, } = walletData;
	const { username = '', avatar, } = userData;
	const description = (
		<div>
			余额 <DecimalNumber data={balance} hasSeparator/> 元
		</div>
	);

	return (
		<div className={cx(PREFIX_CLASS, className)}>
			<HeaderButtonBar
				left={[
					<UserAvatar
						key={username}
						src={avatar}
						size={56}
						description={description}
						userName={<span>{username}</span>}
					/>
				]}
				right={[
					(
						<Button
							key="充提记录"
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={onClickRechargeAndWithdrawalLogButton}
						>
							充提记录
						</Button>
					),
					(
						<Button
							key="更新余额"
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={onClickUpdateWalletButton}
						>
							更新余额
						</Button>
					),
				]}
			/>
		</div>
	);
}

UserInfoBlock.propTypes = propTypes;
UserInfoBlock.defaultProps = defaultProps;

export default UserInfoBlock;
