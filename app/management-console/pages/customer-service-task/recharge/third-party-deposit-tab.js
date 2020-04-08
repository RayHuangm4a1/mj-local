import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { ThirdPartyDepositRecordTable, } from '../../../components/table';
import SearchForm from './search-form';

const propTypes = {
	dataSource: PropTypes.array,
};

const defaultProps = {
	dataSource: [],
};

class ThirdPartyDepositTab extends Component {
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
					isThirdParty
				/>
				<ThirdPartyDepositRecordTable
					dataSource={dataSource}
				/>
			</React.Fragment>
		);
	}
}

ThirdPartyDepositTab.propTypes = propTypes;
ThirdPartyDepositTab.defaultProps = defaultProps;

export default ThirdPartyDepositTab;
