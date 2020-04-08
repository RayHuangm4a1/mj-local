import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { GeneralDepositRecordTable, } from '../../../components/table';
import SearchForm from './search-form';

const propTypes = {
	dataSource: PropTypes.array,
};

const defaultProps = {
	dataSource: [],
};

class GeneralDepositTab extends Component {
	constructor() {
		super();
	}

	_handleClickSearch(data) {
		// TODO send search api
	}

	render() {
		const { dataSource } = this.props;
		const { _handleClickSearch } = this;

		return (
			<React.Fragment>
				<SearchForm
					onClickSearch={_handleClickSearch}
				/>
				<GeneralDepositRecordTable
					dataSource={dataSource}
				/>
			</React.Fragment>
		);
	}
}

GeneralDepositTab.propTypes = propTypes;
GeneralDepositTab.defaultProps = defaultProps;

export default GeneralDepositTab;
