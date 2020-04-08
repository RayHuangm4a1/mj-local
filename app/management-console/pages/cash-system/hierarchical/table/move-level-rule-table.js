import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
	Divider,
} from 'ljit-react-components';

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		level: PropTypes.arrayOf(PropTypes.string),
		descriptionName: PropTypes.string,

	})),
	onClickEdit: PropTypes.func,
	onClickDelete: PropTypes.func,
	onClickHasIp: PropTypes.func,
	onClickHasRegion: PropTypes.func,
};
const defaultProps = {
	dataSource: [],
	onClickEdit: () => {},
	onClickDelete: () => {},
	onClickHasIp: () => {},
	onClickHasRegion: () => {},
};

class MoveLevelRuleTable extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			dataSource,
			onClickEdit,
			onClickDelete,
			onClickHasIp,
			onClickHasRegion,
		} = this.props;

		return (
			<Table
				rowKey="_id"
				dataSource={dataSource}
				pagination={false}
				columns={[
					{
						title: '层级',
						dataIndex: 'levels',
						width: '20%',
						render: (levels) => levels.join("、")
					},
					{
						title: 'IP',
						dataIndex: 'ipData',
						render: (ipData = [], record) => {
							if (ipData.length > 0) {
								return (
									<TextButton
										text='有'
										onClick={() => onClickHasIp(record)}
									/>
								);
							} else {
								return <div>无</div>;
							}
						}
					},
					{
						title: '地区',
						dataIndex: 'regionData',
						render: (regionData = [], record) => {
							if (regionData.length > 0) {
								return (
									<TextButton
										text='有'
										onClick={() => onClickHasRegion(record)}
									/>
								);
							} else {
								return <div>无</div>;
							}
						}
					},
					{
						title: '投注金额>充值金额',
						dataIndex: 'bettingAmountGreaterThanRechargeAmount',
					},
					{
						title: '惩处层级(特殊层）',
						dataIndex: 'punishmentLevel',
					},
					{
						title: '备注',
						dataIndex: 'comment',
					},
					{
						title: '操作',
						render: (record) => {
							return (
								<React.Fragment>
									<TextButton
										text="修改"
										onClick={() => onClickEdit(record)}
									/>
									<Divider type="vertical"/>
									<TextButton
										color="danger"
										text="删除"
										onClick={() => onClickDelete(record)}
									/>
								</React.Fragment>
							);
						},
					}
				]}
			/>
		);
	}
}

MoveLevelRuleTable.propTypes = propTypes;
MoveLevelRuleTable.defaultProps = defaultProps;

export default MoveLevelRuleTable;
