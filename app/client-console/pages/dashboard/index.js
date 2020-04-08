import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Icon,
} from 'ljit-react-components';
import DashboardBlock from '../../components/dashboard-block';
import BettingLong from '../../features/betting-long';
import AnnouncementList from '../../features/announcement-list';
import WinAnnouncementList from '../../features/win-announcement-list';
import ThirdPartyGameBlock from '../../features/third-party-game-block';
import MyCollectionsList from '../../features/my-collection-list';
import HotLotteryList from '../../features/hot-lottery-list';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../lib/feature-toggle-provider';
import { FeatureCodeEnum, } from '../../lib/enums';
import { default as compose } from 'lodash/flowRight';
// TODO get image from api
import bannerImage from '../../images/dashboard/banner-image.png';
import './style.styl';

const {
	IconTypeEnums,
	SizeEnums,
} = Icon;
const {
	NOTIFICATION_2,
} = IconTypeEnums;
const {
	XX_LARGE,
} = SizeEnums;
const {
	OutlineEnum,
} = DashboardBlock;
const {
	TypeEnums,
} = Row;
const TabEnum = {
	ANNOUNCE: 'announce',
	WIN: 'win',
	HOT_LOTTERY_LIST: 'HotLotteryList',
	MY_COLLECTION_LIST: 'MyCollectionsList',
};
const {
	ANNOUNCE,
	WIN,
	HOT_LOTTERY_LIST,
	MY_COLLECTION_LIST,
} = TabEnum;

const PREFIX_CLASS = 'dashboard';
const COL_PREFIX_CLASS = `${PREFIX_CLASS}__col`;
const COL_GUTTER = 24;

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
	layoutConfigs: layoutConfigsPropTypes,
};

function Dashboard({ onNavigate, layoutConfigs }) {
	const [selectedAnnounceId, setSelectedAnnounceId,] = useState(ANNOUNCE);
	const [lotteriesListId, setLotteriesListId ] = useState(HOT_LOTTERY_LIST);
	const {
		toggles: {
			is_ANNOUNCE_Active,
			is_WIN_Active,
			is_BANNER_Active,
		},
	} = layoutConfigs;

	const notificationItems = [];

	if (is_ANNOUNCE_Active) {
		notificationItems.push({
			id: ANNOUNCE,
			name: '公告通知',
			content: <AnnouncementList/>,
		});
	}

	if (is_WIN_Active) {
		notificationItems.push({
			id: WIN,
			name: '中奖信息',
			content: <WinAnnouncementList/>,
		},);
	}

	function _renderBannerBlock() {
		if (is_BANNER_Active) {
			return (
				<DashboardBlock
					size={DashboardBlock.SizeEnum.LARGE}
					items={[{ content: <img src={bannerImage}/> }]}
				/>
			);
		} else {
			return <BettingLong/>;
		}
	}

	return (
		<div className={PREFIX_CLASS}>
			<Row
				className={`${PREFIX_CLASS}__row`}
				type={TypeEnums.FLEX}
				gutter={COL_GUTTER}
			>
				<Col className={`${COL_PREFIX_CLASS} ${COL_PREFIX_CLASS}--fixed-width ${PREFIX_CLASS}__lotteries-list`} >
					<DashboardBlock
						icon={(<Icon type="rocket" size={Icon.SizeEnums.X_LARGE}/>)}
						headerOutline={DashboardBlock.OutlineEnum.LABEL_SELECTOR}
						selectedItemId={lotteriesListId}
						onClickItem={setLotteriesListId}
						items={[
							{
								id: HOT_LOTTERY_LIST,
								name: '热门彩种',
								content: <HotLotteryList onNavigate={onNavigate}/>,
							},
							{
								id: MY_COLLECTION_LIST,
								name: '我的收藏',
								content: <MyCollectionsList onNavigate={onNavigate}/>,
							}
						]}

					/>
				</Col>
				<Col className={COL_PREFIX_CLASS}>
					{_renderBannerBlock()}
				</Col>
			</Row>
			<Row
				className={`${PREFIX_CLASS}__row`}
				type={TypeEnums.FLEX}
				gutter={COL_GUTTER}
			>
				<Col className={`${COL_PREFIX_CLASS} ${COL_PREFIX_CLASS}--fixed-width`}>
					<DashboardBlock
						icon={<Icon type={NOTIFICATION_2} size={XX_LARGE}/>}
						headerOutline={OutlineEnum.LABEL_SELECTOR}
						selectedItemId={selectedAnnounceId}
						onClickItem={setSelectedAnnounceId}
						items={notificationItems}
					/>
				</Col>
				<Col className={COL_PREFIX_CLASS}>
					<ThirdPartyGameBlock
						onNavigate={onNavigate}
					/>
				</Col>
			</Row>
			<div className={`${PREFIX_CLASS}__footer`}>
				Copyright © 2019 BETTING Inc. All rights reserved
			</div>
		</div>
	);
}

Dashboard.propTypes = propTypes;

export default compose(
	withFeatureToggle(FeatureCodeEnum.DASHBOARD)
)(Dashboard);
