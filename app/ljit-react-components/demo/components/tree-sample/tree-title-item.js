import React from 'react';
import { Select, } from 'ljit-react-components';
import PropTypes from 'prop-types';
import './style.styl';

const CLASS_PREFIX = 'tree-title-item';

const propTypes = {
	title: PropTypes.string,
	isShowSelect: PropTypes.bool,
};

function TreeTitleItem({
	title,
	isShowSelect,
}) {

	function _renderSelect() {
		return (
			<Select
				className={`${CLASS_PREFIX}__select`}
				options={[
					{ label: '修改', value: 'update', },
					{ label: '刪除', value: 'delete', },
				]}
			/>
		);
	}

	return (
		<div className={`${CLASS_PREFIX}`}>
			<span>{title}</span>
			{isShowSelect ? _renderSelect() : null}
		</div>
	);
}

TreeTitleItem.propTypes = propTypes;

export default TreeTitleItem;
