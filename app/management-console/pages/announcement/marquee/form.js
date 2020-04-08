import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Form,
	FormItem,
	Input,
	DatePicker,
	InputTextarea,
	CheckBoxGroup,
	Divider,
} from 'ljit-react-components';

const propTypes = {
	initialValues: PropTypes.shape({
		title: PropTypes.string,
		startAt: PropTypes.object,
		endAt: PropTypes.object,
		content: PropTypes.string,
		level: PropTypes.arrayOf(
			PropTypes.string,
		),
	}),
	submitText: PropTypes.string,
	onSubmit: PropTypes.func,
};

const defaultProps = {
	initialValues: {
		title: '',
		content: '',
	},
	submitText: '新增',
	onSubmit: () => {},
};

const inputStyle = {
	maxWidth: '435px',
	width: '50%',
};


class MarqueeForm extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_handleSubmit(event) {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values, form);
			}
		});
	}

	render() {
		const { initialValues, submitText, } = this.props;
		const { _handleSubmit, } = this;

		return (
			<Form
				submitButtonDisabled
				cancelButtonDisabled
				ref={(refForm) => this.formInstance = refForm}
			>
				<FormItem
					label="标题："
					itemName="title"
					itemConfig={{
						initialValue: initialValues.title,
					}}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<Input
						style={inputStyle}
					/>
				</FormItem>
				<FormItem
					label="开始显示时间："
					itemName="startAt"
					itemConfig={{
						initialValue: initialValues.startAt,
					}}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<DatePicker
						style={inputStyle}
					/>
				</FormItem>
				<FormItem
					label="结束显示时间："
					itemName="endAt"
					itemConfig={{
						initialValue: initialValues.endAt,
					}}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<DatePicker
						style={inputStyle}
					/>
				</FormItem>
				<FormItem
					label="內容："
					itemName="content"
					itemConfig={{
						initialValue: initialValues.content,
					}}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputTextarea
						style={inputStyle}
						minRows={5}
					/>
				</FormItem>
				<FormItem
					label="层级："
					itemName="level"
					itemConfig={{
						initialValue: initialValues.level,
					}}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<CheckBoxGroup
						className="level-checkbox"
						options={[
							{ label: '第一层', value: '1', },
							{ label: '第二层', value: '2', },
							{ label: '第三层', value: '3', },
							{ label: '第四层', value: '4', },
							{ label: '第五层', value: '5', },
							{ label: '第六层', value: '6', },
							{ label: '第七层', value: '7', },
							{ label: '第八层', value: '8', },
							{ label: '第九层', value: '9', },
							{ label: '第十层', value: '10', },
							{ label: '全选', value: 'all', },
						]}
					/>
				</FormItem>
				<Divider orientation={Divider.DirectionTypeEnums.HORIZONTAL}/>
				<div style={{ textAlign: 'right' }}>
					<Button
						outline={Button.OutlineEnums.SOLID}
						onClick={(event) => _handleSubmit(event)}
					>
						{submitText}
					</Button>
				</div>
			</Form>
		);
	}
}

MarqueeForm.propTypes = propTypes;
MarqueeForm.defaultProps = defaultProps;

export default MarqueeForm;
