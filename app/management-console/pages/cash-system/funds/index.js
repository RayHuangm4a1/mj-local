import React from 'react';
import PropTypes from 'prop-types';
import {
	Menu,
	Layout,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { PREFIX_CLASS, } from './utils';
import { RouteKeyEnums, } from '../../../routes';
import './style.styl';

const {
	Sider,
	Content,
} = Layout;

const propTypes = {
	onNavigate: PropTypes.func,
	renderedRoutes: PropTypes.object,
	pathName: PropTypes.string,
};

const defaultProps = {
	onNavigate: () => {},
};

const {
	CASHSYSTEM_FUNDS_MEMBER_DAMA,
	CASHSYSTEM_FUNDS_TRANSFER,
} = RouteKeyEnums;

const SiderPathNameAndTitleList = [
	{ pathName: CASHSYSTEM_FUNDS_MEMBER_DAMA, title: '玩家打码量' },
	{ pathName: CASHSYSTEM_FUNDS_TRANSFER, title: '资金转换' },
];

function CashSystemFundsPage({
	pathName,
	renderedRoutes,
	onNavigate,
}) {
	const [selectedKeys, setSelectedKeys] = React.useState(pathName);
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

CashSystemFundsPage.propTypes = propTypes;
CashSystemFundsPage.defaultProps = defaultProps;

export default CashSystemFundsPage;
