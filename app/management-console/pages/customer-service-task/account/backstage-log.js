import React, { Component, } from 'react';
import { BackstageLogTable, } from '../../../components/table/';
import {
	Row,
	Col,
	LabelContent,
	Button,
	DateRangePicker,
	RemindText,
} from 'ljit-react-components';

const inputStyle = {
	width: '264px',
};

const propTypes = {
};

class MemberOperationLog extends Component {
	constructor() {
		super();
		this.state = {
			logAt: null,
		};
		this._handleTableChange = this._handleTableChange.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleFormReset = this._handleFormReset.bind(this);
	}
	_handleTableChange() {
		// TODO call api sort data
	}
	_handleFormChange() {
		//TODO call form item change api
	}
	_handleSearch() {
		//TODO call search api
	}
	_handleFormReset() {
		this.setState({ logAt: null, });
	}
	render() {

		const {
			_handleTableChange,
			_handleSearch,
			_handleFormReset,
		} = this;

		return (
			<div
				className="backstage-log customer-service-task__section"
			>
				<Row gutter={24}>
					<Col className="backstage-log__col">
						<LabelContent
							label="日期："
							className="backstage-log__label"
						>
							<DateRangePicker
								value={this.state.logAt}
								ranges={['today', 'lastSevenDays', 'lastThirtyDays',] }
								inputStyle={inputStyle}
								onChange={(dates) => {
									this.setState({
										logAt: dates,
									});
								}}
							/>
						</LabelContent>
						<LabelContent>
							<Button
								onClick={_handleSearch}
							>
								查询
							</Button>
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								onClick={_handleFormReset}
								style={{ marginLeft: '16px',  }}
							>
								重置
							</Button>
						</LabelContent>
					</Col>
				</Row>
				<BackstageLogTable
					dataSource={Array.from(Array(20).keys()).map((index) => ({
						_id: `${index + 1}`,
						numbering: `${index + 1}`,
						logAt: `Account - ${index + 1}`,
						content: '修改平台收款帐号 : [alipayabc] [邹意春] [64530808765344921]',
						operator: 'admin',
					}))}
					onTableChange={_handleTableChange}
				/>
				<RemindText
					className="backstage-log__remindtext"
					text={
						<div>
							<div>资料 : 最近一个月</div>
						</div>
					}
				/>
			</div>
		);
	}
}

MemberOperationLog.propTypes = propTypes;

export default MemberOperationLog;
