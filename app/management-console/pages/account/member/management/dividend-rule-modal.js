import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
	DividendInputRangeTable,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const { checkIsLastRowSelected, } = DividendInputRangeTable;

const propTypes = {
	isShowModal: PropTypes.bool,
	dividends: PropTypes.array,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	isShowModal: false,
	dividends: [],
	onSubmit: () => {},
	onCancel: () => {},
};

function DividendRuleModal({
	isShowModal,
	dividends,
	onSubmit,
	onCancel,
}) {
	const [dividendsData, setDividends] = useState(dividends);

	useEffect(() => {
		if (isShowModal) {
			setDividends(dividends);
		}
	}, [isShowModal]);

	function _handleSubmit() {
		const checked = checkIsLastRowSelected(dividendsData);

		if (checked) {
			onSubmit(dividendsData);
		}
	}

	function _handleCancel() {
		onCancel();
	}

	function _handleChangeTable(tableData) {
		setDividends(tableData);
	}

	return (
		<PageModal
			title="分红规则修改"
			visible={isShowModal}
			onClickOk={_handleSubmit}
			onClickCancel={_handleCancel}
			className="dividend-rule-modal"
			width={1000}
		>
			<DividendInputRangeTable
				tableData={dividendsData}
				onChange={_handleChangeTable}
			/>
		</PageModal>
	);
}

DividendRuleModal.propTypes = propTypes;
DividendRuleModal.defaultProps = defaultProps;

export default DividendRuleModal;
