import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
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
		const lotteryPlayOptions = [
			{ label: '彩类 1', value: '彩类 1' },
			{ label: '彩类 2', value: '彩类 2' },
			{ label: '彩类 3', value: '彩类 3' },
		];
		const lotteryClassOptions = [
			{ label: '彩种 a', value: '彩种 a' },
			{ label: '彩种 b', value: '彩种 b' },
			{ label: '彩种 c', value: '彩种 c' },
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
								label="日期："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="date_range"
							>
								<DateRangePicker inputStyle={{ width: '264px' }} />
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="彩类設定："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="lottery_play_options"
							>
								<Select
									options={lotteryPlayOptions}
									style={{ width: '264px' }}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="彩种設定："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="lotter_class_options"
							>
								{/* className="lottery-class"> */}
								<Select
									options={lotteryClassOptions}
									style={{ width: '264px', 'marginRight': 0 }}
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