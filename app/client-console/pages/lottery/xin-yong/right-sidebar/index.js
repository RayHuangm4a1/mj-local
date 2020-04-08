import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DrawingBettingLongTabs from '../../../../features/drawing-betting-long-tabs';
import XinYongBettingRecordsTab from '../../../../features/xin-yong-betting-records-tab';

const propTypes = {};
const defaultProps = {};

class XinYongRightSidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* TODO: 快選 block feature */}
				<DrawingBettingLongTabs/>
				<XinYongBettingRecordsTab/>
			</div>
		);
	}
}

XinYongRightSidebar.propTypes = propTypes;
XinYongRightSidebar.defaultProps = defaultProps;

export default XinYongRightSidebar;
