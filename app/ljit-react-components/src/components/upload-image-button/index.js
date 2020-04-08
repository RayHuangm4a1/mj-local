import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Icon, Button,
} from 'antd';
import {
	ManualUpload,
} from '../../';
import cx from 'classnames';

export const AcceptExtentions = ['gif', 'jpg', 'jpeg', 'png', 'bmp',];

const remindAccept = AcceptExtentions.join('、');

const propTypes = {
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	remindText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	fileList: PropTypes.array,
	fileLimit: PropTypes.number,
};
const defaultProps = {
	text: '选择档案',
	remindText: `允许的副档名：${remindAccept}。`,
	fileLimit: 1,
};

class UploadImageButton extends Component {
	constructor() {
		super();
		this._handleFileChange = this._handleFileChange.bind(this);
		this._handelFileBeforeUpload = this._handelFileBeforeUpload.bind(this);
	}

	_handleFileChange(info) {
		this.props.onChange(info.fileList);
	}

	_handelFileBeforeUpload(file) {
		this.props.onChange([...this.props.fileList, file,]);
	}

	render() {
		const {
			text,
			remindText,
			className,
			fileList,
			fileLimit,
		} = this.props;

		return (
			<ManualUpload
				className={cx('ljit-upload-image-button', className)}
				acceptExtentions={AcceptExtentions}
				listType={ManualUpload.ListTypeEnums.PICTURE}
				fileList={fileList}
				onChange={this._handleFileChange}
				beforeUpload={this._handelFileBeforeUpload}
				remindText={remindText}
				fileLimit={fileLimit}
			>
				<Button>
					<Icon type="upload" />{text}
				</Button>
			</ManualUpload>
		);
	}
}

UploadImageButton.propTypes = propTypes;
UploadImageButton.defaultProps = defaultProps;

export default UploadImageButton;
