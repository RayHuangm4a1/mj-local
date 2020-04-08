import React from 'react';
import { Link, } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tabs from '../tabs';
import './style.styl';

const TabPane = Tabs.TabPane;

const propTypes = {
	tabData: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			path: PropTypes.string,
			tab: PropTypes.string,
		})
	),
	className: PropTypes.string,
	children: PropTypes.any,
	activeKey: PropTypes.string,
	onChange: PropTypes.func,
};
const defaultProps = {};

class SidebarTabs extends React.Component {
	constructor() {
		super();
		this._renderTabControl = this._renderTabControl.bind(this);
		this._renderTabPanes = this._renderTabPanes.bind(this);
	}

	_renderTabControl(path = '', tab) {
		let element = (
			<Link
				className="tab-control"
				to={path}
			>
				<span className="tab-padding">
					{tab}
				</span>
			</Link>
		);

		if (!path) {
			element = (
				<div className="tab-control">
					<span className="tab-padding">
						{tab}
					</span>
				</div>
			);
		}
		return element;
	}

	_renderTabPanes() {
		const { tabData: data, children, } = this.props;
		const tabPanes = [];

		React.Children.forEach(children, (child, index) => {
			const { key, path, tab, } = data[index] || {};
			const tabControl = this._renderTabControl(path, tab);

			tabPanes.push(
				<TabPane
					className="ljit-sidebar-tabpanes"
					tab={tabControl}
					key={key}
				>
					{child}
				</TabPane>
			);
		});

		return tabPanes;
	}

	render() {
		const {
			className,
			activeKey,
			onChange,
		} = this.props;
		const tabPanes = this._renderTabPanes();

		return (
			<Tabs
				className={cx('ljit-sidebar-tabs', className)}
				tabPosition="left"
				activeKey={activeKey}
				onChange={onChange}
			>
				{tabPanes}
			</Tabs>
		);
	}
}

SidebarTabs.propTypes = propTypes;
SidebarTabs.defaultProps = defaultProps;

export default SidebarTabs;
