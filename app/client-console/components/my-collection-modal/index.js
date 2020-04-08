import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import {
	Modal,
	RemindText,
	DraggableTableInput,
	IconButton,
} from 'ljit-react-components';
import {
	LotteryDataPropTypes,
	MyLotteryCollectionIdsDataPropTypes,
} from '../../lib/prop-types-utils';
import LotterySelector from '../lottery-selector';
import './style.styl';

const propTypes = {
	isVisible: PropTypes.bool,
	selectedLotteryIds: MyLotteryCollectionIdsDataPropTypes,
	lotteryClasses: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	})),
	lotteries: PropTypes.objectOf(
		PropTypes.arrayOf(LotteryDataPropTypes)
	),
	lotteriesMapData: PropTypes.objectOf(LotteryDataPropTypes),
	onSubmitModal: PropTypes.func,
	onCloseModal: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onSubmitModal: () => {},
	onCloseModal: () => {},
};

const PREFIX_CLASS = 'my-collection-modal';

class MyCollectionModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedLotteryIds: props.selectedLotteryIds,
		};
		this._handleSubmitMyCollection = this._handleSubmitMyCollection.bind(this);
		this._handleChangeMyCollection = this._handleChangeMyCollection.bind(this);
		this._handleChangeMyCollectionOrder = this._handleChangeMyCollectionOrder.bind(this);
		this._handleClickDelete = this._handleClickDelete.bind(this);
	}

	_handleSubmitMyCollection() {
		const { selectedLotteryIds } = this.state;

		this.props.onSubmitModal(selectedLotteryIds);
	}

	_handleChangeMyCollection(selectedLotteryIds) {
		this.setState({ selectedLotteryIds, });
	}
	_handleChangeMyCollectionOrder(updatedSelectedLottery) {
		const udpatedSelectedLotteryIds = updatedSelectedLottery.map(lottery => {
			return lottery.id;
		});

		this.setState({
			selectedLotteryIds: udpatedSelectedLotteryIds,
		});
	}
	_handleClickDelete(id) {
		const { selectedLotteryIds, } = this.state;
		const udpatedSelectedLotteryIds = selectedLotteryIds.filter(lotteryId => id !== lotteryId);

		this.setState({
			selectedLotteryIds: udpatedSelectedLotteryIds,
		});
	}

	render() {
		const {
			isVisible,
			lotteryClasses,
			lotteries,
			onCloseModal,
			lotteriesMapData,
		} = this.props;
		const { selectedLotteryIds, } = this.state;
		const {
			_handleSubmitMyCollection,
			_handleChangeMyCollection,
			_handleChangeMyCollectionOrder,
			_handleClickDelete,
		} = this;
		const selectedLotteries = selectedLotteryIds
			.filter(id => lotteriesMapData[id])
			.map(id => lotteriesMapData[id]);

		return (
			<Modal
				className={`${PREFIX_CLASS}`}
				visible={isVisible}
				title={null}
				width={600}
				onClickCancel={onCloseModal}
				onClickOk={_handleSubmitMyCollection}
			>
				<div className={`${PREFIX_CLASS}__title`}>新增收藏</div>
				<LotterySelector
					className={`${PREFIX_CLASS}__my-collection`}
					lotteryClasses={lotteryClasses}
					lotteries={lotteries}
					selectedLotteryIds={selectedLotteryIds}
					onChangeSelectedLotteryIds={_handleChangeMyCollection}
				/>
				<div className={`${PREFIX_CLASS}__title`}>顺位编辑</div>
				<RemindText
					text="可通过鼠标拖动改变排列顺序"
				/>
				<DraggableTableInput
					rowKey="id"
					tableName='selectedLotteriesTable'
					className={`${PREFIX_CLASS}__draggable-table`}
					alignType={DraggableTableInput.AlignTypeEnums.LEFT}
					columns={[
						{
							dataIndex: 'name',
						},
						{
							dataIndex: 'id',
							width: 20,
							render: (id) => {
								return (
									<IconButton
										type={IconButton.IconTypeEnums.CLOSE}
										size={IconButton.SizeEnums.X_SMALL}
										color={IconButton.ColorEnums.GREY}
										onClick={() => _handleClickDelete(id)}
									/>
								);
							}
						}
					]}
					value={selectedLotteries}
					onChange={_handleChangeMyCollectionOrder}
				/>
			</Modal>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			selectedLotteryIds,
		} = this.props;

		if (!isEqual(selectedLotteryIds, prevProps.selectedLotteryIds)) {
			this.setState({ selectedLotteryIds, });
		}
	}
}

MyCollectionModal.propTypes = propTypes;
MyCollectionModal.defaultProps = defaultProps;

export default MyCollectionModal;
