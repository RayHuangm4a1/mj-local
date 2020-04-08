import React from 'react';
import PropTypes from 'prop-types';
import { TextButton, } from 'ljit-react-components';
import { StatusEnums, } from './utils';

const {
	ARCHIVED,
	ACTIVE,
	UNRECOMMEND,
	RECOMMEND,
	AUTOPAY_OFF,
	AUTOPAY_ON,
} = StatusEnums;

const propTypes = {
	status: PropTypes.string,
	onClick: PropTypes.func,
};
const defaultProps = {
	status: ACTIVE,
	onClick: () => {},
};

function getProps(status) {
	let color = 'default';

	let text = '';

	switch (status) {
		case ARCHIVED:
			text = '启用';
			break;
		case ACTIVE:
			color = 'danger';
			text = '停用';
			break;
		case UNRECOMMEND:
			text = '推荐';
			break;
		case RECOMMEND:
			text = '取消推荐';
			break;
		case AUTOPAY_OFF:
			text = '自动出款';
			break;
		case AUTOPAY_ON:
			text = '取消自动出款';
			break;
		default:
	}
	return { color, text, };
}

const OperationTextButton = ({ status, onClick, }) => {
	const { color, text } = getProps(status);

	return (
		<TextButton text={text} color={color} onClick={onClick}/>
	);
};

OperationTextButton.propTypes = propTypes;
OperationTextButton.defaultProps = defaultProps;

export default OperationTextButton;
