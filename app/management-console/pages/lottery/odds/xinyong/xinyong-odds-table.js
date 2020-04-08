import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import XinyongOddsSlot from './xinyong-odds-slot';

const propTypes = {
	subconditions: PropTypes.array,
	isEdit: PropTypes.bool,
};

const defaultProps = {
	subconditions: [],
	isEdit: false,
};

class XinyongOddsTable extends Component {
	constructor(props) {
		super(props);
		this._renderItem = this._renderItem.bind(this);
	}
	_renderItem() {
		const { subconditions, isEdit } = this.props; 

		return subconditions.map(item => (
			<div key={item.id} className="xin-yong-odds-table__container">
				<div className="xin-yong-odds-table__name">
					{item.name}
				</div>
				<div className="xin-yong-odds-table__content">
					{item.plays.map(play => (
						<XinyongOddsSlot
							key={play.id}
							playId={play.id}
							isEdit={isEdit}
						/>
					))}
				</div>
			</div>
		));
	}

	render() {
		const { _renderItem } = this;

		return (
			<div className="xin-yong-odds-table">
				{_renderItem()}
			</div>
		);
	}
}

XinyongOddsTable.propTypes = propTypes;
XinyongOddsTable.defaultProps = defaultProps;

export default XinyongOddsTable;
