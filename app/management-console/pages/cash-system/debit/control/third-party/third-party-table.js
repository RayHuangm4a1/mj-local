import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
	DecimalNumber,
} from 'ljit-react-components';
import { StatusCell }  from '../../../../../components/table/cells';
import { ActivateStatuses, ActivateButtonTextMap, ActivateButtonColorMap, } from '../../../../../components/table/constants';

const { Active: ActiveStatusCell, } = StatusCell;

const propTypes = {
	// TODO adjust to real data
	vendorsData: PropTypes.arrayOf(PropTypes.shape({
		vendorName: PropTypes.string,
		paymentPlatform: PropTypes.number,
		tradeName: PropTypes.string,
		level: PropTypes.arrayOf(PropTypes.string),
		singlePaymentLimit: PropTypes.number,
		status: PropTypes.oneOf(ActivateStatuses.map(item => item.value)),
	})),
	className: PropTypes.string,
	onClickModify: PropTypes.func,
	onClickChangeStatus: PropTypes.func,
};
const defaultProps = {
	vendorsData: [],
	onClickModify: () => {},
	onClickChangeStatus: () => {},
};

class DebitControlThirdPartyTable extends Component {
	constructor() {
		super();
		this.state = {
			isSelectedAll: false,
		};

		this._renderExpandRow = this._renderExpandRow.bind(this);
		this._renderOperationColumn = this._renderOperationColumn.bind(this);
	}

	_renderExpandRow(record) {
		return (
			<div>
				<p>其他：{record.other}</p>
			</div>
		);
	}
	_renderOperationColumn() {
		const { onClickModify, onClickChangeStatus, } = this.props;

		return {
			title: '操作',
			dataIndex: '',
			render: (record, data, index) => {
				return (
					<div style={{ whiteSpace: 'nowrap', }}>
						<TextButton
							text="修改"
							onClick={() => onClickModify(record, index)}
						/>
						<br/>
						<TextButton
							text={ActivateButtonTextMap[record.status]}
							color={ActivateButtonColorMap[record.status]}
							onClick={() => onClickChangeStatus(record, index)}
						/>
					</div>
				);
			}
		};
	}

	render() {
		const {
			vendorsData,
			className,
		} = this.props;
		const {
			_renderExpandRow,
			_renderOperationColumn,
		} = this;

		const columns = [
			{
				title: '商家名称',
				dataIndex: 'vendorName',
			},{
				title: '支付平台',
				dataIndex: 'paymentPlatform',
				render: (paymentPlatform) => paymentPlatformMap[paymentPlatform],
			},{
				title: '商号',
				dataIndex: 'tradeName',
			},{
				title: '层级',
				dataIndex: 'level',
				render: (levels) => levels.map((level, index) => <Fragment key={index}>{levelMap[level]}<br/></Fragment>),
			},{
				title: '单笔出款限制',
				dataIndex: 'singlePaymentLimit',
				render: (singlePaymentLimit) => <DecimalNumber data={singlePaymentLimit} isCurrency hasSeparator/>
			},{
				title: '状态',
				dataIndex: 'status',
				render: (status) => <ActiveStatusCell data={status}/>,
			},
			_renderOperationColumn(),
		];

		return (
			<Table
				rowKey="id"
				columns={columns}
				expandedRowRender={_renderExpandRow}
				dataSource={vendorsData}
				className={className}
			/>
		);
	}
}

DebitControlThirdPartyTable.propTypes = propTypes;
DebitControlThirdPartyTable.defaultProps = defaultProps;

export default DebitControlThirdPartyTable;

// TODO import Map from single source after api's level properties confirm
const levelMap = {
	'1': '新人层',
	'2': '第二层',
	'3': '第三层',
	'4': '第四层',
	'5': '第五层',
	'6': '第六层',
	'7': '第七层',
	'8': '第八层',
	'9': '第九层',
	'10': '第十层',
	'11': '自动加入层',
	'12': '特殊层A',
	'13': '特殊层B',
	'14': '特殊层C',
	'15': '特殊层D',
	'16': '特殊层E',
	'17': '特殊层F',
	'18': '特殊层G',
	'19': '特殊层H',
	'20': '特殊层I',
};

const paymentPlatformMap = {
	'1': '智付',
	'2': '畅汇支付',
	'3': '可乐在线',
};
