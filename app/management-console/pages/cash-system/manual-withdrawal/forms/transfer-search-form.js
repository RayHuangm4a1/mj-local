import React, { Component } from 'react';
import {
	Form,
	FormItem,
	Input,
	Button,
	Row,
	Col,
} from 'ljit-react-components';
import PropTypes from 'prop-types';
import { PREFIX, } from '../utils';

const propTypes = {
	onSubmit: PropTypes.func,
	onClickBatchAdd: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
	onClickBatchAdd: () => {},
};

const PREFIX_CLASS = `${PREFIX}-search`;

class TransferSearchForm extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleBatchAdd = this._handleBatchAdd.bind(this);
	}
	_handleSubmit(e) {
		e.preventDefault();
		const { refForm: { validateFieldsAndScroll, } } = this;
		const { onSubmit } = this.props;

		validateFieldsAndScroll((err, values) => {
			if (!err) {
				onSubmit(values);
			}
		});
	}
	_handleBatchAdd(e) {
		e.preventDefault();
		const { onClickBatchAdd, } = this.props;

		onClickBatchAdd();
	}

	render() {
		const {
			_handleSubmit,
			_handleBatchAdd,
		} = this;

		return (
			<div className={PREFIX_CLASS}>
				<Form
					onSubmit={_handleSubmit}
					ref={(refForm) => this.refForm = refForm }
					cancelButtonDisabled={true}
					submitButtonDisabled={true}
				>
					<Row
						gutter={24}
						type={Row.TypeEnums.FLEX}
					>
						<Col>
							<FormItem
								label={"转出帐号"}
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName={"transferOutAccount"}
							>
								<Input
									className={`${PREFIX_CLASS}__add-form-input ${PREFIX_CLASS}__add-form-input--transfer-out`}
									placeholder="请输入帐号"
								/>
							</FormItem>
						</Col>
						<Col className={`${PREFIX_CLASS}__add-form-item ${PREFIX_CLASS}__add-form-item--transfer-in`}>
							<FormItem
								label={"转入帐号"}
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName={"transferInAccount"}
							>
								<Input
									className={`${PREFIX_CLASS}__add-form-input ${PREFIX_CLASS}__add-form-input--transfer-in`}
									placeholder="请输入帐号"
								/>
							</FormItem>
						</Col>
						<Col className={`${PREFIX_CLASS}__button-group`}>
							<Button
								className={`${PREFIX_CLASS}__search-button`}
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={_handleSubmit}>
								{"搜寻"}
							</Button>
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								icon={Button.IconEnums.PLUS}
								onClick={_handleBatchAdd}
							>
								{"批量新增"}
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

TransferSearchForm.propTypes = propTypes;
TransferSearchForm.defaultProps = defaultProps;

export default TransferSearchForm;
