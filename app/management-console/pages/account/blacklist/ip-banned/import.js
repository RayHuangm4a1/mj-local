import React, { Component } from 'react';
import {
	Button,
} from 'ljit-react-components';
import ImportFrom from '../form/import-form';
import PageBlock from '../../../../components/page-block';
import PropTypes from 'prop-types';

const propTypes = {
	onBack: PropTypes.func,
};

const defaultProps = {
	onBack: () => {},
};

class AccountMemberIpBannedImportPage extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_handleSubmit(values) {
		// TODO send api to create mulit-ban
	}

	render() {
		const { _handleSubmit, } = this;
		const { onBack } = this.props;

		return (
			<React.Fragment >
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					style={{ marginBottom: 24 }}
					onClick={onBack}
				>
					返回上一層
				</Button>
				<PageBlock>
					<ImportFrom
						label="IP：（不同 IP 位址请用 / 隔开）"
						itemName="ip"
						placeholder="请输入 IP "
						onSubmit={_handleSubmit}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}
}

AccountMemberIpBannedImportPage.propTypes = propTypes;
AccountMemberIpBannedImportPage.defaultProps = defaultProps;

export default AccountMemberIpBannedImportPage;
