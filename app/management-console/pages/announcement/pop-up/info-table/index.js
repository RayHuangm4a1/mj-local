import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../lib/moment-utils';
import {
	Table,
	TableEllipsisText,
	StatusTag,
	TextButton,
} from 'ljit-react-components';
import { StatusEnum, StatusTextMap, } from '../utils';

const { ACTIVE, DISABLE, } = StatusEnum;
const propTypes = {
	data: PropTypes.array,
	onClickEdit: PropTypes.func,
	onClickStatusToggle: PropTypes.func,
	onClickDelete: PropTypes.func,
};
const defaultProps = {
	data: [],
	onClickEdit: () => {},
	onClickStatusToggle: () => {},
	onClickDelete: () => {},
};

class InfoTable extends Component {
	constructor() {
		super();

		this._renderStatusTag = this._renderStatusTag.bind(this);
	}
	_renderStatusTag(value) {
		let status;

		if (value === ACTIVE) {
			status = StatusTag.StatusEnums.SUCCESS;
		} else if (value === DISABLE) {
			status = StatusTag.StatusEnums.ERROR;
		}

		return (
			<StatusTag
				status={status}
				text={StatusTextMap[value]}
			/>
		);
	}
	render() {
		const { _renderStatusTag, } = this;
		const {
			onClickEdit,
			onClickStatusToggle,
			onClickDelete,
			data,
		} = this.props;

		return (
			<React.Fragment>
				<Table
					columns={[
						{
							title: '建立时间',
							dataIndex: 'createdAt',
							render: (value) => formatDate(value, 'YYYY/MM/DD')
						},
						{
							title: '標題',
							dataIndex: 'title',
						},
						{
							title: '內容',
							dataIndex: 'content',
							width: '300px',
							render: (value) => (
								<TableEllipsisText
									text={value}
									tooltipWidth={353}
									tooltipPosition={'top'}
									positionToRight={-53}
								/>
							)
						},
						{
							title: '开始显示时间',
							dataIndex: 'startShowingTime',
							render: (value) => formatDate(value, 'YYYY/MM/DD')
						},
						{
							title: '结束显示时间',
							dataIndex: 'endShowingTime',
							render: (value) => formatDate(value, 'YYYY/MM/DD')
						},
						{
							title: '状态',
							dataIndex: 'status',
							render: (value) => _renderStatusTag(value)
						},
						{
							title: '操作',
							dataIndex: 'operation',
							render: (value, record) => {
								const { status, key } = record;

								let displayStatus;

								if (status === ACTIVE) {
									displayStatus = DISABLE;
								} else if (status === DISABLE) {
									displayStatus = ACTIVE;
								}

								return (
									<div style={{ display: 'flex', flexDirection: 'column', }}>
										<TextButton
											text="修改"
											onClick={() => onClickEdit(record)}
										/>
										<TextButton
											text={StatusTextMap[displayStatus]}
											color={displayStatus === DISABLE ? "danger" : 'default'}
											onClick={() => onClickStatusToggle(key, displayStatus)}
										/>
										<TextButton
											text="刪除"
											color="danger"
											onClick={() => onClickDelete(key)}
										/>
									</div>
								);
							}
						}
					]}
					dataSource={data}
				/>
			</React.Fragment>
		);
	}
}

InfoTable.propTypes = propTypes;
InfoTable.defaultProps = defaultProps;

export default InfoTable;
