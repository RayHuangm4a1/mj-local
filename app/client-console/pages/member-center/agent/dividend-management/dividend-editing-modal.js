import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Icon,
	LabelText,
	DividendInputRangeTable,
} from 'ljit-react-components';
import { dataAmountDividedTenThousand } from '../../../../../lib/dividend-utils'; 
import SubmitFormModal from '../../../../components/submit-form-modal';

const { checkIsLastRowSelected } = DividendInputRangeTable;

const propTypes = {
	isVisible: PropTypes.bool,
	onToggleModal: PropTypes.func,
	dividends: PropTypes.array,
	dividendTemplate: PropTypes.array,
	usersName: PropTypes.string,
	onSaveSetting: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onToggleModal: () => {},
	onSaveSetting: () => {},
	dividends: [],
	dividendTemplate: [],
};

class DividendEditingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dividends: [],
			isSaveable: true,
		};
		this._handleCancel = this._handleCancel.bind(this);
		this._handleApplyTemplate = this._handleApplyTemplate.bind(this);
		this._handleSaveTemplate = this._handleSaveTemplate.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._renderTitle = this._renderTitle.bind(this);
		this._renderFooter = this._renderFooter.bind(this);
	}
	_handleCancel() {
		const { onToggleModal } = this.props;

		onToggleModal();
	}
	_handleApplyTemplate() {
		// get template from API
		const { dividendTemplate } = this.props;

		this.setState({
			dividends: dividendTemplate,
			isSaveable: checkIsLastRowSelected(dividendTemplate)
		});
	}
	_handleSaveTemplate() {
		const { onToggleModal, onSaveSetting } = this.props;
		const { dividends, isSaveable } = this.state;
		const postData = dividends.map(item => {
			return {
				amount: item.amount,
				ratio: item.ratio
			};
		});

		if (isSaveable) {
			onSaveSetting(postData);
			onToggleModal();
		}
	}
	_handleChangeTable(tableData) {
		this.setState({
			dividends: tableData,
			isSaveable: checkIsLastRowSelected(tableData),
		});
	}
	_renderTitle() {
		return (
			<div className="ljit-dividend-editing-modal__title">
				分红设置
				<span>
					<Icon
						type={Icon.IconTypeEnums.INFO_FILL}
						size={Icon.SizeEnums.X_SMALL}
						style={{ marginRight: '6px', }}
					/>
					最多可设置 15 条
				</span>
			</div>
		);
	}
	_renderFooter() {
		const {
			_handleCancel,
			_handleApplyTemplate,
			_handleSaveTemplate,
		} = this;

		return (
			<div className="ljit-dividend-editing-modal__footer">
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					color={Button.ColorEnums.GREY30}
					onClick={_handleCancel}
				>取消</Button>
				<Button
					outline={Button.OutlineEnums.SOLID}
					color={Button.ColorEnums.ORANGE}
					onClick={_handleApplyTemplate}
				>套用模板</Button>
				<Button
					outline={Button.OutlineEnums.SOLID}
					color={Button.ColorEnums.ORANGE}
					onClick={_handleSaveTemplate}
				>保存</Button>
			</div>
		);
	}

	render() {
		const {
			_renderTitle,
			_renderFooter,
			_handleChangeTable,
			_handleCancel,
		} = this;
		const {
			isVisible,
			usersName,
		} = this.props;
		const {
			dividends,
		} = this.state;

		return (
			<SubmitFormModal
				className="ljit-dividend-editing-modal"
				width="880px"
				title={_renderTitle()}
				footer={_renderFooter()}
				isVisible={isVisible}
				onClickCancel={_handleCancel}
			>
				<div className="ljit-dividend-editing-modal__content">
					<LabelText
						label="会员名"
						text={usersName}
						size={LabelText.SizeEnums.SMALL}
					/>
					<DividendInputRangeTable
						onChange={_handleChangeTable}
						tableData={dividends}
					/>
				</div>
			</SubmitFormModal>
		);
	}
	componentDidUpdate(prevProps) {
		const { dividends, isVisible } = this.props;

		if (prevProps.isVisible !== isVisible) {
			this.setState({
				dividends: dividends.map(dataAmountDividedTenThousand),
				isSaveable: checkIsLastRowSelected(dividends)
			});
		}
	}
}

DividendEditingModal.propTypes = propTypes;
DividendEditingModal.defaultProps= defaultProps;

export default DividendEditingModal;
