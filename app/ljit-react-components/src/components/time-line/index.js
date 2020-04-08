import React, { Component, } from 'react';
import { Timeline as AntdTimeline, } from 'antd';
import TimelineItem from './time-line-item';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ModeEnums = {
	LEFT: 'left',
	RIGHT: 'right',
	ALTERNATE: 'alternate',
};

const propTypes = {
	mode: PropTypes.oneOf([
		ModeEnums.LEFT,
		ModeEnums.RIGHT,
		ModeEnums.ALTERNATE,
		'',
	]),
	className: PropTypes.string,
	children:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

const defaultProps = {
	mode: ModeEnums.LEFT,
};

class Timeline extends Component {
	render() {
		const { mode, className, children, } = this.props;

		return (
			<AntdTimeline
				mode={mode}
				className={cx('ljit-time-line', className,)}
			>
				{children}
			</AntdTimeline>
		);
	}
}

Timeline.defaultProps = defaultProps;
Timeline.propTypes = propTypes;
Timeline.ModeEnums = ModeEnums;
Timeline.Item = TimelineItem;

export default Timeline;
