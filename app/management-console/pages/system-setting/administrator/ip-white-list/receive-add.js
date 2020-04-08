import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import AddTable from './add-table';
const propTypes = {
	onBack: PropTypes.func,
};

class SystemSettingAdministratorIpWhiteListReceiveAddPage extends Component {
	constructor() {
		super();

		this._handleClickAdd = this._handleClickAdd.bind(this);
	}

	_handleClickAdd(data) {
		//TODO send create ip api
	}

	render() {
		const { _handleClickAdd } = this;
		const { onBack } = this.props;

		return (
			<React.Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					style={{ marginBottom: 24, }}
					onClick={onBack}
				>
					返回上一层
				</Button>
				<PageBlock>
					<AddTable
						title="批量新增收款白名单"
						onSubmit={_handleClickAdd}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}
}

SystemSettingAdministratorIpWhiteListReceiveAddPage.propTypes = propTypes;

export default SystemSettingAdministratorIpWhiteListReceiveAddPage;
