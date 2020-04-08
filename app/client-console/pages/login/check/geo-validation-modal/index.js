import React, { useState, useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	LabelText,
	Form,
	FormItem,
	RadioGroup,
	Input,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onClickCancel: PropTypes.func.isRequired,
	onClickOk: PropTypes.func.isRequired,
};

const defaultProps = {
	isVisible: false,
};

const PREFIX_CLASS = "geo-validation-modal";

const GeoValidationTypeEnum = {
	USERNAME: 'username',
	GOOGLE_PASSWORD: 'google-password'
};

const {
	USERNAME,
	GOOGLE_PASSWORD,
} = GeoValidationTypeEnum;

const PlaceholderText = {
	[USERNAME]: '请输入持卡人姓名',
	[GOOGLE_PASSWORD]: '请输入谷歌动态密码',
};

function GeoValidationModal({
	isVisible,
	onClickCancel,
	onClickOk,
}) {
	const formInstance = useRef(null);
	const [placeholder, setPlaceholder] = useState(PlaceholderText[USERNAME]);

	function _handleClickOk() {
		const form = formInstance.current.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				onClickOk(values);
			}
		});
	}

	function _handleChangeRadio(event) {
		const form = formInstance.current.getForm();
		const value = event.target.value;

		form.resetFields();
		setPlaceholder(PlaceholderText[value]);
	}

	return (
		<SubmitFormModal
			className={PREFIX_CLASS}
			title="帐户安全提示"
			isVisible={isVisible}
			onClickOk={_handleClickOk}
			onClickCancel={onClickCancel}
		>
			<div className={`${PREFIX_CLASS}__content`}>
				<p>
					检测到您本次登录地点与上次不符，为保证帐户安全需验证持卡人姓名或谷歌动态密码。
				</p>
				<div className={`${PREFIX_CLASS}__login-info`}>
					<LabelText
						label="上次登录地点："
						text="台湾省中华电信(HiNet)数据中心"
						labelColType={LabelText.SizeEnums.LARGE}
						isFixedWidth={false}
					/>
					<LabelText
						label="本次登录地点："
						text="台湾省中华电信(HiNet)数据中心"
						labelColType={LabelText.SizeEnums.LARGE}
						isFixedWidth={false}
					/>
				</div>
				<Form
					ref={formInstance}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						label="验证方式："
						key="type"
						itemName="type"
						itemConfig={{
							initialValue: USERNAME,
						}}
					>
						<RadioGroup
							options={[
								{ label: '持卡人姓名', value: USERNAME, },
								{ label: '谷歌动态密码', value: GOOGLE_PASSWORD, },
							]}
							onChange={_handleChangeRadio}
						/>
					</FormItem>
					<FormItem
						key="inputValue"
						itemName="inputValue"
					>
						<Input placeholder={placeholder} />
					</FormItem>
				</Form>
			</div>
		</SubmitFormModal>
	);
}

GeoValidationModal.propTypes = propTypes;
GeoValidationModal.defaultProps = defaultProps;
GeoValidationModal.GeoValidationTypeEnum = GeoValidationTypeEnum;

export default GeoValidationModal;
