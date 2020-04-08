import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	LabelContent,
	Select,
	Button,
} from 'ljit-react-components';
import {
	getLotteryClassPositions,
} from '../../../../../../lib/lotteries';
import { connect, } from '../../../../../../ljit-store-connecter';
import LotteryDrawingTable from '../table';
import { LoadingStatusEnum, } from "../../../../../lib/enums";
import PageModal from '../../../../../components/page-modal';

const { Message: MessageModal, } = PageModal;

const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const propTypes = {
	activeLottery: PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		code: PropTypes.string,
		name: PropTypes.string,
	}),
	drawingsData: PropTypes.array,
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	activeLotteryClassId: PropTypes.number,
	lotteryClassOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.number,
	})),
	onLotteryClassChange: PropTypes.func,
	onClickStop: PropTypes.func,
	onClickModify: PropTypes.func,
	onClickRecords: PropTypes.func,
	onClickLoadMore: PropTypes.func,
	lotteryInterval: PropTypes.object,
	onChangeTimer: PropTypes.func,
	stopLotteryDrawingLoadingStatusMessage: PropTypes.string,
};
const defaultProps = {
	onLotteryClassChange: () => {},
	onClickStop: () => {},
	onClickModify: () => {},
	onClickRecords: () => {},
	onClickLoadMore: () => {},
	onChangeTimer: () => {},
};
const PREFIX_CLASS = 'lottery-drawing-setting';

class LotteryDrawingSetting extends Component {
	constructor() {
		super();

		this.state = {
			isMessageModalVisible: false,
		};

		this._handleChangeInterval = this._handleChangeInterval.bind(this);
		this._handleCloseModal = this._handleCloseModal.bind(this);
	}

	_handleChangeInterval(interval) {
		const { onChangeTimer, drawingsData } = this.props;
		const lotteryId = drawingsData[0].lotteryId;

		onChangeTimer(lotteryId, interval);
	}

	_handleCloseModal() {
		this.setState({ isMessageModalVisible: false, });
	}

	render() {
		const {
			drawingsData,
			loadingStatus,
			activeLotteryClassId,
			lotteryClassOptions,
			onLotteryClassChange,
			onClickStop,
			onClickRecords,
			onClickModify,
			onClickLoadMore,
			lotteryInterval,
			stopLotteryDrawingLoadingStatusMessage,
		} = this.props;
		const {
			isMessageModalVisible,
		} = this.state;
		const {
			_handleCloseModal,
		} = this;
		const { interval, } = lotteryInterval;
		const isLoading = loadingStatus === LOADING;
		const positions = getLotteryClassPositions(activeLotteryClassId);

		return (
			<div>
				<HeaderButtonBar
					left={
						<LabelContent
							label="彩类："
							noMargin
							className="lottery-class-select"
						>
							<Select
								className={`${PREFIX_CLASS}__lottery-class-select`}
								value={activeLotteryClassId}
								options={lotteryClassOptions}
								onChange={onLotteryClassChange}
							/>
						</LabelContent>
					}
					right={
						<Fragment>
							<Select
								className={`${PREFIX_CLASS}__update-period-select`}
								value={interval}
								onChange={this._handleChangeInterval}
								options={[
									{ label: '不更新', value: 'no' },
									{ label: '10秒', value: '10' },
									{ label: '30秒', value: '30' },
									{ label: '60秒', value: '60' },
									{ label: '120秒', value: '120' },
								]}
							>
							</Select>
						</Fragment>
					}
				/>
				<LotteryDrawingTable
					isLoading={isLoading}
					positions={positions}
					drawings={drawingsData}
					onClickStop={onClickStop}
					onClickModify={onClickModify}
					onClickRecords={onClickRecords}
					onClickLoadMore={onClickLoadMore}
				/>
				{/* TODO: 之後要改成像前台用 middleware 判斷的方式串接成功和失敗的訊息通知 */}
				<MessageModal
					visible={isMessageModalVisible}
					message={stopLotteryDrawingLoadingStatusMessage}
					footer={[
						<Button
							key="submit"
							color={Button.ColorEnums.BRIGHTBLUE500}
							outline={Button.OutlineEnums.SOLID}
							onClick={_handleCloseModal}
						>
							确定
						</Button>,
					]}
				/>
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		const { loadingStatus, } = this.props;
		const isDrawingsLoadFailed = prevProps.loadingStatus === LOADING && loadingStatus === FAILED;

		if (isDrawingsLoadFailed) {
			this.setState({
				isMessageModalVisible: true,
			});
		}
	}
}

LotteryDrawingSetting.propTypes = propTypes;
LotteryDrawingSetting.defaultProps = defaultProps;

function mapStateToProp(state) {
	return {
		drawingsData: mapDrawingsToDataSource(state.lotteryDrawings.get('drawings').toArray()),
		loadingStatus: state.lotteryDrawings.get('loadingStatus'),
		lotteryInterval: state.lotteryDrawingManagementPage.get('lotteryInterval').toObject(),
		stopLotteryDrawingLoadingStatusMessage: state.lotteryDrawings.get('stopLotteryDrawingLoadingStatusMessage'),
	};
}

export default connect(mapStateToProp)(LotteryDrawingSetting);

// TODO: 等更多彩種確認後需要移除這隻函式
function mapDrawingsToDataSource(drawings) {
	return drawings.map(drawing => {
		const { opencode, } = drawing;
		const opencodes = opencode && opencode.length > 0 ? opencode.split(',') : [];

		return {
			...drawing,
			key: drawing.id,
			opencodes,
		};
	});
}
