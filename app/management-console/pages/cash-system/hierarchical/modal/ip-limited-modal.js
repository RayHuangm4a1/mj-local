import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	InputDynamicTable,
	Input,
	Button,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	defaultData: PropTypes.arrayOf(PropTypes.shape({
		ip: PropTypes.string,
	})),
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	defaultData: [],
	onSubmit: () => {},
	onClose: () => {},
};

class IpLimitedModal extends Component {
	constructor() {
		super();
		this.state = {
			data: []
		};

		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_handleSubmit() {
		const { onSubmit, } = this.props;
		const { data } =  this.state;

		onSubmit(data);
	}
	render() {
		const { isVisible, onClose } = this.props;
		const { data, } = this.state;
		const { _handleSubmit } = this;

		return (
			<PageModal
				title="IP限制列表"
				visible={isVisible}
				onClickCancel={onClose}
				footer={(
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={_handleSubmit}
					>
						保 存
					</Button>
				)}
			>
				<InputDynamicTable
					columns={[
						{
							title: 'IP',
							dataIndex: 'ip',
							renderField: (record, rowIndex, onChange) => (
								<Input
									placeholder="请输入Ip"
									value={record.ip}
									style={{ width: 232 }}
									onChange={(e) => onChange('ip', e.target.value, rowIndex)}
								/>
							)
						}
					]}
					value={data}
					onChange={(data) => this.setState({ data, })}
				/>
			</PageModal>
		);
	}
	componentDidUpdate(prevProp) {
		const { isVisible, defaultData, } = this.props;

		if (prevProp.isVisible !== isVisible) {
			this.setState({ data: defaultData, });
		}
	}
}

IpLimitedModal.propTypes = propTypes;
IpLimitedModal.defaultProps = defaultProps;

export default IpLimitedModal;
