import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import BlockContainer from './block-container';
import {
	isDateValid,
	formatDate,
} from '../../../../../../../lib/moment-utils';
import { getOpencodeColumns, } from '../../utils';
import { isDrawingProgressing, } from '../../utils';

const propTypes = {
	drawings: PropTypes.array,
	positions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	})),
	onClickModifyButton: PropTypes.func,
	isButtonDisabled: PropTypes.bool,
};
const defaultProps = {
	isButtonDisabled: false,
	positions: [],
	drawings: [],
	onClickModifyButton: () => {},
};

const OpencodeBlock = ({
	drawings,
	onClickModifyButton,
	positions,
	isButtonDisabled,
}) => {
	const tableColumns = [
		{
			title: '期号',
			dataIndex: 'issue',
			key: 'issue',
		},
		{
			title: '开奖时间',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (value) => isDateValid(value) ? formatDate(value) : '-',
		},
		{
			title: '开盘时间',
			dataIndex: 'openedAt',
			key: 'openedAt',
			render: (value) => isDateValid(value) ? formatDate(value) : '-',
		},
		{
			title: '开奖球号',
			children: getOpencodeColumns(positions),
		},
	];
	const { status, } = drawings[0];
	const isDisabled = isButtonDisabled || isDrawingProgressing(status);

	return (
		<Fragment>
			<BlockContainer
				onClickButton={onClickModifyButton}
				buttonText="修改开奖球号"
				title="开奖资讯"
				isButtonDisabled={isDisabled}
			>
				<Table
					isBordered
					dataSource={drawings}
					columns={tableColumns}
				/>
			</BlockContainer>
		</Fragment>
	);
};

OpencodeBlock.propTypes = propTypes;
OpencodeBlock.defaultProps = defaultProps;

export default OpencodeBlock;
