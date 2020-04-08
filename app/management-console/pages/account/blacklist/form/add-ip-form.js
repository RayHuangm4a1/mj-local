import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Row,
	Col,
	Input,
	HeaderButtonBar,
	Button,
} from 'ljit-react-components';

const propTypes = {
	onClickAddIp: PropTypes.func,
	onClickMultiAdd: PropTypes.func,
	onClickImport: PropTypes.func,
};

const defaultProps = {
	onClickAddIp: () => {},
	onClickMultiAdd: () => {},
	onClickImport: () => {},
};

class AddIpForm extends Component {
	constructor() {
		super();

		this._handleClickAddIp = this._handleClickAddIp.bind(this);
	}
	_handleClickAddIp() {
		const { onClickAddIp, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onClickAddIp(values);
				form.resetFields();
			}
		});
	}

	render() {
		const { onClickMultiAdd, onClickImport, } = this.props;
		const { _handleClickAddIp, } = this;

		return (
			<Form
				ref={formRef => this.formInstance = formRef }
				submitButtonDisabled
				cancelButtonDisabled
			>
				<Row>
					<Col span={12}>
						<FormItem
							label="登陆 IP "
							itemName="ip"
							columnType={FormItem.ColumnTypeEnums.SMALL}
						>
							<Input placeholder="请输入IP" />
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem
							label="备注"
							itemName="remark"
							columnType={FormItem.ColumnTypeEnums.SMALL}
						>
							<Input placeholder="请输入备注" />
						</FormItem>
					</Col>
					<Col span={24}>
						<HeaderButtonBar
							right={
								<div>
									<Button
										icon="plus"
										outline={Button.OutlineEnums.HOLLOW}
										style={{ marginRight: 16, }}
										onClick={onClickImport}
									>
										单式汇入
									</Button>
									<Button
										icon="plus"
										outline={Button.OutlineEnums.HOLLOW}
										style={{ marginRight: 16, }}
										onClick={onClickMultiAdd}
									>
										批量新增
									</Button>
									<Button
										color={Button.ColorEnums.BRIGHTBLUE500}
										icon="plus"
										onClick={_handleClickAddIp}
									>
										新增IP
									</Button>
								</div>
							}
						/>
					</Col>
				</Row>
			</Form>
		);
	}
}

AddIpForm.propTypes = propTypes;
AddIpForm.defaultProps = defaultProps;

export default AddIpForm;
