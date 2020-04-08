import React from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
} from 'ljit-react-components';
import PageBlock from '../../../../../../components/page-block';
import BlockContainer from './block-container';

const propTypes = {
	drawings: PropTypes.array,
	onClickDetailButton: PropTypes.func,
};
const defaultProps = {
	drawings: [],
	onClickDetailButton: () => {},
};

const CorrectionBlock = ({
	drawings,
	onClickDetailButton,
}) => {
	const tableColumns = [
		{
			title: '目前余额负数人数',
			dataIndex: 'numberOfbalanceIsNegative',
			key: 'numberOfbalanceIsNegative',
			width: 600,
		},
		{
			title: '操作',
			dataIndex: '',
			key: '',
			width: 600,
			render: function render() {
				{/* TODO: 需確認按下撤單後這裡按鈕的狀態 */}
				return (
					<TextButton
						onClick={onClickDetailButton}
						text="详细"
					/>
				);
			}
		}
	];

	return (
		<PageBlock>
			<BlockContainer title="负数补正">
				<Table
					dataSource={drawings}
					columns={tableColumns}
				/>
			</BlockContainer>
		</PageBlock>
	);
};

CorrectionBlock.propTypes = propTypes;
CorrectionBlock.defaultProps = defaultProps;

export default CorrectionBlock;
