import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Avatar from '../avatar';
import './style.styl';

const { SizeEnums, } = Avatar;
const AlignmentEnums = {
	TOP: 'top',
	LEFT: 'left',
};
const { TOP, LEFT, } = AlignmentEnums;
const propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	src: PropTypes.string,
	alt: PropTypes.string,
	text: PropTypes.string,
	userName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	alignment: PropTypes.oneOf(Object.values(AlignmentEnums).concat('')),
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(Object.values(SizeEnums).concat('')),
	]),
	onError: PropTypes.func,
};
const defaultProps = {
	size: SizeEnums.SMALL,
	alignment: AlignmentEnums.LEFT,
	onError: () => false,
};

class UserAvatar extends Component {
	render() {
		const {
			className,
			style,
			src,
			alt,
			text,
			userName,
			onError,
			size,
			description,
			alignment,
		} = this.props;

		return (
			<div
				className={cx(className, 'ljit-user-avatar', {
					'ljit-user-avatar--top' : alignment === TOP,
					'ljit-user-avatar--left' : alignment === LEFT,
				})}
				style={style}
			>
				<div className="ljit-user-avatar__avatar">
					<Avatar
						size={size}
						src={src}
						alt={alt}
						text={text}
						onError={onError}
					/>
				</div>
				<div className="ljit-user-avatar__content">
					<div className="ljit-user-avatar__username">{userName}</div>
					{description ? <div className="ljit-user-avatar__description">{description}</div> : null}
				</div>
			</div>
		);
	}
}

UserAvatar.propTypes = propTypes;
UserAvatar.defaultProps = defaultProps;
UserAvatar.SizeEnums = SizeEnums;
UserAvatar.AlignmentEnums = AlignmentEnums;

export default UserAvatar;
