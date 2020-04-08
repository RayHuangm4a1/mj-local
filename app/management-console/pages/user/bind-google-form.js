import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	RemindText,
	FormItem,
	Input,
	Button,
	Row,
	Col,
} from 'ljit-react-components';
import qrcode from './images/qrcode.png';
import FormBlock from './form-block';

const inputStyle = {
	width: 397,
};

const propTypes = {
	onSubmit: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
};

class BindGoogleForm extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((error, data) => {
			if (error) {
				return;
			}

			this.props.onSubmit(data);
		});
	}

	render() {
		return (
			<FormBlock
				header="绑定谷歌验证"
				footer={(
					<Button
						className="form-button"
						onClick={this._handleSubmit}
					>
						绑定
					</Button>
				)}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						className="form-item"
						label="动态密码："
						itemName="dynamicPassword"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '请输入动态密码',
								},
							],
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input
							type="password"
							style={inputStyle}
							placeholder="请输入动态密码"
						/>
					</FormItem>
					<Row>
						<Col span={15} offset={9}>
							<div className="qrcode-wrapper">
								<img src={qrcode} />
							</div>
						</Col>
					</Row>
					<RemindText
						className="reminder"
						text={(
							<div>
								<div>注意1： 当扫描QrCode后请立即绑定，如果尚未绑定刷新页面或切换其它页面，请移除旧的在重新扫描QrCode输入动态密码。</div>
								<div>注意2： 当成功绑定谷歌身份验证，转点给下级将强迫使用谷歌身份验证。</div>
								<div>遗失： 如手机更换或遗失等因素造成谷歌身份验证资料遗失，请联系客服申请删除旧谷歌身份验证，删除后即可再重新绑定。</div>
							</div>
						)}
					/>
				</Form>
			</FormBlock>
		);
	}
}

BindGoogleForm.propTypes = propTypes;
BindGoogleForm.defaultProps = defaultProps;

export default BindGoogleForm;
