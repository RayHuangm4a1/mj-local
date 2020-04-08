import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Divider,
	Row,
	Col,
	UploadInputButton,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import './style.styl';

const fakeData = {
	authorizedDomainName: 'authorized.domain.name',
	appleId: 'id@xxx.com',
	appSecret: '123db000-61f3-480d-b2d0-3accc9653605',
	txtFile: [{ name: 'bbb.txt', }],
};

const INPUT_REMIND_TEXT = '如测试站不使用请保持空白';
const inputStyle = { width: 300, };

const propTypes = {
	data: PropTypes.shape({
		authorizedDomainName: PropTypes.string,
		appleId: PropTypes.string,
		appSecret: PropTypes.string,
		txtFile: PropTypes.string,
	}),
};

class SystemSettingPlatformWechatOfficialAccountPage extends Component {
	constructor() {
		super();
		this.state = {
			isMessageVisible: false,
			fileList: [],
			fileName: fakeData.txtFile[0].name,
		};
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleMessageShow = this._handleMessageShow.bind(this);
		this._handleMessageHide = this._handleMessageHide.bind(this);
		this._handleFileChange = this._handleFileChange.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((error, data) => {
			if (error) {
				return null;
			}

			// TODO call api
			this._handleMessageShow();
		});
	}

	_handleMessageShow() {
		this.setState({ isMessageVisible: true, });
	}
	_handleMessageHide() {
		this.setState({ isMessageVisible: false, });
	}

	_handleFileChange(event) {
		let result;

		if (Array.isArray(event)) {
			result = event;
		} else {
			result = event && event.fileList;
		}

		const file = result.slice(-1);

		this.setState({ fileName: file[0].name, });

		return file;
	}

	render() {
		const {
			data = fakeData,
		} = this.props;
		const {
			isMessageVisible,
		} = this.state;

		return (
			<PageBlock className="official-account">
				<PageModal.Message
					visible={isMessageVisible}
					title="消息提示"
					message="設置成功！"
					onClickOk={this._handleMessageHide}
					onClickCancel={this._handleMessageHide}
				/>
				<Form
					ref={(form) => this.formInstance = form}
					submitText="保存设置"
					cancelButtonDisabled
					onSubmit={this._handleSubmit}
				>
					<Row
						type={Row.TypeEnums.FLEX}
						flexLayout={Row.FlexJustifyEnums.CENTER}
					>
						<Col span={20}>
							<FormItem
								className="official-account__item"
								labelColon={false}
								label="微信公众号授权域名"
								columnType={FormItem.ColumnTypeEnums.LARGE}
								itemName="authorizedDomainName"
								itemConfig={{
									initialValue: data.authorizedDomainName,
								}}
								extraMessage={INPUT_REMIND_TEXT}
							>
								<Input style={inputStyle} />
							</FormItem>
							<FormItem
								className="official-account__item"
								labelColon={false}
								label="微信公众号的AppId"
								columnType={FormItem.ColumnTypeEnums.LARGE}
								itemName="appleId"
								itemConfig={{
									initialValue: data.appleId,
								}}
								extraMessage={INPUT_REMIND_TEXT}
							>
								<Input style={inputStyle} />
							</FormItem>
							<FormItem
								className="official-account__item official-account__item--last"
								labelColon={false}
								label="微信公众号的AppSecret"
								columnType={FormItem.ColumnTypeEnums.LARGE}
								itemName="appSecret"
								itemConfig={{
									initialValue: data.appSecret,
								}}
								extraMessage={INPUT_REMIND_TEXT}
							>
								<Input style={inputStyle} />
							</FormItem>
							<Divider />
							<FormItem
								className="official-account__item official-account__item--with-submit"
								labelColon={false}
								label="微信公众号txt档"
								columnType={FormItem.ColumnTypeEnums.LARGE}
								itemName="txtFile"
								itemConfig={{
									initialValue: data.txtFile,
									valuePropName: 'fileList',
									getValueFromEvent: this._handleFileChange,
								}}
							>
								<UploadInputButton
									showUploadList={false}
									acceptExtentions={['txt',]}
									remindText="允许的副档名：txt"
									className="upload-input-button"
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</PageBlock>
		);
	}
}

SystemSettingPlatformWechatOfficialAccountPage.propTypes = propTypes;

export default SystemSettingPlatformWechatOfficialAccountPage;
