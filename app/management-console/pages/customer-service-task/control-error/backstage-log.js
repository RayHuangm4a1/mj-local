import React, { Component, } from 'react';
import { BackstageLogTable, } from '../../../components/table';
import {
	Row,
	Col,
	DateRangePicker,
	RemindText,
	Form,
	FormItem,
	Select,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';

const inputStyle = {
	width: '264px',
};

const propTypes = {
};

class BackstageLog extends Component {
	constructor() {
		super();
		this.state = {
			logAt: null,
		};

		this._handleChangeForm = this._handleChangeForm.bind(this);
	}
	_handleChangeForm() {
		//TODO call form item change api
	}
	render() {
		return (
			<PageBlock>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					ref={(refForm) => this.refForm = refForm }
					onChange={this._handleChangeForm}
				>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								label="登录IP位址"
								itemName="Ip"
								style={{ display: 'flex', }}
							>
								<Select
									style={inputStyle}
									placeholder="请选择平台"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="时间"
								itemName="loginAt"
								style={{ display: 'flex', }}
							>
								<DateRangePicker
									ranges={['today', 'lastSevenDays', 'lastThirtyDays',] }
									inputStyle={inputStyle}
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<BackstageLogTable
					dataSource={Array.from(Array(20).keys()).map((index) => ({
						_id: `${index + 1}`,
						numbering: `${index + 1}`,
						logAt: `Account - ${index + 1}`,
						content: '修改平台收款帐号 : [alipayabc] [邹意春] [64530808765344921]',
						operator: 'admin',
					}))}
					isShowingOperator={false}
				/>
				<RemindText
					text={
						<div>
							<div>资料 : 最近一个月</div>
						</div>
					}
				/>
			</PageBlock>
		);
	}
}

BackstageLog.propTypes = propTypes;

export default BackstageLog;
