import React, { Component } from 'react';
import {
	Button,
	Input,
	HeaderButtonBar,
	InputDynamicTable,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import '../style.styl';

const propTypes = {
	onBack: PropTypes.func,
};

const defaultProps = {
	onBack: () => {},
};

class AccountMemberFrontstageWhiteListMultiAddPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [ { key: uuid(), }],
		};

		this._handleClickSave = this._handleClickSave.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}
	_handleClickSave() {
		// TODO send api to create mulit-white-list
	}

	_renderTable() {
		const { data } = this.state;
		const columns = [{
			title:'登陆 IP (必填）',
			dataIndex:'ip',
			width: "40%",
			renderField: (record, rowIndex, onChange) => (
				<Input
					value={record.ip}
					onChange={(e) => onChange('ip', e.target.value, rowIndex)}
				/>
			)
		},{
			title:'备注',
			dataIndex:'comment',
			width: "40%",
			renderField: (record, rowIndex, onChange) => (
				<Input
					value={record.comment}
					onChange={(e) => onChange('comment', e.target.value, rowIndex)}
				/>
			)
		},];

		return (
			<InputDynamicTable
				columns={columns}
				value={data}
				onChange={(data) => this.setState({ data, })}
				className={"backlist-frontstage-white-list__table"}
			/>
		);
	}

	render() {
		const {
			_handleClickSave,
			_renderTable,
		} = this;
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
				<PageBlock
					noMinHeight
				>
					<HeaderButtonBar
						right={(
							<Button
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={_handleClickSave}
								style={{ width: 98, marginBottom: 30 }}
							>
								储存新增
							</Button>
						)}
					/>
					{_renderTable()}
				</PageBlock>
			</React.Fragment>
		);
	}
}

AccountMemberFrontstageWhiteListMultiAddPage.propTypes = propTypes;
AccountMemberFrontstageWhiteListMultiAddPage.defaultProps = defaultProps;

export default AccountMemberFrontstageWhiteListMultiAddPage;
