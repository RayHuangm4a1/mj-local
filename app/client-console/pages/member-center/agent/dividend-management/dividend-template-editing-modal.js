import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Icon,
	DividendInputRangeTable,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';

const { checkIsLastRowSelected } = DividendInputRangeTable;

const propTypes = {
	isVisible: PropTypes.bool,
	onToggleModal: PropTypes.func,
	onSaveTemplate: PropTypes.func,
	dividendTemplate: PropTypes.array,
	usersName: PropTypes.string,
};

const defaultProps = {
	isVisible: false,
	onToggleModal: () => {},
	onSaveTemplate: () => {},
	dividendTemplate: [],
};

class DividendTemplateEditingModal extends Component {
	constructor() {
		super();
		this.state= {
			dividendTemplate: [],
			isSaveable: true,
		};
		this._renderTitle = this._renderTitle.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleSaveTemplate = this._handleSaveTemplate.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
	}
	_renderTitle() {
		return (
			<div className="ljit-dividend-template-editing-modal__title">
				分红模板
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
	_handleCancel() {
		const { onToggleModal } = this.props;

		onToggleModal();
	}
	_handleSaveTemplate() {
		const { onToggleModal, onSaveTemplate } = this.props;
		const { dividendTemplate, isSaveable } = this.state;
		const updatedTemplate = dividendTemplate.map(item => {
			return {
				amount: item.amount,
				ratio: item.ratio
			};
		});

		if (isSaveable) {
			onSaveTemplate(updatedTemplate);
			onToggleModal();
		}
	}
	_handleChangeTable(value) {
		this.setState({
			dividendTemplate: value,
			isSaveable: checkIsLastRowSelected(value),
		});
	}
	render() {
		const {
			_renderTitle,
			_handleCancel,
			_handleSaveTemplate,
			_handleChangeTable,
		} = this;
		const {
			isVisible,
		} = this.props;
		const {
			dividendTemplate,
		} = this.state;

		return (
			<SubmitFormModal
				className="ljit-dividend-template-editing-modal"
				width={"880px"}
				title={_renderTitle()}
				cancelText="取消"
				okText="保存"
				onClickCancel={_handleCancel}
				onClickOk={_handleSaveTemplate}
				isVisible={isVisible}
			>
				<div className="ljit-dividend-template-editing-modal__content">
					<DividendInputRangeTable
						tableData={dividendTemplate}
						onChange={_handleChangeTable}
					/>
				</div>
			</SubmitFormModal>
		);
	}
	componentDidUpdate(prevProps) {
		const { dividendTemplate, isVisible } = this.props;

		if (prevProps.isVisible !== isVisible) {
			this.setState({
				dividendTemplate,
				isSaveable: checkIsLastRowSelected(dividendTemplate)
			});
		}
	}
}

DividendTemplateEditingModal.propTypes = propTypes;
DividendTemplateEditingModal.defaultProps= defaultProps;

export default DividendTemplateEditingModal;
