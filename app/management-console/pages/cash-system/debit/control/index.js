import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Layout,
	Menu,
} from 'ljit-react-components';
import { RouteKeyEnums, } from '../../../../routes';
import PageBlock from '../../../../components/page-block';

const {
	CASHSYSTEM_DEBIT_CONTROL_THIRDPARTY,
	CASHSYSTEM_DEBIT_CONTROL_BANK,
	CASHSYSTEM_DEBIT_CONTROL_AUTO_CHANNEL,
	CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION,
} = RouteKeyEnums;
const {
	Sider,
	Content,
} = Layout;
const {
	ThemeTypeEnums,
	Item,
} = Menu;

const propTypes = {
	pathName: PropTypes.string,
	renderedRoutes: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
};

class CashSystemDebitControlPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKeys: [props.pathName],
		};

		this._handleSelectMenu = this._handleSelectMenu.bind(this);
	}

	_handleSelectMenu({ key, }) {
		this.setState({ selectedKeys: [key], });
	}

	render() {
		const {
			onNavigate,
			renderedRoutes,
		} = this.props;
		const {
			selectedKeys,
		} = this.state;

		return (
			<div className="debit-control">
				<PageBlock className="debit-control__page-block">
					<Layout className="debit-control__layout">
						<Sider theme='light'>
							<Menu
								className="debit-control__menu"
								themeType={ThemeTypeEnums.LIGHT}
								selectedKeys={selectedKeys}
								onMenuItemSelect={this._handleSelectMenu}
							>
								<Item
									key={CASHSYSTEM_DEBIT_CONTROL_THIRDPARTY}
									onClick={() => onNavigate(CASHSYSTEM_DEBIT_CONTROL_THIRDPARTY)}
								>
									<span>第三方代付设定</span>
								</Item>
								<Item
									key={CASHSYSTEM_DEBIT_CONTROL_BANK}
									onClick={() => onNavigate(CASHSYSTEM_DEBIT_CONTROL_BANK)}
								>
									<span>银行代付设定</span>
								</Item>
								<Item
									key={CASHSYSTEM_DEBIT_CONTROL_AUTO_CHANNEL}
									onClick={() => onNavigate(CASHSYSTEM_DEBIT_CONTROL_AUTO_CHANNEL)}
								>
									<span>自动出款通道设定</span>
								</Item>
								<Item
									key={CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION}
									onClick={() => onNavigate(CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION)}
								>
									<span>自动出款条件设定</span>
								</Item>
							</Menu>
						</Sider>
						<Layout className="debit-control__layout">
							<Content className="debit-control__content">
								{renderedRoutes}
							</Content>
						</Layout>
					</Layout>
				</PageBlock>
			</div>
		);
	}
}

CashSystemDebitControlPage.propTypes = propTypes;

export default CashSystemDebitControlPage;
