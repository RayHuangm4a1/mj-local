import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const OrientationEnums = {
	LEFT: 'left',
	RIGHT: 'right',
};
const { LEFT, RIGHT, } = OrientationEnums;

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	titleIcon: PropTypes.any,
	children: PropTypes.any,
	className: PropTypes.string,
	closingText: PropTypes.string,
	topRight: PropTypes.any,
	style: PropTypes.object,
	onClickTopRight: PropTypes.func,
	orientation: PropTypes.oneOf(Object.values(OrientationEnums).concat('')),
};

const defaultProps = {
	topRight: '',
	title: '',
	closingText: '点击隐藏',
	titleIcon: null,
	children: null,
	orientation: LEFT,
	onClickTopRight: () => {},
};

class ExpandablePanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
		};

		this._handleTogglePanel = this._handleTogglePanel.bind(this);
		this._renderPanelContent = this._renderPanelContent.bind(this);
	}

	_handleTogglePanel() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	_renderPanelContent() {
		const {
			title,
			titleIcon,
			children,
			topRight,
			closingText,
			onClickTopRight,
		} = this.props;
		const { isOpen, } = this.state;
		const { _handleTogglePanel, } = this;

		if (isOpen) {
			return (
				<React.Fragment>
					<div className="ljit-expandable-panel__top">
						<div className="ljit-expandable-panel__title">
							{titleIcon}<span>{title}</span>
						</div>
						<div
							className="ljit-expandable-panel__right-icon"
							onClick={onClickTopRight}
						>
							{topRight}
						</div>
					</div>
					<div className="ljit-expandable-panel__content">
						{children}
					</div>
					<div
						className="ljit-expandable-panel__bottom"
						onClick={this._handleTogglePanel}
					>
						{closingText}
					</div>
				</React.Fragment>
			);
		} else {
			return (
				<div onClick={_handleTogglePanel}>
					{title}
				</div>
			);
		}
	}

	render() {
		const { isOpen, } = this.state;
		const { className, style, orientation, } = this.props;
		const { _renderPanelContent, } = this;

		return (
			<div
				className={cx('ljit-expandable-panel',
					isOpen ? 'ljit-expandable-panel--opened' : 'ljit-expandable-panel--closed',
					{
						'ljit-expandable-panel--left': orientation === LEFT,
						'ljit-expandable-panel--right': orientation === RIGHT,
					},
					className
				)}
				style={style}
			>
				{_renderPanelContent()}
			</div>
		);
	}
}

ExpandablePanel.propTypes = propTypes;
ExpandablePanel.defaultProps = defaultProps;
ExpandablePanel.OrientationEnums = OrientationEnums;

export default ExpandablePanel;
