import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormItem, Input, Button, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';

const propTypes = {
	data: PropTypes.object,
};

const inputStyle = {
	width: '100%',
	maxWidth: '300px'
};

class SystemSettingGlobalUrlPage extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {});
	}

	render() {
		return (
			<Fragment>
				<PageBlock.Title text="网址设置"/>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					ref={(refForm) => this.formInstance = refForm }
				>
					<FormItem
						label="测试站注册链接"
						itemName="registerURL"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						labelColon={false}
						extraMessage="如测试站不使用请保持空白"
					>
						<Input
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						label="测试站登录链接"
						itemName="loginURL"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						labelColon={false}
						extraMessage="如测试站不使用请保持空白"
					>
						<Input
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						label="出入款资料汇出网址"
						itemName="exportURL"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						labelColon={false}
						extraMessage="如测试站不使用请保持空白"
					>
						<Input
							style={inputStyle}
						/>
					</FormItem>
					<div style={{ textAlign: 'right' }}>
						<Button outline={Button.OutlineEnums.SOLID} onClick={this._handleSubmit}>保存设置</Button>
					</div>
				</Form>
			</Fragment>
		);
	}
}

SystemSettingGlobalUrlPage.propTypes = propTypes;

export default SystemSettingGlobalUrlPage;
