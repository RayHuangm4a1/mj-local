import React,{ Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	HorizontalTabs,
	Button,
} from 'ljit-react-components';
import BettingTab from './betting-record-tab';
import TraceTab from './trace-record-tab';
import PageBlock from 'management-console/components/page-block';
import { LotteryTabsPropTypes, } from '../../../../../../lib/prop-types-utils';

const propTypes = {
	lotteryId: PropTypes.number,
	issue: PropTypes.number,
	onBack: PropTypes.func,
	gameType: PropTypes.string,
	lotteryTabsData: LotteryTabsPropTypes,
};

const defaultProps = {
	onBack: () => {},
};

const PREFIX_CLASS = 'lottery-drawing-record';

const TabKeyEnums = {
	BETTING_RECORDS: 'betting-records',
	TRACE_RECORDS: 'trace-records',
};

const {
	BETTING_RECORDS,
	TRACE_RECORDS,
} = TabKeyEnums;

class LotteryGeneralDrawingIssueRecordPage extends Component {
	constructor() {
		super();
		this.state = {
			tabKey: '',
			data: [],
		};
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._renderTabPanes = this._renderTabPanes.bind(this);
	}

	_handleChangeTab(tabKey) {
		// TODO fetch data by tabKey
		this.setState({ tabKey });
	}

	_renderTabPanes() {
		const {
			lotteryId,
			issue,
			gameType,
		} = this.props;
		const { data, } = this.state;

		return data.map((item) =>
			<HorizontalTabs.TabPane
				key={item.key}
				tab={item.tab}
			>
				<item.component
					lotteryId={lotteryId}
					issue={issue}
					gameType={gameType}
				/>
			</HorizontalTabs.TabPane>);
	}

	render() {
		const { _handleChangeTab, _renderTabPanes, } = this;
		const { onBack, } = this.props;
		const { tabKey, } = this.state;

		return (
			<Fragment>
				<div className={`${PREFIX_CLASS}__back-button`}>
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						onClick={onBack}
					>
						返回上一层
					</Button>
				</div>
				<PageBlock
					className={`${PREFIX_CLASS}__record-tab-page`}
				>
					<HorizontalTabs
						activeKey={tabKey}
						onChange={_handleChangeTab}
					>
						{_renderTabPanes()}
					</HorizontalTabs>
				</PageBlock>
			</Fragment>
		);
	}
	componentDidMount() {
		const data = [{
			key: BETTING_RECORDS,
			tab: '投注记录',
			component: BettingTab,
		}, {
			key: TRACE_RECORDS,
			tab:'追号纪录',
			component: TraceTab,
		},];

		this.setState({
			data,
			tabKey: BETTING_RECORDS,
		});
	}
}

LotteryGeneralDrawingIssueRecordPage.propTypes = propTypes;
LotteryGeneralDrawingIssueRecordPage.defaultProps = defaultProps;

export default LotteryGeneralDrawingIssueRecordPage;
