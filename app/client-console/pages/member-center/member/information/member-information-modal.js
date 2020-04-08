import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, FormItem, } from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	modalTitle: PropTypes.string,
	contentTitle: PropTypes.string,
	value: PropTypes.string,
	onClickCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onClickCancel: () => {},
	onSubmit: () => {},
};

class MemberBasicInfoModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
	}
	_handleSubmit() {
		const { onSubmit } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				// TODO: 實作登入頁驗證碼/谷歌動態碼的驗證
				onSubmit(values.value, values.password);

				form.resetFields();
			}
		});
	}
	_handleClickCancel() {
		const { onClickCancel, } = this.props;
		const form = this.formInstance.getForm();

		onClickCancel();
		form.resetFields();
	}

	render() {
		const {
			isVisible,
			modalTitle,
			contentTitle,
		} = this.props;

		const { value, } = this.state;
		const {
			_handleSubmit,
			_handleClickCancel,
		} = this;

		return (
			<SubmitFormModal
				isVisible={isVisible}
				title={modalTitle}
				onClickCancel={_handleClickCancel}
				onClickOk={_handleSubmit}
				width="440px"
				className="ljit-member-basic-info__modal"
			>
				<React.Fragment>
					<Form
						ref={(refForm) => this.formInstance = refForm}
						cancelButtonDisabled
						submitButtonDisabled
					>
						<FormItem
							key="value"
							label={contentTitle}
							itemName="value"
							labelColon={false}
							itemConfig={{
								initialValue: value,
								rules: [
									{
										required: true,
										message: `${contentTitle}不能为空`,
									},{
										max: 16,
										message: `${contentTitle}不能超過16個字元`
									}
								],
							}}
						>
							<Input/>
						</FormItem>
						<FormItem
							key="password"
							label="登录密码"
							itemName="password"
							labelColon={false}
							itemConfig={{
								rules: [
									{
										required: true,
										message: '登录密码不能为空',
									},
								],
							}}
						>
							<Input
								placeholder="登录密码"
								type="password"
							/>
						</FormItem>
					</Form>
				</React.Fragment>
			</SubmitFormModal>
		);
	}
	componentDidUpdate(nextProps) {
		const { value } = this.props;

		if (value !== nextProps.value) {
			this.setState({
				value,
			});
		}
	}
}

MemberBasicInfoModal.propTypes = propTypes;
MemberBasicInfoModal.defaultProps = defaultProps;

export default MemberBasicInfoModal;
