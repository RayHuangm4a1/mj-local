import PropTypes from 'prop-types';

export const drawingInfoCardPropTypes = {
	opencode: PropTypes.string.isRequired,
	size: PropTypes.string,
	fontSize: PropTypes.string,
};

export const drawingInfoCardElementSharingPropTypes = {
	splitOpencodes: PropTypes.arrayOf(PropTypes.string),
	size: PropTypes.string,
	fontSize: PropTypes.string,
};
