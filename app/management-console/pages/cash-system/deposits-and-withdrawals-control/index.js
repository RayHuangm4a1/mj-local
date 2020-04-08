import React from 'react';
import PropTypes from 'prop-types';
import {
	Layout,
	Menu,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import { PREFIX_CLASS, } from './utils';
import './style.styl';

const {
	Sider,
	Content,
} = Layout;

const {
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_DEPOSIT,
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_WITHDRAWALS,
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_SINGLE_ACCOUNT_SETTINGS,
} = RouteKeyEnums;

const SiderPathNameAndTitleList = [
	{ pathName: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_DEPOSIT, title: '充值设定' },
	{ pathName: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_WITHDRAWALS, title: '出款设定' },
	{ pathName: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_SINGLE_ACCOUNT_SETTINGS, title: '单一会员出款设定' },
];

const propTypes = {
	onNavigate: PropTypes.func,
	renderedRoutes: PropTypes.object,
	pathName: PropTypes.string,
};

const defaultProps = {
	onNavigate: () => {},
};

function CasySystemDepositsAndWithdrawalControlPage({
	renderedRoutes,
	onNavigate,
	pathName,
}) {
	const [selectedKeys, setSelectedKeys] = React.useState([pathName,]);
	const _handleMenuSelect = ({ key, }) => {
		setSelectedKeys([key,]);
	};
	const _renderSideMenu = () => {
		return (
			<Sider theme='light'>
				<Menu
					themeType={Menu.ThemeTypeEnums.LIGHT}
					selectedKeys={selectedKeys}
					onMenuItemSelect={_handleMenuSelect}
				>
					{SiderPathNameAndTitleList.map(item => (
						<Menu.Item
							key={item.pathName}
							onClick={() => onNavigate(item.pathName)}
						>
							<span>{item.title}</span>
						</Menu.Item>
					))}
				</Menu>
			</Sider>
		);
	};

	return (
		<PageBlock className={PREFIX_CLASS}>
			<Layout>
				{_renderSideMenu()}
				<Layout>
					<Content>
						{renderedRoutes}
					</Content>
				</Layout>
			</Layout>
		</PageBlock>
	);
}

CasySystemDepositsAndWithdrawalControlPage.propTypes = propTypes;
CasySystemDepositsAndWithdrawalControlPage.onNavigate = defaultProps;

export default CasySystemDepositsAndWithdrawalControlPage;
