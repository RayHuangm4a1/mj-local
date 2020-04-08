import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	Button,
	Row,
	Col,
	FormItem,
	DateRangePicker,
} from 'ljit-react-components';
import './style.styl';

const propTypes = {
	onSearch: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
};

const inputStyle = {
	'width': '100%',
};

const dateFormat = 'YYYY/M/DD hh:mm';

class SearchForm extends Component {
	constructor() {
		super();

		this._handleSearch = this._handleSearch.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		this.props.onSearch(form);
	}

	render() {
		return (
			<Form
				submitButtonDisabled={true}
				cancelButtonDisabled={true}
				onChange={() => {}}
				ref={(refForm) => this.formInstance = refForm }
			>
				<Row type="flex" flexLayout={Row.FlexJustifyEnums.SPACE_BETWEEN}>
					<Row type="flex" gutter={32}>
						<FormItem
							label="日期"
							itemName="date"
							className="third-party-history-search-form-item">
							<DateRangePicker
								format={dateFormat}
								inputStyle={inputStyle}
								ranges={['today', 'lastSevenDays', 'presentPeriod', 'previousPeriod' ]}
							/>
						</FormItem>
					</Row>
					<Col style={{ textAlign: 'right', width: 'auto' }}>
						<div style={{ padding: '4px 0px 4px 0px' }}>
							<Button
								className='search-form-search-btn'
								outline={Button.OutlineEnums.SOLID}
								onClick={this._handleSearch}
							>
								查询
							</Button>
						</div>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
