import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Icon,
	Button,
	DrawingInfoCard,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { notifications, } from '../../../lib/notify-handler';
import {
	lotteryDrawingRecordActions,
	myLotteryCollectionsActions,
	notifyHandlingActions
} from '../../controller';
import { MyLotteryCollectionIdsDataPropTypes, } from '../../lib/prop-types-utils';
import DrawingCountingDownCard from '../../components/drawing-counting-down-card';
import './style.styl';

const { notifyHandlingAction, } = notifyHandlingActions;
const { infoNotifications, } = notifications;
const { Info, } = infoNotifications;
const { fetchLotteryDrawingRecordsAction, } = lotteryDrawingRecordActions;
const { updateMyLotteryCollectionsAction, } = myLotteryCollectionsActions;
const { OutlineEnums, } = Button;
const {
	TypeEnums,
	ColorEnums,
	FormatEnums,
} = DrawingCountingDownCard;
const {
	IconTypeEnums,
	SizeEnums,
} = Icon;
const {
	X_SMALL
} = SizeEnums;
const {
	STAR_FILL,
	STAR_OUTLINE,
} = IconTypeEnums;
const PREFIX_CLASS = 'lottery-drawing-info-card';
const TextPropTypes = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.element,
]);

const propTypes = {
	lotteryDrawingsData: PropTypes.object.isRequired,
	lotteriesMapData: PropTypes.object.isRequired,
	lotteryId: PropTypes.string.isRequired,
	lotteryClassId: PropTypes.string.isRequired,
	className: PropTypes.string,
	favoriteText: TextPropTypes,
	myLotteryCollectionIdsData: MyLotteryCollectionIdsDataPropTypes,
	fetchLotteryDrawingRecordsAction: PropTypes.func,
	notifyHandlingAction: PropTypes.func.isRequired,
	updateMyLotteryCollectionsAction: PropTypes.func.isRequired,
};
const defaultProps = {
	favoriteText: '收藏',
};

class LotteryDrawingInfoCard extends Component {
	constructor() {
		super();
		this.state = {
			DrawingInfoCard: () => null,
		};

		this._handleClickFavorite = this._handleClickFavorite.bind(this);
		this._renderFavoriteButton = this._renderFavoriteButton.bind(this);
		this._handleCountCloseTimeUp = this._handleCountCloseTimeUp.bind(this);
		this._renderClosingCountdown = this._renderClosingCountdown.bind(this);
		this._renderDrawingCountdown = this._renderDrawingCountdown.bind(this);
	}

	_handleClickFavorite() {
		const {
			lotteryId,
			updateMyLotteryCollectionsAction,
			myLotteryCollectionIdsData,
		} = this.props;
		const convertedLotteryId = convertToInteger(lotteryId);
		const isFavoriteActive = checkIsFavoriteActive(convertedLotteryId, myLotteryCollectionIdsData);

		let updatedCollectionIds = myLotteryCollectionIdsData.slice();

		if (isFavoriteActive) {
			updatedCollectionIds = updatedCollectionIds.filter(id => id !== convertedLotteryId);
		} else {
			updatedCollectionIds.unshift(convertedLotteryId);
		}

		updateMyLotteryCollectionsAction(updatedCollectionIds);
	}

	_renderFavoriteButton() {
		const {
			favoriteText,
			lotteryId,
			myLotteryCollectionIdsData,
		} = this.props;
		const iconType = isFavoriteActive ? STAR_FILL : STAR_OUTLINE;
		const convertedLotteryId = convertToInteger(lotteryId);
		const isFavoriteActive = checkIsFavoriteActive(convertedLotteryId, myLotteryCollectionIdsData);

		return (
			<Button
				outline={isFavoriteActive ? OutlineEnums.SOLID : OutlineEnums.HOLLOW}
				color={Button.ColorEnums.PINKISH}
				className={cx(`${PREFIX_CLASS}__favorite`,`${PREFIX_CLASS}__extra`, {
					[`${PREFIX_CLASS}__favorite--active`]: isFavoriteActive,
				})}
				onClick={this._handleClickFavorite}
			>
				<Icon
					className={`${PREFIX_CLASS}__favorite-icon`}
					type={iconType}
					size={X_SMALL}
				/>
				{favoriteText}
			</Button>
		);
	}

