import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Form,
	Row,
	Col,
	FormItem,
	Input,
	DateRangePicker,
	Button,
} from 'ljit-react-components';

const PREFIX_CLASS = 'member-list-search-form';

const propTypes = {
	className: PropTypes.string,
	onSearch: PropTypes.func,
};
const defaultProps = {
	className: '',
	onSearch: () => {},
};

class MemberListSearchForm extends Component {
	constructor() {
		super();
		this._handleClickSubmit = this._handleClickSubmit.bind(this);
		this._handleClickReset = this._handleClickReset.bind(this);
	}

	_handleClickSubmit(event) {
		event.preventDefault();
		const { onSearch, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSearch(values);
			}
		});
	}

	_handleClickReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	render() {
		const {
			_handleClickSubmit,
			_handleClickReset,
			props: {
				className,
			},
		} = this;

		return (
			<div className={cx(PREFIX_CLASS, className)}>
				<Form
					ref={(formRef) => (this.formInstance = formRef)}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<Row type={Row.TypeEnums.FLEX} gutter={24}>
						<Col>
							<FormItem
								label="帳号"
								itemName="username"
								className={`${PREFIX_CLASS}__form-item`}
							>
								<Input
									placeholder="请输入操作者"
									className={`${PREFIX_CLASS}__input`}
								/>
							</FormItem>
						</Col>
						<Col>
							<FormItem
								label="最后登录时间"
								itemName="date"
								className={`${PREFIX_CLASS}__form-item ${PREFIX_CLASS}__form-item--date`}
							>
								<DateRangePicker
									className={`${PREFIX_CLASS}__input`}
									placeholder="请选择日期"
								/>
							</FormItem>
						</Col>
						<Col className={`${PREFIX_CLASS}__tool-column`}>
							<div className={`${PREFIX_CLASS}__btn-wrapper`}>
								<Button
									outline={Button.OutlineEnums.SOLID}
									onClick={_handleClickSubmit}
								>
									查询
								</Button>
								<Button
									outline={Button.OutlineEnums.HOLLOW}
									onClick={_handleClickReset}
								>
									重置
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

MemberListSearchForm.propTypes = propTypes;
MemberListSearchForm.defaultProps = defaultProps;

export default MemberListSearchForm;
