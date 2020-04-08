import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

function Container({ title, children }) {
	return (
		<div className="ljit-member-basic-info__container">
			{
				title ? <div className="ljit-member-basic-info__container-title"> {title} </div> : null
			}
			<div className="ljit-member-basic-info__container-content">
				{children}
			</div>
		</div>
	);
}

Container.propTypes = propTypes;

export default Container;
