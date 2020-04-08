import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Badge from '../badge';
import Tag from '../tag';
import './style.styl';

const { ColorEnums, ShapeEnums, } = Tag;
const BadgeAlignmentEnums = {
	LEFT: 'left',
	RIGHT: 'right',
};

const propTypes = {
	color: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	style: PropTypes.object,
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	badgeAlignment: PropTypes.oneOf(Object.values(BadgeAlignmentEnums).concat('')),
	hasBadge: PropTypes.bool,
	badgeIcon: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.node,
	]),
	backgroundColor: PropTypes.string,
	textColor: PropTypes.string,
	onClick: PropTypes.func,
};

const defaultProps = {
	backgroundColor: '',
	textColor: '',
	text: '',
	color: ColorEnums.BLACK,
	badgeAlignment: BadgeAlignmentEnums.LEFT,
	hasBadge: false,
	badgeIcon: 0,
	onClick: () => {},
};

class ClickableTag extends Component {
	constructor(props) {
		super(props);

		this._renderDefaultTag = this._renderDefaultTag.bind(this);
		this._renderWithBadgeOutline = this._renderWithBadgeOutline.bind(this);
	}

	_renderDefaultTag() {
		const {
			color,
			style,
			text,
			className,
			onClick,
			backgroundColor,
			textColor,
		} = this.props;

		return (
			<div
				className={cx('ljit-clickable-tag', className)}
				onClick={onClick}
				style={style}
			>
				<Tag
					color={color}
					shape={ShapeEnums.ROUND_BORDER}
					text={text}
					backgroundColor={backgroundColor}
					textColor={textColor}
				/>
			</div>
		);
	}

	_renderWithBadgeOutline() {
		const { badgeIcon, badgeAlignment, } = this.props;
		const { _renderDefaultTag, } = this;

		return (
			<Badge
				className={`ljit-clickable-tag--with-badge ljit-clickable-tag--with-${badgeAlignment}-badge`}
				count={badgeIcon}
				isZeroVisible
			>
				{_renderDefaultTag()}
			</Badge>
		);
	}

	render() {
		const { hasBadge, } = this.props;
		const {
			_renderDefaultTag,
			_renderWithBadgeOutline,
		} = this;

		if (!hasBadge) {
			return _renderDefaultTag();
		} else {
			return _renderWithBadgeOutline();
		}
	}
}

ClickableTag.propTypes = propTypes;
ClickableTag.defaultProps = defaultProps;
ClickableTag.ColorEnums = ColorEnums;
ClickableTag.BadgeAlignmentEnums = BadgeAlignmentEnums;

export default ClickableTag;
