import PropTypes from 'prop-types';

export const ModalStateEnums = {
	MANUAL: 'manual',
	AUTO: 'auto',
	DETAIL: 'detail',
	REJECT: 'reject',
};

// TODO: check api data 
export const RecordPropTypes = {
	record: PropTypes.shape({
		level: PropTypes.string,
		member: PropTypes.string,
		amount: PropTypes.number,
		fee: PropTypes.number,
		status: PropTypes.string,
		dama: PropTypes.number,
		administrator: PropTypes.string,
		applyAt: PropTypes.string,
		confirmAt: PropTypes.string,
		bank: PropTypes.string,
		bankBranch: PropTypes.string,
		debitVoucher: PropTypes.string,
		forbidAutoPayReasons: PropTypes.array,
		note: PropTypes.string,
	})
};