	_handleCountCloseTimeUp() {
		const {
			lotteryDrawingsData,
			lotteryId,
			fetchLotteryDrawingRecordsAction,
			notifyHandlingAction,
		} = this.props;
		const { issue } = lotteryDrawingsData[lotteryId].current;
		const convertedLotteryId = convertToInteger(lotteryId);

		notifyHandlingAction(new Info(`第 ${issue} 期已封盘！目前投注为 ${issue + 1} 期`));
		fetchLotteryDrawingRecordsAction(convertedLotteryId);
	}
	_renderClosingCountdown() {
		const { lotteryDrawingsData, lotteryId } = this.props;
		const { _handleCountCloseTimeUp } = this;

		if (!lotteryDrawingsData[lotteryId]) return null;
		const { closedAt } = lotteryDrawingsData[lotteryId].current;

		return (
			<DrawingCountingDownCard
				className={`${PREFIX_CLASS}__closing-countdown`}
				type={TypeEnums.DEFAULT}
				color={ColorEnums.ORANGE}
				closedAt={new Date(closedAt)}
				onFinish={_handleCountCloseTimeUp}
			/>
		);
	}
	_renderDrawingCountdown() {
		const { lotteryDrawingsData, lotteryId } = this.props;

		if (!lotteryDrawingsData[lotteryId]) return null;
		const { openedAt } = lotteryDrawingsData[lotteryId].previous;

		return (
			<DrawingCountingDownCard
				className={`${PREFIX_CLASS}__drawing-countdown`}
				type={TypeEnums.DEFAULT}
				color={ColorEnums.GRAY}
				closedAt={new Date(openedAt)}
				timeOutText="--"
				format={FormatEnums.SS}
			/>
		);
	}

	render() {
		const {
			className,
			lotteryId,
			lotteriesMapData,
			lotteryDrawingsData,
		} = this.props;
		const {
			DrawingInfoCard
		} = this.state;
		const lotteryMapData = getLotteryMapData(lotteryId, lotteriesMapData);
		const lotteryDrawingData = getLotteryDrawingData(lotteryId, lotteryDrawingsData);
		const {
			previous = {},
			current = {},
		} = lotteryDrawingData;
		const {
			name,
		} = lotteryMapData;
		const {
			opencode = '',
		} = previous;

		return (
			<div className={cx(PREFIX_CLASS, className)}>
				<div className={`${PREFIX_CLASS}__column `}>
					{this._renderFavoriteButton()}
					<div className={`${PREFIX_CLASS}__title`}>
						{name}
					</div>
				</div>
				<div className={`${PREFIX_CLASS}__column ${PREFIX_CLASS}__card`}>
					<div className={`${PREFIX_CLASS}__drawing-text`}>
						{current.issue ? <div>{`第 ${current.issue} 期`}</div> : null}
						<div>
							投注剩余时间
						</div>
					</div>
					{this._renderClosingCountdown()}
				</div>
				<div className={`${PREFIX_CLASS}__column ${PREFIX_CLASS}__card`}>
					<div className={`${PREFIX_CLASS}__drawing-text`}>
						{previous.issue ? <div>{`第 ${previous.issue} 期`}</div> : null}
						<div>
							[{this._renderDrawingCountdown()}]秒后开奖
						</div>
					</div>
					<DrawingInfoCard
						opencode={opencode || '开,奖,中'}
					/>
				</div>
			</div>
		);
	}
	componentDidMount() {
		const {
			lotteryClassId
		} = this.props;

		this.setState({
			DrawingInfoCard: getDrawingInfoCard(lotteryClassId),
		});
	}
	componentDidUpdate(prevProps) {
		const {
			lotteryClassId
		} = this.props;

		if (prevProps.lotteryClassId !== lotteryClassId) {
			this.setState({
				DrawingInfoCard: getDrawingInfoCard(lotteryClassId),
			});
		}
	}
}

LotteryDrawingInfoCard.propTypes = propTypes;
LotteryDrawingInfoCard.defaultProps = defaultProps;

// TODO 當所有彩類都有對應的 DrawingInfoCard 後移除此 Function，直接使用 DrawingInfoCard.get(lotteryClassId) 就可以
function getDrawingInfoCard(lotteryClassId) {
	let InfoCard;

	try {
		InfoCard = DrawingInfoCard.get(lotteryClassId);
	} catch {
		InfoCard = DrawingInfoCard.get(0);
	}
	return InfoCard;
}

function getLotteryMapData(lotteryId, lotteriesMapData) {
	return lotteriesMapData[lotteryId] || {};
}
function getLotteryDrawingData(lotteryId, lotteryDrawingsData) {
	return lotteryDrawingsData[lotteryId] || {};
}
function convertToInteger(value) {
	if (isNaN(parseFloat(value))) {
		return 0;
	}

	return parseInt(value, 10);
}
function checkIsFavoriteActive(lotteryId, myLotteryCollectionIdsData = []) {
	return myLotteryCollectionIdsData.indexOf(lotteryId) > -1;
}

function mapStateToProps(state) {
	const {
		myLotteryCollections: myLotteryCollectionsReducer,
	} = state;

	return {
		lotteryDrawingsData: state.lotteryDrawings.get('data').toObject(),
		lotteriesMapData: state.lotteries.get('lotteriesMapData').toObject(),
		myLotteryCollectionIdsData: myLotteryCollectionsReducer.get('collectionIdsData').toArray(),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchLotteryDrawingRecordsAction: (lotteryId) => dispatch(fetchLotteryDrawingRecordsAction(lotteryId)),
		notifyHandlingAction: (notify) => dispatch(notifyHandlingAction(notify)),
		updateMyLotteryCollectionsAction: (...args) => dispatch(updateMyLotteryCollectionsAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LotteryDrawingInfoCard);
