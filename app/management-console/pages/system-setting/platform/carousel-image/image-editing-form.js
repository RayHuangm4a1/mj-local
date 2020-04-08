import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	Form,
	FormItem,
	UploadImageButton,
	RadioGroup,
	Select,
	Input,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import {
	TypeEnums,
	ActivityEnums,
	TypeNameMap,
	ActivityNameMap,
} from './utils';

const {
	PROMOTION,
	URL,
	FIXED_IMAGE,
} = TypeEnums;
const {
	ACTIVITYA,
	ACTIVITYB,
} = ActivityEnums;

const propTypes = {
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	isEditing: PropTypes.bool,
	selectedData: PropTypes.shape({
		imageUrl: PropTypes.string,
		type: PropTypes.string,
		activity: PropTypes.string,
		URL: PropTypes.string,
		isOpen: PropTypes.bool,
		isMobile: PropTypes.bool,
	})
};
const defaultProps = {
	isVisible: false,
	onSubmit: () => {},
	onCancel: () => {}
};

class ImageEditingForm extends Component {
	constructor() {
		super();

		this.state = {
			fileList: [],
			type: PROMOTION
		};

		this._handleSubmitCreate = this._handleSubmitCreate.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._handelTypeChange = this._handelTypeChange.bind(this);
		this._renderPromotionInput = this._renderPromotionInput.bind(this);
		this._renderURLInput = this._renderURLInput.bind(this);
	}

	_handleSubmitCreate() {
		const { onSubmit } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				form.resetFields();
			}
		});
	}
	_handleClickCancel() {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel();
		form.resetFields();
	}
	_handelTypeChange(type) {
		this.setState({ type, });
	}
	_renderPromotionInput(defaultActivity) {
		return (
			<FormItem
				itemName="promotion"
				label="活动列表"
				columnType={FormItem.ColumnTypeEnums.SMALL}
				itemConfig={{ initialValue: defaultActivity, }}
			>
				<Select
				// TODO get options
					options={[
						{ label: ActivityNameMap[ACTIVITYA], value: ACTIVITYA, },
						{ label: ActivityNameMap[ACTIVITYB], value: ACTIVITYB, },
					]}
					style={{ width: 130 }}
				/>
			</FormItem>
		);
	}
	_renderURLInput(defaultURL) {
		return (
			<FormItem
				itemName="URL"
				label="网址"
				columnType={FormItem.ColumnTypeEnums.SMALL}
				itemConfig={{ initialValue: defaultURL, }}
			>
				<Input style={{ width: 432 }}/>
			</FormItem>
		);
	}

	render() {
		const { isVisible, selectedData, isEditing } = this.props;
		const { fileList, type, } = this.state;
		const {
			_handleSubmitCreate,
			_handleClickCancel,
			_handelTypeChange,
			_renderPromotionInput,
			_renderURLInput,
		} = this;

		let defaultIsMobile;
		let defaultType;
		let defaultImageFile;
		let defaultURL;
		let defaultActivity;

		if (isEditing && selectedData) {
			defaultIsMobile = selectedData.isMobile;
			defaultType = selectedData.type;
			defaultImageFile = [selectedData.imageFile];
			defaultURL = selectedData.URL;
			defaultActivity = selectedData.activity;
		} else {
			defaultIsMobile = false;
			defaultType = type;
			defaultImageFile = [];
			defaultURL = null;
			defaultActivity = ACTIVITYA;
		}

		return (
			<PageModal
				title="新增轮播图片"
				visible={isVisible}
				onClickOk={_handleSubmitCreate}
				onClickCancel={_handleClickCancel}
				modalSize={Modal.ModalSizeEnum.NORMAL}
			>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					ref={(refForm) => this.formInstance = refForm }
				>
					<FormItem
						itemName="imageFile"
						label="显示图片"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						itemConfig={{ initialValue: defaultImageFile, }}
					>
						<UploadImageButton
							fileList={fileList}
							onChange={fileList => this.setState({ fileList, })}
						/>
					</FormItem>
					<FormItem
						itemName="isMobile"
						label="手机版"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						itemConfig={{ initialValue: defaultIsMobile, }}
					>
						<RadioGroup
							options={[
								{ label: "是", value: true, },
								{ label: "否", value: false, },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="type"
						label="关联类型"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						itemConfig={{ initialValue: defaultType, }}
					>
						<Select
						// TODO get options
							options={[
								{ label: TypeNameMap[PROMOTION], value: PROMOTION, },
								{ label: TypeNameMap[URL], value: URL, },
								{ label: TypeNameMap[FIXED_IMAGE], value: FIXED_IMAGE, },
							]}
							style={{ width: 130 }}
							onChange={_handelTypeChange}
						/>
					</FormItem>
					{type === PROMOTION ? _renderPromotionInput(defaultActivity) : null}
					{type === URL ? _renderURLInput(defaultURL) : null}
				</Form>
			</PageModal>
		);
	}

	componentDidUpdate(prevProps) {
		const { selectedData, isEditing } = this.props;

		if (prevProps.selectedData !== selectedData) {
			if (isEditing && selectedData) {
				this.setState({
					type: selectedData.type,
					fileList: [selectedData.imageFile],
				});
			} else {
				this.setState({
					type: PROMOTION,
					fileList: [],
				});
			}
		}
	}
}

ImageEditingForm.propTypes = propTypes;
ImageEditingForm.defaultProps = defaultProps;

export default ImageEditingForm;
