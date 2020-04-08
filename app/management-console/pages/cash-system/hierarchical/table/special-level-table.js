import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
} from 'ljit-react-components';
import { FinanceLevelsDataPropTypes, } from '../../../../lib/prop-types-utils';
import { FinanceLevelStatusEnum, } from '../../../../lib/enums';
import EnableStatusCell from '../enable-status-cell';

const AUTO_JOIN_FINANCE_LEVEL_ID = 11;

const propTypes = {
	levels: FinanceLevelsDataPropTypes,
	isLoading: PropTypes.bool,
	onClickNumberOfUsers: PropTypes.func,
	onClickLevelEdition: PropTypes.func,
	onClickAutoLevelEdition: PropTypes.func,
};
const defaultProps = {
	levels: [],
	isLoading: false,
	onClickNumberOfUsers: () => {},
	onClickLevelEdition: () => {},
	onClickAutoLevelEdition: () => {},
};

class SpecialLevelTable extends Component {
	render() {
		const {
			levels,
			isLoading,
			onClickNumberOfUsers,
			onClickLevelEdition,
			onClickAutoLevelEdition,
		} = this.props;
		const columns = [
			{
				title: '层级',
				dataIndex: 'displayLevel',
				width: '20%',
			},
			{
				title: '描述名称',
				dataIndex: 'name',
			},
			{
				title: '会员人数',
				dataIndex: 'numOfUsers',
				render: (data, record) => {
					return (
						<TextButton
							text={data}
							onClick={() => onClickNumberOfUsers(record)}
						/>
					);
				},
			},
			{
				title: '自动加入',
				dataIndex: 'isAutoJoin',
				render: (data, record) => checkIsAutoJoinLevel(record.id) ? '是' : '否',
			},
			{
				title: '状态',
				dataIndex: 'status',
				render: (data) => {
					const isEnabled = (data === FinanceLevelStatusEnum.ENABLE) ? 'enabled' : 'disabled';

					return <EnableStatusCell data={isEnabled}/>;
				},
			},
			{
				title: '操作',
				dataIndex: 'operation',
				render: (data, record) => {
					let text = '修改';

					let handler = () => onClickLevelEdition(record);

					if (checkIsAutoJoinLevel(record.id)) {
						text = '修改自动加入条件';
						handler = () => onClickAutoLevelEdition(record);
					}

					return (
						<React.Fragment>
							<TextButton
								text={text}
								onClick={handler}
							/>
						</React.Fragment>
					);
				},
			},
		];

		return (
			<Table
				rowKey="id"
				dataSource={levels}
				isLoading={isLoading}
				pagination={false}
				columns={columns}
			/>
		);
	}
}

SpecialLevelTable.propTypes = propTypes;
SpecialLevelTable.defaultProps = defaultProps;

function checkIsAutoJoinLevel(levelId) {
	return AUTO_JOIN_FINANCE_LEVEL_ID === levelId;
}

export default SpecialLevelTable;
