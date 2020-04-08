import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Icon, Button,
} from 'antd';
import {
	ManualUpload,
	Input,
} from '../../';
import cx from 'classnames';
import './style.styl';

export const PREFIX_CLASS = 'ljit-upload-input-button';

export const FILE_LIMIT = 1;

const propTypes = {
	acceptExtentions: PropTypes.arrayOf(PropTypes.string),
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	remindText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	onChange: PropTypes.func,
	className: PropTypes.string,
	fileList: PropTypes.array,
};
const defaultProps = {
	text: '上传档案',
	onChange: () => {},
};

class UploadInputButton extends Component {
	render() {
		const {
			text,
			remindText,
			className,
			fileList,
			onChange,
			acceptExtentions,
		} = this.props;

		return (
			<ManualUpload
				className={cx(PREFIX_CLASS, className)}
				acceptExtentions={acceptExtentions}
				fileList={fileList}
				onChange={onChange}
				remindText={remindText}
				fileLimit={FILE_LIMIT}
				isUploadListVisible={false}
			>
				<Input readOnly value={getLastFileName(fileList)} className={`${PREFIX_CLASS}__input`} />
				<Button className={`${PREFIX_CLASS}__button`}>
					<Icon type="upload" />{text}
				</Button>
			</ManualUpload>
		);
	}
}

UploadInputButton.propTypes = propTypes;
UploadInputButton.defaultProps = defaultProps;

export const getLastFileName = function getLastFileName(fileLimit = []) {
	let fileName = '';
	const lastFile = fileLimit.slice().pop();

	if (lastFile && lastFile.name) {
		fileName = lastFile.name;
	}

	return fileName;
};

export default UploadInputButton;
