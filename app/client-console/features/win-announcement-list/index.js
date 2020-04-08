import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	DecimalNumber,
	ListItem,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import DataInlineList from '../../components/data-inline-list';
import './style.styl';

const YEN = '\u00a5';
const PREFIX_CLASS = 'win-announcement-list';

const propTypes = {
	// TODO update prop types with schema
	winsData: PropTypes.arrayOf(PropTypes.object),
};

const WinAnnouncementList = ({
	winsData = [],
}) => {
	// TODO fetch real data

	return (
		<DataInlineList
			className={PREFIX_CLASS}
			data={winsData}
			renderItem={(data = {}) => (
				<ListItem
					title={data.encryptedUsername}
					titleHint={data.lotteryName}
					prefix={(
						<img
							className={`${PREFIX_CLASS}__avatar`}
							// TODO set prefix prop for avatarUrl,
							src="https://i.pravatar.cc/100"
						/>
					)}
					content={(
						<Fragment>
							中獎
							<span className={`${PREFIX_CLASS}__reward-text`}>
								{YEN}
								<DecimalNumber
									data={data.reward}
									decimalPlaces={2}
									hasSeparator
								/>
							</span>
						</Fragment>
					)}
				/>
			)}
		/>
	);
};

WinAnnouncementList.propTypes = propTypes;

function mapStateToProps() {
	return {
		// TODO inject real data
		winsData: fakeWinsData,
	};
}
function mapDispatchToProps() {
	return {
		// TODO inject actions
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WinAnnouncementList);

const fakeWinsData = [
	{
		id: 1,
		encryptedUsername: 'xc***dc',
		lotteryName: '上海1.5分彩',
		reward: 100,
	},
	{
		id: 2,
		encryptedUsername: 'im***893',
		lotteryName: '广东快乐十分',
		reward: 580,
	},
	{
		id: 3,
		encryptedUsername: 'jc***213',
		lotteryName: '北京时时彩',
		reward: 6802,
	},
	{
		id: 4,
		encryptedUsername: 'kk***839',
		lotteryName: '重庆时时彩',
		reward: 970,
	},
];
