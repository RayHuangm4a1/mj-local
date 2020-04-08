import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {
	Button,
	Input,
	HeaderButtonBar,
	InputDynamicTable,
} from 'ljit-react-components';
import Title from '../../../../../components/page-block/title';


const propTypes = {
	onSubmit: PropTypes.func,
	title: PropTypes.string,
};

const defaultProps = {
	onSubmit: () => {},
};

class AddTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ key: uuid(), }],
		};

		this._renderTable = this._renderTable.bind(this);
	}
	_renderTable() {
		const { data } = this.state;
		const columns = [{
			title:'IP',
			dataIndex:'ip',
			width: '33%',
			renderField: (record, rowIndex, onChange) => (
				<Input
					placeholder="请输入IP"
					value={record.ip}
					style={{ width: 232 }}
					onChange={(e) => onChange('ip', e.target.value, rowIndex)}
				/>
			)
		},{
			title:'备注',
			dataIndex:'remark',
			width: '33%',
			renderField: (record, rowIndex, onChange) => (
				<Input
					placeholder="请输入备注"
					value={record.remark}
					style={{ width: 232 }}
					onChange={(e) => onChange('remark', e.target.value, rowIndex)}
				/>
			)
		},];

		return (
			<InputDynamicTable
				columns={columns}
				value={data}
				onChange={(data) => this.setState({ data, })}
			/>
		);
	}

	render() {
		const { _renderTable, } = this;
		const { data } = this.state;
		const { title, onSubmit } = this.props;

		return (
			<React.Fragment>
				<HeaderButtonBar
					left={<Title text={title}/>}
					right={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={() => onSubmit(data)}
							style={{ width: 98 }}
						>
							新增
						</Button>
					)}
				/>
				{_renderTable()}
			</React.Fragment>
		);
	}
}

AddTable.propTypes = propTypes;
AddTable.defaultProps = defaultProps;

export default AddTable;
