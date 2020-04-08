import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { List as AntdList, } from 'antd';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-list-item';
const propTypes = {
	className: PropTypes.string,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	titleHint: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	right: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	prefix: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

class ListItem extends Component {
	constructor() {
		super();

		this._renderTitleHint = this._renderTitleHint.bind(this);
		this._renderDescription = this._renderDescription.bind(this);
	}
	_renderTitleHint() {
		const { titleHint, } = this.props;

		return (
			<span className={`${PREFIX_CLASS}__title-hint`}>
				{titleHint}
			</span>
		);
	}
	_renderDescription() {
		const { description, } = this.props;

		return (
			<div className={`${PREFIX_CLASS}__description`}>
				{description}
			</div>
		);
	}
	render() {
		const {
			className,
			title,
			titleHint,
			description,
			content,
			right,
			prefix,
		} = this.props;
		const { _renderTitleHint, _renderDescription, } = this;

		return (
			<AntdList.Item
				className={cx(PREFIX_CLASS, className)}
				extra={right}
			>
				<div className={`${PREFIX_CLASS}__wrapper`}>
					{prefix ? prefix : null}
					<div>
						<div className={`${PREFIX_CLASS}__title`}>
							{title}
							{titleHint ? _renderTitleHint() : null}
						</div>
						{description ?  _renderDescription() : null}
						{content}
					</div>
				</div>
			</AntdList.Item>
		);
	}
}

ListItem.propTypes = propTypes;

export default ListItem;
