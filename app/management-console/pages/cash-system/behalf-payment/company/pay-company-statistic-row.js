import React from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Card,
	Statistic,
	Icon,
} from 'ljit-react-components';

const { LARGE, } = Statistic.SizeTypeEnums;
const {
	IconTypeEnums,
	ColorEnums,
} = Icon;

const propTypes = {
	listCount: PropTypes.number,
	amount: PropTypes.number,
	fee: PropTypes.number,
	bankFee: PropTypes.number,
};

const PayCompanyStatisticRow = ({
	listCount,
	amount,
	fee,
	bankFee,
}) => (
	<Row className="pay-company-statistic-row" type="flex" justify="space-between" gutter={10}>
		<Col span={6}>
			<Card className="card-box-shadow">
				<Statistic
					title="总笔数"
					value={listCount}
					sizeType={LARGE}
					prefix={(
						<Icon
							type={IconTypeEnums.FUND_FILL}
							color={ColorEnums.PRIMARY}
						/>
					)}
				/>
			</Card>
		</Col>
		<Col span={6}>
			<Card className="card-box-shadow">
				<Statistic
					title="总金额"
					value={amount}
					sizeType={LARGE}
					prefix={(
						<Icon
							type={IconTypeEnums.PAYCIRCLE_FILL}
							color={ColorEnums.PRIMARY}
						/>
					)}
				/>
			</Card>
		</Col>
		<Col span={6}>
			<Card className="card-box-shadow">
				<Statistic
					title="总手续费"
					value={fee}
					sizeType={LARGE}
					prefix={(
						<Icon
							type={IconTypeEnums.PAYCIRCLE_FILL}
							color={ColorEnums.PRIMARY}
						/>
					)}
				/>
			</Card>
		</Col>
		<Col span={6}>
			<Card className="card-box-shadow">
				<Statistic
					title="总银行手续费"
					value={bankFee}
					sizeType={LARGE}
					prefix={(
						<Icon
							type={IconTypeEnums.PAYCIRCLE_FILL}
							color={ColorEnums.PRIMARY}
						/>
					)}
				/>
			</Card>
		</Col>
	</Row>
);

PayCompanyStatisticRow.propTypes = propTypes;

export default PayCompanyStatisticRow;
