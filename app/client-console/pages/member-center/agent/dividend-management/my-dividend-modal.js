import React from 'react';
import PropTypes from 'prop-types';
import {
	Table,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onToggleModal: PropTypes.func,
	dividends: PropTypes.array,
};

function MyDividendModal({ isVisible, onToggleModal, dividends }) {
	const dataSource = dividends.map((item, index, array) => {
		const lastAmount = array[index-1] ? array[index-1].amount: 0 ;

		return {
			key: index + 1,
			total: `${lastAmount} - ${item.amount}`,
			ratio: item.ratio
		};
	});

	return (
		<SubmitFormModal
			className='ljit-my-dividend-modal'
			width='880px'
			isVisible={isVisible}
			title='【我的】分紅設置'
			cancelText='关闭'
			onClickCancel={onToggleModal}
		>
			<div className='ljit-my-dividend-modal__content'>
				<Table
					dataSource={dataSource}
					columns={[
						{
							title: '序號',
							dataIndex: 'key',
						},
						{
							title: '周期总量(万)',
							dataIndex: 'total',
						},
						{
							title: '分红比率(％)',
							dataIndex: 'ratio'
						}
					]}
				/>
			</div>
		</SubmitFormModal>
	);
}

MyDividendModal.propTypes = propTypes;

export default MyDividendModal;
