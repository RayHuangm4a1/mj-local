import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tag from '../../components/tag';
import './style.styl';

const TagTypeEnums = {
	DEFAULT: 'default',
	OUTLINE: 'outline',
	HOLLOW: 'hollow',
};
const StatusEnums = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning',
	WIN: 'win',
	LOSE: 'lose',
	DRAW: 'draw',
	REMOVE: 'remove',
	PENDING: 'pending',
	BET_WIN: 'betWin',
	BET_LOSE: 'betLose',
	BET_UNOPENED: 'betUnOpened',
	BET_OPENING: 'betOpening',
	BET_CANCELED: 'betCanceled',
	DRAW_OPENING: 'drawOpening',
	DRAW_NEW: 'drawNew',
	DRAW_REWARDING: 'drawRewarding',
	DRAW_REWARDED: 'drawRewarded',
	DRAW_CANCELED: 'drawCanceled',
	DRAW_CANCELING: 'drawCanceling',
	DRAW_MODIFIED: 'drawModified',
	DRAW_STOPPED: 'drawStopped',
	TRACE_COMPLETE: 'traceComplete',
	TRACE_INCOMPLETE: 'traceIncomplete',
};
const { DEFAULT, OUTLINE, HOLLOW, } = TagTypeEnums;
const {
	SUCCESS,
	ERROR,
	WARNING,
	WIN,
	LOSE,
	DRAW,
	REMOVE,
	PENDING,
	BET_WIN,
	BET_LOSE,
	BET_UNOPENED,
	BET_CANCELED,
	BET_OPENING,
	DRAW_OPENING,
	DRAW_NEW,
	DRAW_REWARDING,
	DRAW_REWARDED,
	DRAW_CANCELED,
	DRAW_MODIFIED,
	DRAW_STOPPED,
	DRAW_CANCELING,
	TRACE_COMPLETE,
	TRACE_INCOMPLETE,
} = StatusEnums;

const propTypes = {
	tagType: PropTypes.oneOf([
		DEFAULT,
		OUTLINE,
		HOLLOW,
	]),
	status: PropTypes.oneOf([
		SUCCESS,
		ERROR,
		WARNING,
		WIN,
		LOSE,
		DRAW,
		REMOVE,
		PENDING,
		BET_WIN,
		BET_LOSE,
		BET_UNOPENED,
		BET_CANCELED,
		BET_OPENING,
		DRAW_OPENING,
		DRAW_NEW,
		DRAW_REWARDING,
		DRAW_REWARDED,
		DRAW_CANCELED,
		DRAW_MODIFIED,
		DRAW_STOPPED,
		DRAW_CANCELING,
		TRACE_COMPLETE,
		TRACE_INCOMPLETE,
	]).isRequired,
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	textColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	style: PropTypes.object,
};
const defaultProps = {
	tagType: DEFAULT,
	textColor: '',
	backgroundColor: '',
};

const StatusTag = ({
	status,
	text,
	className,
	style,
	tagType,
	textColor,
	backgroundColor,
} = {}) => (
	<Tag
		className={cx(className, 'ljit-status-tag', {
			'ljit-status-tag--default': tagType === DEFAULT,
			'ljit-status-tag--outline': tagType === OUTLINE,
			'ljit-status-tag--hollow': tagType === HOLLOW,
			'ljit-status-tag--success': status === SUCCESS,
			'ljit-status-tag--error': status === ERROR,
			'ljit-status-tag--warning': status === WARNING,
			'ljit-status-tag--win': status === WIN,
			'ljit-status-tag--lose': status === LOSE,
			'ljit-status-tag--draw': status === DRAW,
			'ljit-status-tag--remove': status === REMOVE,
			'ljit-status-tag--pending': status === PENDING,
			'ljit-status-tag--betWin': status === BET_WIN,
			'ljit-status-tag--betLose': status === BET_LOSE,
			'ljit-status-tag--betUnOpened': status === BET_UNOPENED,
			'ljit-status-tag--betOpening': status === BET_OPENING,
			'ljit-status-tag--betCanceled': status === BET_CANCELED,
			'ljit-status-tag--drawOpening': status === DRAW_OPENING,
			'ljit-status-tag--drawNew': status === DRAW_NEW,
			'ljit-status-tag--drawRewarding': status === DRAW_REWARDING,
			'ljit-status-tag--drawRewarded': status === DRAW_REWARDED,
			'ljit-status-tag--drawCanceled': status === DRAW_CANCELED,
			'ljit-status-tag--drawModified': status === DRAW_MODIFIED,
			'ljit-status-tag--drawStopped': status === DRAW_STOPPED,
			'ljit-status-tag--drawCanceling': status === DRAW_CANCELING,
			'ljit-status-tag--traceComplete': status === TRACE_COMPLETE,
			'ljit-status-tag--traceIncomplete': status === TRACE_INCOMPLETE,
		})}
		hasBorder={tagType === OUTLINE}
		text={text}
		textColor={textColor}
		backgroundColor={backgroundColor}
		style={style}
	/>
);

StatusTag.propTypes = propTypes;
StatusTag.defaultProps = defaultProps;
StatusTag.TagTypeEnums = TagTypeEnums;
StatusTag.StatusEnums = StatusEnums;

export default StatusTag;
