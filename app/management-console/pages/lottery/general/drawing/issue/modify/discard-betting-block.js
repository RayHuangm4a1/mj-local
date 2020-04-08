import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	Table,
} from 'ljit-react-components';
import BlockContainer from './block-container';
import { isDrawingProgressing, } from '../../utils';

const propTypes = {
	drawings: PropTypes.array,
	onCancelDrawing: PropTypes.func,
	isButtonDisabled: PropTypes.bool,
};
const defaultProps = {
	isButtonDisabled: false,
	drawings: [],
	onCancelDrawing: () => {},
};

class DiscardBettingBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowDiscardBettingsConfirmModal: false,
		};
		this._handleClickDiscardBettingsButton = this._handleClickDiscardBettingsButton.bind(this);
		this._handleCloseDiscardBettingsConfirmModal = this._handleCloseDiscardBettingsConfirmModal.bind(this);
		this._handleClickOk = this._handleClickOk.bind(this);
	}
	_handleClickDiscardBettingsButton() {
		this.setState({ isShowDiscardBettingsConfirmModal: true, });
	}
	_handleCloseDiscardBettingsConfirmModal() {
		this.setState({ isShowDiscardBettingsConfirmModal: false, });
	}
	_handleClickOk() {
		this.props.onCancelDrawing();
		this._handleCloseDiscardBettingsConfirmModal();
	}
	render() {
		const {
			drawings,
			isButtonDisabled,
		} = this.props;
		const { status, } = drawings[0];
		const {
			isShowDiscardBettingsConfirmModal,
		} = this.state;
		const {
			_handleClickDiscardBettingsButton,
			_handleCloseDiscardBettingsConfirmModal,
			_handleClickOk,
		} = this;
		const isDisabled = isButtonDisabled || isDrawingProgressing(status);

		const tableColumns = [
			{
				title: '本次下注人数',
				dataIndex: 'bettingsCount',
				key: 'bettingsCount',
				width: 600,
				render: bettingsCount => Number.isNaN(bettingsCount) ? '-' : bettingsCount,
			},
			{
				title: '撤单后平台盈亏',
				dataIndex: 'profitAfterCancel',
				key: 'profitAfterCancel',
				width: 600,
				render: profitAfterCancel => Number.isNaN(profitAfterCancel) ? '-' : profitAfterCancel,
			}
		];

		return (
			<Fragment>
				<BlockContainer
					onClickButton={_handleClickDiscardBettingsButton}
					buttonText="撤单"
					title="撤单"
					isButtonDisabled={isDisabled}
				>
					<Table
						dataSource={drawings}
						columns={tableColumns}
					/>
				</BlockContainer>
				<Modal.Message
					title="通知"
					message="确定要撤单？"
					visible={isShowDiscardBettingsConfirmModal}
					onClickCancel={_handleCloseDiscardBettingsConfirmModal}
					onClickOk={_handleClickOk}
				/>
			</Fragment>
		);
	}
}

DiscardBettingBlock.propTypes = propTypes;
DiscardBettingBlock.defaultProps = defaultProps;

export default DiscardBettingBlock;
