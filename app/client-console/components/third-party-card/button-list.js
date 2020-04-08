import React from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';

const propTypes = {
	thirdParties: PropTypes.array,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

const defaultProps = {
	thirdParties: [],
	onClick: () => {},
};

function RenderButtonList({ thirdParties, onClick, className }) {
	return thirdParties.map((thirdPartyName, index) => (
		<Button
			// TODO 確認外接遊戲的資料結構並用不會重複的值當 key
			key={`${thirdPartyName}__${index}`}
			outline={Button.OutlineEnums.HOLLOW}
			onClick={() => { onClick(thirdPartyName);}}
			className={className}
		>{thirdPartyName}</Button>
	));
}

RenderButtonList.propTypes = propTypes;
RenderButtonList.defaultProps = defaultProps;

export default RenderButtonList;
