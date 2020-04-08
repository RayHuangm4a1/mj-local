import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-check-selector';

const BackgroundColorEnums = {
	GRAY: 'gray',
	WHITE: 'white',
};

const {
	GRAY,
	WHITE,
} = BackgroundColorEnums;

const propTypes = {
	source: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	})),
	activeIds: PropTypes.array,
	selectedIds: PropTypes.array,
	checkedIds: PropTypes.array,
	onChange: PropTypes.func,
	backgroundColor: PropTypes.oneOf([ GRAY, WHITE,]),
	className: PropTypes.string,
};
const defaultProps = {
	source: [],
	activeIds: [],
	selectedIds: [],
	checkedIds: [],
	onChange: () => {},
	backgroundColor: GRAY,
};

function CheckSelector({
	source,
	onChange,
	activeIds,
	selectedIds,
	checkedIds,
	backgroundColor,
	className,
}) {
	function _renderMenu() {
		return (
			source.map(item => {
				const { id, name, } = item;

				return (
					<li
						key={id}
						onClick={() => onChange(id)}
						className={cx(
							{ 
								[`${PREFIX_CLASS}__item--selected`]: selectedIds.includes(id),
								[`${PREFIX_CLASS}__item--active`]: activeIds.includes(id),
								[`${PREFIX_CLASS}__item--check`]: checkedIds.includes(id),
							},
						)}
					>
						{name}
					</li>
				);
			})
		);
	}

	return (
		<div className={cx(PREFIX_CLASS, className)}> 
			<ul
				className={`${PREFIX_CLASS}--${backgroundColor}`}
			>
				{_renderMenu()}
			</ul>
		</div>
	);
}

CheckSelector.propTypes = propTypes;
CheckSelector.defaultProps = defaultProps;
CheckSelector.BackgroundColorEnums = BackgroundColorEnums;

export default CheckSelector;
