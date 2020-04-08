import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, TableEllipsisText, HeaderButtonBar, Button, } from 'ljit-react-components';
import StatusCell from './status-cell';
import PageBlock from '../../../components/page-block';
import PageModal from '../../../components/page-modal';
import {
	getRandom,
} from '../../../lib/utils';
import { RouteKeyEnums, } from '../../../routes';
import { parseDateString, formatDate, } from '../../../lib/moment-utils';

const propTypes = {
	data: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
};

const { ANNOUNCEMENT_MARQUEE, } = RouteKeyEnums;

class MarqueePage extends Component {
	constructor() {
		super();
		this.state = {
			formTitle: '',
			formData: {},
			isFormVisible: false,
			modalOperation: '',
			modalMessage: '',
			isModalShow: false,
		};
		this._handleFormShow = this._handleFormShow.bind(this);
		this._handleModalShow = this._handleModalShow.bind(this);
		this._handleModalHide = this._handleModalHide.bind(this);
		this._handleModalSubmit = this._handleModalSubmit.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}
	_handleFormShow(formTitle, formData = {}) {
		this.setState({
			formTitle,
			formData,
			isFormVisible: true,
		});
	}
	_handleModalShow(modalOperation, modalMessage) {
		this.setState({
			modalOperation,
			modalMessage,
			isModalShow: true,
		});
	}
	_handleModalHide() {
		this.setState({
			modalMessage: '',
			isModalShow: false,
		});
	}
	_handleModalSubmit(data) {
		//TODO call api
		this._handleModalHide();
	}
	_renderTable(data) {
		const { onNavigate, } = this.props;
		const { _handleModalShow, } = this;
		const columns = [{
			title: '建立时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		},{
			title: '内容',
			dataIndex: 'content',
			key: 'content',
			render: (content) => <TableEllipsisText className="marquee-ellipsis-text" text={content}/>,
		},{
			title: '开始显示时间',
			dataIndex: 'startAt',
			key: 'startAt',
			render: (time) => <div>{formatDate(time, 'YYYY/MM/DD')}</div>,
		},{
			title: '结束显示时间',
			dataIndex: 'endAt',
			key: 'endAt',
			render: (time) => <div>{formatDate(time, 'YYYY/MM/DD')}</div>,
		},{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (status) => <StatusCell status={status}/>,
		},{
			title: '操作',
			dataIndex: '',
			key: '',
			render: (record) => (
				<Fragment>
					<div>
						<span
							style={{ color: '#1890ff', cursor: 'pointer' }}
							onClick={() =>
								onNavigate(
									`${ANNOUNCEMENT_MARQUEE}/${record._id}/edit`,
									{
										passProps: {
											title: record.title,
											startAt: record.startAt,
											endAt: record.endAt,
											content: record.content,
											levels: record.levels,
										},
									}
								)
							}
						>修改</span>
					</div>
					<div>
						<span
							style={{ color: '#f5222d', cursor: 'pointer' }}
							onClick={() => _handleModalShow('disable', '确定要停用吗？')}
						>停用</span>
					</div>
					<div>
						<span
							style={{ color: '#f5222d', cursor: 'pointer' }}
							onClick={() => _handleModalShow('delete', '确定要删除吗？')}
						>删除</span>
					</div>
				</Fragment>
			),
		},];

		return (
			<Table
				className="marquee-table"
				rowKey='_id'
				alignType={Table.AlignTypeEnums.CENTER}
				dataSource={data}
				columns={columns}
			/>
		);
	}

	render() {
		const {
			data = Array.from(Array(20).keys()).map((index) => ({
				_id: index + 1,
				createdAt: `createdAt ${index + 1}`,
				title: `title - ${index + 1}`,
				content: `content - ${index + 1}`,
				startAt: parseDateString('2019/05/25', 'YYYY/MM/DD'),
				endAt: parseDateString('2019/05/26', 'YYYY/MM/DD'),
				status: getRandom(0, 1) + '',
				levels: Array.from(
					Array(10).keys()
				).map(
					(index) => Math.round(Math.random(1)) * (index + 1)
				).filter(
					x => x > 0
				).map(
					x => x + ''
				),
			})),
			onNavigate,
		} = this.props;
		const {
			_handleModalSubmit,
			_handleModalHide,
			_renderTable,
		} = this;
		const { isModalShow, modalMessage, } = this.state;

		return (
			<PageBlock className="announcement-marquee__table">
				<PageModal.Message
					visible={isModalShow}
					onClickOk={_handleModalSubmit}
					onClickCancel={_handleModalHide}
					message={modalMessage}
				/>
				<HeaderButtonBar
					left={[]}
					right={
						<Button
							outline={Button.OutlineEnums.SOLID}
							icon={Button.IconEnums.PLUS}
							onClick={() =>
								onNavigate(`${ANNOUNCEMENT_MARQUEE}/create`)}
						>
							新增公告
						</Button>
					}
				/>
				{_renderTable(data)}
			</PageBlock>
		);
	}
}

MarqueePage.propTypes = propTypes;

export default MarqueePage;
