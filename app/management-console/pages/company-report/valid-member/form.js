import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
	Input,
	DateRangePicker,
	Row,
	Col,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import './style.styl';

const propTypes = {
	submitText: PropTypes.string,
	cancelText: PropTypes.string,
	onHandleSubmit: PropTypes.func.isRequired,
};
const defaultProps = {
	submitText: '查询',
	cancelText: '重置',
	onHandleSubmit: () => {},
};

class QueryForm extends Component {
	constructor(props) {
		super(props);

		this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
		this._handleFormCancelClick = this._handleFormCancelClick.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
	}

	_handleFormSubmitClick(event) {
		const { onHandleSubmit } = this.props;
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			console.log(values);
		});

		onHandleSubmit({});
	}
	_handleFormCancelClick() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_handleFormChange(allValues) {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			console.log(allValues);
		});
	}

	render() {
		const gamePlayOptions = [
			{ label: '彩票', value: '彩票' },
			{ label: '彩票 2', value: '彩票 2' },
			{ label: '彩票 3', value: '彩票 3' },
		];
		const {
			_handleFormSubmitClick,
			_handleFormCancelClick,
			_handleFormChange,
		} = this;
		const { submitText, cancelText } = this.props;

		return (
			<PageBlock noMinHeight={true}>
				<Form
					className="query-form"
					submitText={submitText}
					cancelText={cancelText}
					onChange={_handleFormChange}
					onSubmit={_handleFormSubmitClick}
					onCancel={_handleFormCancelClick}
					ref={(refForm) => this.formInstance = refForm }
				>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								label="代理帐号："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="user_name"
							>
								<Input
									style={{ width: '264px' }}
									placeholder={"请输入帐号"}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="达投注量："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="total_bet"
							>
								<Input style={{ width: '264px' }} />
							</FormItem>
						</Col>
						<Col span={8} className="range-date-input">
							<FormItem
								label="日期："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="date_range"
							>
								<DateRangePicker inputStyle={{ width: '264px' }} />
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="游戏类型："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="game_play_selected_value"
							>
								<Select
									options={gamePlayOptions}
									style={{ width: '264px' }}
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</PageBlock>
		);
	}
}

QueryForm.propTypes = propTypes;
QueryForm.defaultProps = defaultProps;

export default QueryForm;