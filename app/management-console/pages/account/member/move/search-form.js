import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Form, FormItem, Row, Col ,Button, Input, RemindText, } from 'ljit-react-components';

const propTypes = {
	onSearch: PropTypes.func,
};

const defaultProps = {};

class SearchForm extends Component {
	constructor(props) {
		super(props);

		this._handleSearch = this._handleSearch.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		this.props.onSearch(form);
	}

	render() {
		const config = {
			rules: [{ type: 'string' }],
		};

		const inputStyle = {
			width: '100%',
		};

		return (
			<Fragment>
				<Form
					className="move-search-form"
					submitButtonDisabled
					cancelButtonDisabled
					ref={(refForm) => this.formInstance = refForm }
				>
					<Row className="move-form-row" type={Row.TypeEnums.FLEX} gutter={24}>
						<Col>
							<FormItem label='移桶帐号' itemName="username" itemConfig={config} className="move-form-item">
								<Input
									style={inputStyle}
									placeholder='请输入下級帐号'
								/>
							</FormItem>
						</Col>
						<Col>
							<div style={{ padding: '4px 0px 4px 0px' }}>
								<Button
									className="move-search-btn"
									outline={Button.OutlineEnums.SOLID}
									onClick={this._handleSearch}
								>
									查询
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
				<Row>
					<RemindText
						text={(
							<div>
								<div>1. 公司最上层代理、会员无法被搬移。2. 被搬移帐号需并无跟上级签订契约才可搬移。3. 新上级为直属分红，且系统设定为二</div>
								<div>级分红则被搬移的帐号将禁止投注；如不是则不改变状态。4. 新上级如禁用上下级聊天，被搬移的帐号本身與下級都將禁用上</div>
								<div>下级聊天；如不是则不改变状态。5. 被搬移帐号需上级无设定日工资才可搬移。</div>
							</div>
						)}
					/>
				</Row>
			</Fragment>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
