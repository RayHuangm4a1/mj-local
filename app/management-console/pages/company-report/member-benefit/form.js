import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
	DateRangePicker,
	Row,
	Col,
	LabelContent,
	Button,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import './style.styl';

const propTypes = {
	onHandleSubmit: PropTypes.func.isRequired,
	submitButtonDisabled: PropTypes.bool,
	cancelButtonDisabled: PropTypes.bool,
};
const defaultProps = {
	submitButtonDisabled: true,
	cancelButtonDisabled: true,
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

		return (
			<PageBlock noMinHeight={true}>
				<Form
					onChange={_handleFormChange}
					submitButtonDisabled={true}
					cancelButtonDisabled={true}
					className="query-form"
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
								label="游戏类型："
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName="game_play"
							>
								<Select
									options={gamePlayOptions}
									style={{ width: '264px' }}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<LabelContent>
								<Button
									outline={Button.OutlineEnums.SOLID}
									onClick={_handleFormSubmitClick}
								>
									查询
								</Button>
								<Button
									outline={Button.OutlineEnums.HOLLOW}
									style={{ marginLeft: '16px', }}
									onClick={_handleFormCancelClick}
								>
									重置
								</Button>
							</LabelContent>
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