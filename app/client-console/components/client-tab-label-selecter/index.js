import React from 'react';
import PropTypes from 'prop-types';
import { LabelSelector } from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'ljit-client-tab-label-selector';
const propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		name: PropTypes.string,
	})).isRequired,
	selectedId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onClickItem: PropTypes.func,
};

const defaultProps = {
	onClickItem: () => {},
};

function ClientTabLabelSelector({ items, selectedId, onClickItem,  }) {
	return (
		<div className={PREFIX_CLASS}>
			<LabelSelector
				items={items}
				selectedId={selectedId}
				onClickItem={onClickItem}
				isSelectedShowBorder={false}
				orientation={LabelSelector.OrientationTypeEnums.VERTICAL}
			/>
		</div>
	);
}

ClientTabLabelSelector.propTypes = propTypes;
ClientTabLabelSelector.defaultProps = defaultProps;

export default ClientTabLabelSelector;
