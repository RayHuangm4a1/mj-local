import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	DraggableTableInput,
	Switch,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { TagsCodeStatusEnums } from '../../../../lib/enums';

const propTypes = {
	isVisible: PropTypes.bool,
	lotteries: PropTypes.array,
	lotteryClassId: PropTypes.number,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	lotteries: [],
	lotteryClassId: '',
	onClickCancel: () => {},
	onClickOk: () => {},
};

const LOTTERIES_FIELD_NAME = 'lotteries';

const {
	HOT,
} = TagsCodeStatusEnums;

class LotteriesPageModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edittingLotteries: props.lotteries,
			_prevProps_LotteryClassId: props.lotteryClassId,
		};
		this._handleChangeHotTagSwitch = this._handleChangeHotTagSwitch.bind(this);
		this._handleChangeDraggableTable = this._handleChangeDraggableTable.bind(this);
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		const {
			lotteries,
			lotteryClassId,
		} = nextProps;
		const {
			_prevProps_LotteryClassId,
		} = prevState;

		if (lotteryClassId !== _prevProps_LotteryClassId) {
			return {
				edittingLotteries: lotteries,
				_prevProps_LotteryClassId: lotteryClassId,
			};
		}
		return null;
	}
	_handleChangeDraggableTable(event) {
		const nextEdittingLotteries = event.map((item, index) => ({
			...item,
			ordering: index + 1,
		}));

		this.setState({
			edittingLotteries: nextEdittingLotteries,
		});
	}
	_handleChangeHotTagSwitch(id, value) {
		const { edittingLotteries } = this.state;

		let nextTags = null;

		const nextEdittingLotteries = edittingLotteries.map((item) => {
			if (item.id === id) {
				nextTags = value ? updateHotTag(item.tags) : deleteHotTag(item.tags);

				return {
					...item,
					tags: nextTags,
				};
			}

			return item;
		});

		this.setState({
			edittingLotteries: nextEdittingLotteries,
		});
	}

	render() {
		const {
			state,
			props,
			_handleChangeHotTagSwitch,
			_handleChangeDraggableTable,
		} = this;
		const {
			isVisible,
			onClickOk,
			onClickCancel,
		} = props;
		const { edittingLotteries, } = state;
		const lotterySubItemTableColumns = [
			{
				title: '彩种',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '热门标签',
				dataIndex: 'tags',
				key: 'tags',
				render: (data, record) => {
					const hotTag = data.filter(item => item.code === HOT);
					const checked = hotTag.length > 0;

					return (
						<Switch
							key={record._id}
							checked={checked}
							onChange={(value) => {
								_handleChangeHotTagSwitch(record.id, value);
							}}
						/>
					);
				},
			},
			{
				title: '顺位',
				dataIndex: 'order',
				key: 'order',
				render: (data, record, index) => (index + 1),
			},
		];

		return (
			<PageModal
				title="修改"
				visible={isVisible}
				onClickOk={() => onClickOk(edittingLotteries)}
				onClickCancel={onClickCancel}
			>
				<DraggableTableInput
					rowKey="_id"
					tableName={LOTTERIES_FIELD_NAME}
					columns={lotterySubItemTableColumns}
					onChange={_handleChangeDraggableTable}
					value={edittingLotteries}
				/>
			</PageModal>
		);
	}
}

LotteriesPageModal.propTypes = propTypes;
LotteriesPageModal.defaultProps = defaultProps;

export default LotteriesPageModal;

function updateHotTag(value) {
	const hotTag = value.filter(item => item.code === HOT);
	const hasHotTag = hotTag.length > 0;

	if (hasHotTag) {
		return value;
	}
	return [
		...value,
		{ code: HOT },
	];
}

function deleteHotTag(value) {
	return value.filter((item) => item.code !== HOT);
}
