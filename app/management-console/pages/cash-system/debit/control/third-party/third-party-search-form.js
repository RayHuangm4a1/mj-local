import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	FormItem,
	Input,
	Select,
	CollapsableForm,
	InputNumber,
} from 'ljit-react-components';
import {
	statusOptions,
} from './utils';

// TODO Remove paymentPlatformOptions, levelOptions after get from api
const paymentPlatformOptions = [
	{ label: '智付', value: 1, },
	{ label: '畅汇支付', value: 2, },
	{ label: '可乐在线', value: 3, },
];
const levelOptions = [
	{ label: '新人层', value: '1', },
	{ label: '第二层', value: '2', },
	{ label: '第三层', value: '3', },
	{ label: '第四层', value: '4', },
	{ label: '第五层', value: '5', },
	{ label: '第六层', value: '6', },
	{ label: '第七层', value: '7', },
	{ label: '第八层', value: '8', },
	{ label: '第九层', value: '9', },
	{ label: '第十层', value: '10', },
	{ label: '自动加入层', value: '11', },
	{ label: '特殊层A', value: '12', },
	{ label: '特殊层B', value: '13', },
	{ label: '特殊层C', value: '14', },
	{ label: '特殊层D', value: '15', },
	{ label: '特殊层E', value: '16', },
	{ label: '特殊层F', value: '17', },
	{ label: '特殊层G', value: '18', },
	{ label: '特殊层H', value: '19', },
	{ label: '特殊层I', value: '20', },
];

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;

const propTypes = {
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
	onReset: () => {},
};

const COLLAPSE_ITEMS_LENGTH = 4;
const PREFIX_CLASS = 'third-party-search-form';

class ThirdPartySearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expand: true,
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderContentFields = this._renderContentFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
	}
	_handleSubmit(event) {
		event.preventDefault();
		const form = this.collapsableFormInstance.getForm();

		this.props.onSearch(form);
	}

	_handleReset() {
		const form = this.collapsableFormInstance.getForm();

		this.props.onReset(form);
	}

	_renderContentFields() {
		const content = [
			<FormItem
				label="名称："
				key={1}
				itemName="vendorName"
				className={cx(`${PREFIX_CLASS}__form-item`, `${PREFIX_CLASS}__form-item--left`)}
			>
				<Input
					className={`${PREFIX_CLASS}__input`}
					placeholder="请输入名称"
				/>
			</FormItem>,
			<FormItem
				label="层级："
				key={2}
				itemName="level"
				className={cx(`${PREFIX_CLASS}__form-item`, `${PREFIX_CLASS}__form-item--middle`)}
			>
				<Select
					className={`${PREFIX_CLASS}__input`}
					options={levelOptions}
					placeholder="请选择"
				/>
			</FormItem>,
			<FormItem
				label="支付平台："
				key={3}
				itemName="paymentPlatform"
				className={cx(`${PREFIX_CLASS}__form-item`, `${PREFIX_CLASS}__form-item--right`)}
			>
				<Select
					className={`${PREFIX_CLASS}__input`}
					options={paymentPlatformOptions}
					placeholder="请选择"
				/>
			</FormItem>,
			<FormItem
				label="商号："
				key={4}
				itemName="tradeName"
				className={cx(`${PREFIX_CLASS}__form-item`, `${PREFIX_CLASS}__form-item--left`)}
			>
				<Input
					className={`${PREFIX_CLASS}__input`}
					placeholder="请输入商号"
				/>
			</FormItem>,
			<FormItem
				label="单笔出款限制："
				key={5}
				itemName="singlePaymentLimit"
				className={cx(`${PREFIX_CLASS}__form-item`, `${PREFIX_CLASS}__form-item--middle`)}
			>
				<InputNumber
					className={`${PREFIX_CLASS}__input`}
					min={0}
					placeholder="请输入限制金额"
				/>
			</FormItem>,
			<FormItem
				label="状态："
				key={6}
				itemName="status"
				className={cx(`${PREFIX_CLASS}__form-item`, `${PREFIX_CLASS}__form-item--right`)}
			>
				<Select
					className={`${PREFIX_CLASS}__input`}
					options={statusOptions}
					placeholder="请选择"
				/>
			</FormItem>,
		];

		return content;
	}

	_renderCollapseFields(content, collapseItemsLength) {
		const collapse = [];

		content.forEach((item, index) => {
			if (index < collapseItemsLength) collapse.push(item);
		});
		return collapse;
	}

	render() {
		const {
			_handleSubmit,
			_handleReset,
		} = this;

		const content = this._renderContentFields();
		const collapse = this._renderCollapseFields(content, COLLAPSE_ITEMS_LENGTH);

		return (
			<div className="third-party-search-form">
				<CollapsableForm
					expand={this.state.expand}
					onSubmit={_handleSubmit}
					onCancel={_handleReset}
					submitText="查询"
					cancelText="重置"
					collapseType={CollapseTypeEnum.INSERTROW}
					columnSize={ColumnSizeEnums.SMALL}
					ref={(refForm) => this.collapsableFormInstance = refForm}
					expandChildren={content}
					collapseChildren={collapse}
				/>
			</div>
		);
	}
}

ThirdPartySearchForm.propTypes = propTypes;
ThirdPartySearchForm.defaultProps = defaultProps;

export default ThirdPartySearchForm;
