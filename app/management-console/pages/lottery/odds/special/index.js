import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../../components/page-block';
import { Layout, Menu } from 'ljit-react-components';
import { RouteKeyEnums, } from '../../../../routes';
import { connect } from 'ljit-store-connecter';
import { lotterySpecialManagementActions } from '../../../../controller';
import { withLoadingStatusNotification, } from '../../../../../lib/notify-handler';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../../lib/enums';
import './style.styl';

const { Sider, Content, } = Layout;
const {
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING,
} = RouteKeyEnums;
const {
	startInitLotterySpecialManagementPageAction,
} = lotterySpecialManagementActions;

const propTypes = {
	onNavigate: PropTypes.func,
	renderedRoutes: PropTypes.object,
	pathName: PropTypes.string,
	startInitLotterySpecialManagementPageAction: PropTypes.func.isRequired,
	layoutConfigs: layoutConfigsPropTypes,
};

const defaultProps = {
	onNavigate: () => {},
};

class LotteryOddsSpecialPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKeys: [props.pathName],
		};
		this._handleMenuSelect = this._handleMenuSelect.bind(this);
	}
	_handleMenuSelect({ key, }) {
		this.setState({ selectedKeys: [key], });
	}
	render() {
		const { _handleMenuSelect } = this;
		const { selectedKeys } = this.state;
		const { onNavigate, renderedRoutes, layoutConfigs: { isFeatureActive, }, } = this.props;
		const multiperiodOdds = LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS;
		const multiperiodBetting = LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING;

		if (!isFeatureActive) {
			return null;
		}
		return (
			<PageBlock className="ljit-odds-special">
				<Layout>
					<Sider theme='light'>
						<Menu
							themeType={Menu.ThemeTypeEnums.LIGHT}
							selectedKeys={selectedKeys}
							onMenuItemSelect={_handleMenuSelect}
						>
							<Menu.Item key={multiperiodOdds} onClick={() => onNavigate(multiperiodOdds)}>
								<span>多期未中賠率限制</span>
							</Menu.Item>
							<Menu.Item key={multiperiodBetting} onClick={() => onNavigate(multiperiodBetting)}>
								<span>多期未中投注量设置</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Content className="odds-special-content">
							{renderedRoutes}
						</Content>
					</Layout>
				</Layout>
			</PageBlock>
		);
	}
	componentDidMount() {
		const { startInitLotterySpecialManagementPageAction } = this.props;

		startInitLotterySpecialManagementPageAction();
	}
}

LotteryOddsSpecialPage.propTypes = propTypes;
LotteryOddsSpecialPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		loadingStatus: state.lotterySpecialManagementPage.get('loadingStatus'),
		loadingStatusMessage: state.lotterySpecialManagementPage.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startInitLotterySpecialManagementPageAction: () => dispatch(startInitLotterySpecialManagementPageAction()),
	};
}

export default compose(
	[
		withFeatureToggle(FeatureCodeEnum.LOTTERY_ODDS_SPECIAL),
		connect(mapStateToProps, mapDispatchToProps),
	]
)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'loadingStatus',
				loadingStatusMessage: 'loadingStatusMessage',
			},
		],
		LotteryOddsSpecialPage
	)
);
