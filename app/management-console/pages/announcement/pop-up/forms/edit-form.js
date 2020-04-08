import React, { Component } from 'react';
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
	HeaderButtonBar,
} from 'ljit-react-components';

const propTypes = {
	onSubmit: PropTypes.func,
	onBack: PropTypes.func,
	initialValues: PropTypes.shape({
		title: PropTypes.string,
		startShowingTime: PropTypes.object,
		endShowingTime: PropTypes.object,
		content: PropTypes.string,
		levels: PropTypes.array
	}),
	isEditing: PropTypes.bool,
};

const defaultProps = {
	onSubmit: () => {},
	onBack: () => {},
	initialValues: {},
	isEditing: false,
};

class EditForm extends Component {
	constructor() {
		super();

		this._handleCreate = this._handleCreate.bind(this);
	}

	_handleCreate() {
		const form = this.formInstance.getForm();
		const { onSubmit } = this.props;

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
			}
		});
	}

	render() {
		const { initialValues, isEditing, } = this.props;
		const { _handleCreate } = this;

		return (
			<React.Fragment>
				<Form
					ref={formRef => this.formInstance = formRef}
					onSubmit={this._handleFormSubmit}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						itemName="title"
						label="标题"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{ initialValue: initialValues.title, }}
					>
						<Input style={{ width: 435, }}/>
					</FormItem>
					<FormItem
						itemName="startShowingTime"
						label="开始显示时间"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{ initialValue: initialValues.startShowingTime, }}
					>
						<DatePicker style={{ width: 435, }}/>
					</FormItem>
					<FormItem
						itemName="endShowingTime"
						label="结束显示时间"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{ initialValue: initialValues.endShowingTime, }}
					>
						<DatePicker style={{ width: 435, }}/>
					</FormItem>
					<FormItem
						itemName="content"
						label="內容"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{ initialValue: initialValues.content, }}

					>
						<InputTextarea
							style={{ width: 435, }}
							minRows={6}
						/>
					</FormItem>
					<FormItem
						itemName="levels"
						label="层级"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{ initialValue: initialValues.levels, }}

					>
						<CheckBoxGroup
							options={[
								{ label: '第一层', value: 'levelOne', },
								{ label: '第二层', value: 'levelTwo', },
								{ label: '第三层', value: 'levelThree', },
								{ label: '第四层', value: 'levelFour', },
								{ label: '第五层', value: 'levelFive', },
								{ label: '第六层', value: 'levelSix', },
								{ label: '第七层', value: 'levelSeven', },
								{ label: '第八层', value: 'levelEight', },
								{ label: '第九层', value: 'levelNine', },
								{ label: '第十层', value: 'levelTen', },
								{ label: '全选', value: 'levelAll', },
							]}
						/>
					</FormItem>
				</Form>
				<Divider/>
				<HeaderButtonBar
					right={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={_handleCreate}
						>
							{isEditing ? "保存设置" : "新增"}
						</Button>
					)}
				/>
			</React.Fragment>
		);
	}
}

EditForm.propTypes = propTypes;
EditForm.defaultProps = defaultProps;

export default EditForm;
