import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Upload,
} from 'antd';
import { RemindText, } from '../../';
import cx from 'classnames';
import './style.styl';

export const PREFIX_CLASS = 'ljit-upload';

const ListTypeEnums = {
	TEXT: 'text',
	PICTURE: 'picture',
	PICTURE_CARD: 'picture-card',
};
const {
	TEXT,
	PICTURE,
	PICTURE_CARD,
} = ListTypeEnums;

const propTypes = {
	acceptExtentions: PropTypes.arrayOf(PropTypes.string),
	remindText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	onChange: PropTypes.func,
	beforeUpload: PropTypes.func,
	onRemove: PropTypes.func,
	className: PropTypes.string,
	fileList: PropTypes.array,
	fileLimit: PropTypes.number,
	children: PropTypes.node,
	listType: PropTypes.oneOf([
		TEXT,
		PICTURE,
		PICTURE_CARD,
	]),
	isUploadListVisible: PropTypes.bool,
};
const defaultProps = {
	fileLimit: 1,
	acceptExtentions: [],
	listType: TEXT,
	isUploadListVisible: true,
	onChange: () => {},
	beforeUpload: () => {},
	onRemove: () => {},
};

class ManualUpload extends Component {
	constructor() {
		super();
		this._getFileLimit = this._getFileLimit.bind(this);
		this._handleChange = this._handleChange.bind(this);
		this._handelBeforeUpload = this._handelBeforeUpload.bind(this);
		this._renderRemindText = this._renderRemindText.bind(this);
	}

	_getFileLimit() {
		return  0 - this.props.fileLimit;
	}

	_handleChange(_info) {
		const info = Object.assign({}, _info);
		const fileLimit = this._getFileLimit();

		info.fileList = info.fileList.slice(fileLimit);

		this.props.onChange(info);
	}

	_handelBeforeUpload(file, fileList) {
		this.props.beforeUpload(file, fileList);

		// stop auto upload
		return false;
	}

	_renderRemindText() {
		return (
			<RemindText
				className={`${PREFIX_CLASS}__remindtext`}
				text={this.props.remindText}
			/>
		);
	}

	render() {
		const {
			remindText,
			className,
			fileList,
			acceptExtentions,
			children,
			listType,
			isUploadListVisible,
			onRemove,
		} = this.props;

		return (
			<Upload
				className={cx(PREFIX_CLASS, className)}
				accept={getAcceptExtentionStrings(acceptExtentions)}
				listType={listType}
				showUploadList={isUploadListVisible}
				fileList={fileList}
				onChange={this._handleChange}
				beforeUpload={this._handelBeforeUpload}
				onRemove={onRemove}
			>
				{children}
				{remindText ? this._renderRemindText() : null}
			</Upload>
		);
	}
}

ManualUpload.propTypes = propTypes;
ManualUpload.defaultProps = defaultProps;

ManualUpload.ListTypeEnums = ListTypeEnums;

const extentionRule = /\.[0-9a-z]+$/i;
export const getAcceptExtentionStrings = function getAcceptExtentionStrings(acceptExtentions = []) {
	return acceptExtentions
		.map(extention => extentionRule.test(extention) ? extention : `.${extention}`)
		.join(',');
};

export default ManualUpload;
