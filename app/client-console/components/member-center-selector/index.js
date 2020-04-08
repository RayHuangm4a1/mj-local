import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon, IconSelector, } from 'ljit-react-components';
import './style.styl';

const {
	UP_SIDE,
} = IconSelector.IconPlacementEnums;

const {
	IconTypeEnums,
	SizeEnums,
} = Icon;

const {
	LARGE,
} = SizeEnums;

const {
	MEMBER,
	ORANGE_MEMBER,
	PROXY,
	ORANGE_PROXY,
	ANNOUNCEMENT,
	ORANGE_ANNOUNCEMENT,
	HELP,
	ORANGE_HELP,
	CUSTOMER_SERVICE_2,
	ORANGE_CUSTOMER_SERVICE_2,
	WITHDRAW_CIRCLE,
	ORANGE_WITHDRAW_CIRCLE,
	TRANSFER_CIRCLE,
	ORANGE_TRANSFER_CIRCLE,
	RECHARGE_CIRCLE,
	ORANGE_RECHARGE_CIRCLE,
} = IconTypeEnums;

const ItemNameEnums = {
	NAME_MEMBER: '会员',
	NAME_PROXY: '代理',
	NAME_RECHARGE: '充值',
	NAME_WITHDRAW: '提现',
	NAME_TRANSFER: '转帐',
	NAME_ANNOUNCEMENT: '公告',
	NAME_CUSTOMER_SERVICE: '客服',
	NAME_HELP: '帮助',
};

const {
	NAME_MEMBER,
	NAME_PROXY,
	NAME_RECHARGE,
	NAME_WITHDRAW,
	NAME_TRANSFER,
	NAME_ANNOUNCEMENT,
	NAME_CUSTOMER_SERVICE,
	NAME_HELP
} = ItemNameEnums;

const ItemIdEnums = {
	ID_MEMBER: 'member',
	ID_PROXY: 'proxy',
	ID_RECHARGE: 'recharge',
	ID_WITHDRAW: 'withdraw',
	ID_TRANSFER: 'transfer',
	ID_ANNOUNCEMENT: 'announcement',
	ID_CUSTOMER_SERVICE: 'customer-service',
	ID_HELPER: 'helper',
};

const {
	ID_MEMBER,
	ID_PROXY,
	ID_RECHARGE,
	ID_WITHDRAW,
	ID_TRANSFER,
	ID_ANNOUNCEMENT,
	ID_CUSTOMER_SERVICE,
	ID_HELPER,
} = ItemIdEnums;

const itemList = [
	{ iconType: MEMBER, selectedIconType: ORANGE_MEMBER, name: NAME_MEMBER, id: ID_MEMBER },
	{ iconType: PROXY, selectedIconType: ORANGE_PROXY, name: NAME_PROXY, id: ID_PROXY },
	{ iconType: RECHARGE_CIRCLE, selectedIconType: ORANGE_RECHARGE_CIRCLE, name: NAME_RECHARGE, id: ID_RECHARGE },
	{ iconType: WITHDRAW_CIRCLE, selectedIconType: ORANGE_WITHDRAW_CIRCLE, name: NAME_WITHDRAW, id: ID_WITHDRAW, },
	{ iconType: TRANSFER_CIRCLE, selectedIconType: ORANGE_TRANSFER_CIRCLE, name: NAME_TRANSFER, id: ID_TRANSFER, },
	{ iconType: ANNOUNCEMENT,selectedIconType: ORANGE_ANNOUNCEMENT, name: NAME_ANNOUNCEMENT, id: ID_ANNOUNCEMENT },
	// TODO 要做幫助與客服的頁面的時候打開
	// { iconType: CUSTOMER_SERVICE_2, selectedIconType: ORANGE_CUSTOMER_SERVICE_2, name: NAME_CUSTOMER_SERVICE, id: ID_CUSTOMER_SERVICE },
	// { iconType: HELP, selectedIconType: ORANGE_HELP, name: NAME_HELP, id: ID_HELPER },
];

const propTypes = {
	className: PropTypes.string,
	onClickItem: PropTypes.func,
	selectedId: PropTypes.oneOf(Object.values(ItemIdEnums).concat('')),
	isVertical: PropTypes.bool,
};

const defaultProps = {
	className: '',
	onClickItem: () => {},
	selectedId: '',
	isVertical: false,
};

const MemberCenterSelector = ({
	className,
	isVertical,
	onClickItem,
	selectedId,
}) => (
	<IconSelector
		isVertical={isVertical}
		iconPlacement={UP_SIDE}
		iconSize={LARGE}
		className={cx('ljit-member-center-selector', className)}
		items={itemList}
		onClickItem={onClickItem}
		selectedId={selectedId}
	/>
);

MemberCenterSelector.propTypes = propTypes;
MemberCenterSelector.defaultProps = defaultProps;
MemberCenterSelector.ItemIdEnums = ItemIdEnums;

export default MemberCenterSelector;
