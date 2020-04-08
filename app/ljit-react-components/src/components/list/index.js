import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { List as AntdList, } from 'antd';
import ListItem from '../list-item';

const propTypes = {
	className: PropTypes.string,
	dataSource: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			prefix: PropTypes.node,
			title: PropTypes.string,
			remindText: PropTypes.string,
			content: PropTypes.string,
			onRenderOperation: PropTypes.func,
		}),
	),
};

class List extends Component {
	constructor() {
		super();
		this._handleRenderOperation = this._handleRenderOperation.bind(this);
		this._renderItem = this._renderItem.bind(this);
	}
	_handleRenderOperation(item) {
		let operation = () => {};

		if (item.onRenderOperation) {
			operation = item.onRenderOperation;
		}
		return operation;
	}
	_renderItem(item) {
		const operation = this._handleRenderOperation(item);

		return (
			<ListItem
				prefix={item.prefix}
				title={item.title}
				titleHint={item.remindText}
				content={item.content}
				right={operation(item)}
			/>
		);
	}

	render() {
		const { className, dataSource, } = this.props;

		return (
			<AntdList
				className={cx('ljit-list', className)}
				itemLayout="horizontal"
				size="large"
				dataSource={dataSource}
				renderItem={(item) => this._renderItem(item)}
			/>
		);
	}
}

List.propTypes = propTypes;

export default List;
