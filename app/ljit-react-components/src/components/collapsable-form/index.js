import { Row, Col, Button, Icon, } from 'antd';
import Form from '../form';
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const ColumnSizeEnums = {
	LARGE: 'large',
	MEDIUM: 'medium',
	SMALL: 'small',
};

const CollapseTypeEnum = {
	DEFAULT: 'default',
	INSERTROW: 'insertRow',
};

const {
	LARGE,
	MEDIUM,
	SMALL,
} = ColumnSizeEnums;

const {
	DEFAULT,
	INSERTROW,
} = CollapseTypeEnum;

const ColumnEnums = {
	[LARGE]: 24,
	[MEDIUM]: 12,
	[SMALL]: 8,
};

const propTypes= {
	expand: PropTypes.bool.isRequired,
	submitText: PropTypes.string,
	cancelText: PropTypes.string,
	submitButtonDisabled: PropTypes.bool,
	cancelButtonDisabled: PropTypes.bool,
	footer:  PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	columnSize: PropTypes.oneOf([
		LARGE,
		MEDIUM,
		SMALL,
		'',
	]),
	collapseType: PropTypes.oneOf([
		DEFAULT,
		INSERTROW,
		'',
	]),
	expandChildren: PropTypes.arrayOf(PropTypes.node),
	collapseChildren: PropTypes.arrayOf(PropTypes.node),
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	form: PropTypes.object,
	isButtonDisabled: PropTypes.bool,
};

const defaultProps = {
	submitText: '确认',
	cancelText: '取消',
	submitButtonDisabled: false,
	cancelButtonDisabled: false,
	columnSize: SMALL,
	collapseType: DEFAULT,
	onChange: () => {},
	onSubmit: () => {},
	onCancel: () => {},
	isButtonDisabled: false,
};

class CollapsableForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expand: props.expand,
		};

		this._renderFieldsRow = this._renderFieldsRow.bind(this);
		this._renderFields = this._renderFields.bind(this);
		this._renderOperatingButtonsRow = this._renderOperatingButtonsRow.bind(this);
		this._renderOperatingButtons = this._renderOperatingButtons.bind(this);
		this._toggle = this._toggle.bind(this);
	}
	getForm() {
		return this.formInstance.getForm();
	}
	_renderFieldsRow() {
		return (
			<Row className="ljit-collapsable-form-row" type="flex" align="top" justify="start" >
				{this._renderFields()}
			</Row>
		);
	}
	_renderFields() {
		const { expand, } = this.state;
		const { expandChildren, collapseChildren, columnSize, collapseType, } = this.props;
		const children = expand ? expandChildren : collapseChildren;

		let fields = [];

		if (children) {
			fields = children.map((child, i) => {
				return (
					<Col span={ColumnEnums[columnSize]} key = {i} className="ljit-collapsable-form-col">
						{child}
					</Col>
				);
			});

			if (!expand && collapseType === INSERTROW) {
				fields.push(
					<Col span={8} offset={0} key="buttons" className="ljit-collapsable-form-col" style={{ textAlign: 'left', }}>
						{this._renderOperatingButtons()}
					</Col>
				);
			}
		}

		return fields;
	}
	_renderOperatingButtonsRow() {
		return (
			<Row className="ljit-collapsable-form-button-row" type="flex" align="top" justify="start">
				<Col span={8} offset={16} key="buttons" className="ljit-collapsable-form-col" style={{ textAlign: 'right', }}>
					{this._renderOperatingButtons()}
				</Col>
			</Row>
		);
	}
	_renderOperatingButtons() {
		const { expand, } = this.state;
		const {
			submitText,
			cancelText,
			footer,
			onSubmit,
			onCancel,
			isButtonDisabled,
			submitButtonDisabled,
			cancelButtonDisabled, } = this.props;
		const buttons = [];

		if (!submitButtonDisabled) {
			buttons.push(<Button className="ljit-collapsable-form-search-btn"
				key="search-btn"
				type="primary"
				htmlType="submit"
				disabled={isButtonDisabled}
				onClick={onSubmit}>
				{submitText}
			</Button>);
		}

		if (!cancelButtonDisabled) {
			buttons.push(<Button className="ljit-collapsable-form-reset-btn"
				key="reset-btn"
				disabled={isButtonDisabled}
				onClick={onCancel}>
				{cancelText}
			</Button>);
		}

		return (
			<React.Fragment>
				{footer}
				{buttons}
				<a className="ljit-collapsable-form-collapse" onClick={this._toggle} >{expand ? '收起' : '展开'}
					<Icon type={expand ? 'up' : 'down'}  /></a>
			</React.Fragment>
		);
	}
	_toggle() {
		const { expand, } = this.state;

		this.setState({ expand : !expand, });
	}
	render() {
		const { expand, } = this.state;
		const { collapseType, onSubmit, onCancel, onChange, } = this.props;
		const shouldRenderButtonsAtBottomRow = collapseType === DEFAULT || expand;

		return (
			<Form className="ljit-collapsable-form"
				ref={(form) => this.formInstance = form}
				submitButtonDisabled={true}
				cancelButtonDisabled={true}
				onSubmit={onSubmit}
				onCancel={onCancel}
				onChange={onChange}
			>
				{this._renderFieldsRow ()}
				{shouldRenderButtonsAtBottomRow ? this._renderOperatingButtonsRow() : null}
			</Form>
		);
	}
}

CollapsableForm.propTypes = propTypes;
CollapsableForm.defaultProps = defaultProps;
CollapsableForm.ColumnSizeEnums = ColumnSizeEnums;
CollapsableForm.CollapseTypeEnum = CollapseTypeEnum;

export default CollapsableForm;
