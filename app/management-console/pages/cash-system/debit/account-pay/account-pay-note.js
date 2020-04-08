import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	InputNumber,
	InputTextarea,
	Select,
} from 'ljit-react-components';
import { ModalStateEnums, } from './utils';

const {
	AUTO,
	REJECT,
	DETAIL,
} = ModalStateEnums;
const inputStyle = { width: '100%', };

// TODO: api data formats
const propTypes = {
	modalState: PropTypes.oneOf(Object.values(ModalStateEnums).concat('')),
	record: PropTypes.shape({
		bankFee: PropTypes.number,
		note: PropTypes.string,
	}),
};

const PREFIX_CLASS = 'account-pay-note';

class AccountPayNote extends Component {
	constructor() {
		super();

		this._renderDebitSourceItem = this._renderDebitSourceItem.bind(this);
	}

	_renderDebitSourceItem() {
		const { modalState, } = this.props;
		// TODO: options formats
		const options = [
			{ label: '畅汇（畅汇支付/1105205969999995993/第三方)', value: '1105205969999995993' },
			{ label: 'COLA(可乐在线/10194063450490322229/第三方)', value: '10194063450490322229' },
			{ label: 'COLA-1(可乐在线/101940634504903222/第三方)', value: '1019406345049032221' },
			{ label: 'COLA-2(可乐在线/101940634504783322/第三方)', value: '01940634504783322' },
			{ label: 'COLA-3(可乐在线/101940634504903456/第三方)', value: '101940634504903456' },
			{ label: 'COLA-4(可乐在线/101940634504903222/第三方)', value: '1019406345049032224' },
		];

		if (modalState !== AUTO) {
			return null;
		}

		return (
			<FormItem
				label="出款来源"
				itemName="debitSource"
				columnType={FormItem.ColumnTypeEnums.LARGE}
			>
				<Select
					style={inputStyle}
					options={options}
					placeholder="请选择"
				/>
			</FormItem>
		);
	}

	render() {
		const {
			record,
			modalState,
		} = this.props;
		const {
			bankFee,
			note,
		} = record;
		const { _renderDebitSourceItem, } = this;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__title account-pay-modal__title`}>操作</div>
				<Form
					ref={form => this.formInstance = form}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						label="银行手续费"
						itemName="bankFee"
						itemConfig={{
							initialValue: bankFee,
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<InputNumber
							style={inputStyle}
							disabled={modalState === DETAIL}
						/>
					</FormItem>
					{_renderDebitSourceItem()}
					<FormItem
						label="取消说明"
						itemName="note"
						itemConfig={{
							initialValue: note,
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<InputTextarea
							maxRows={4}
							minRows={4}
							style={inputStyle}
							disabled={modalState !== REJECT}
						/>
					</FormItem>
				</Form>
			</div>
		);
	}
}

AccountPayNote.propTypes = propTypes;

export default AccountPayNote;
