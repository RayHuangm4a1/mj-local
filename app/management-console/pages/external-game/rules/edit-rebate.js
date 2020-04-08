import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { HeaderButtonBar, Form, FormItem, Button, } from 'ljit-react-components';
import EditPage from './edit-page';
import RebateEditInputTable from './edit-table/rebate-edit-input-table';
import PageBlock from '../../../components/page-block';

const { Title, } = PageBlock;

const propTypes = {
	initialValues: PropTypes.arrayOf(PropTypes.shape({
		gameClass: PropTypes.string,
		highestRebate: PropTypes.number,
	})),
	onBack: PropTypes.func.isRequired,
};

const defaultProps = {};

class GameExternalRulesEditRebatePage extends Component {
	constructor() {
		super();
		this.state = {
			tableData: [],
		};
		this._handleSaveRule = this._handleSaveRule.bind(this);
	}
	_handleSaveRule() {
		const { onBack, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			//TODO save change by API
		});
		onBack();
	}

	render() {
		const { onBack, } = this.props;
		const { tableData, } = this.state;
		const { _handleSaveRule, } = this;

		return (
			<EditPage onBack={onBack}>
				<PageBlock>
					<HeaderButtonBar
						className="table-title-bar"
						left={
							<Title text="外接游戏最高返点"/>
						}
						right={
							<Button
								className="table-title-bar__button"
								outline={Button.OutlineEnums.SOLID}
								onClick={_handleSaveRule}
							>
								修改
							</Button>
						}
					/>
					<Form
						ref={(refForm) => this.formInstance = refForm }
						submitButtonDisabled
						cancelButtonDisabled
					>
						<FormItem
							itemName="rebateTable"
							itemConfig={{
								initialValue: tableData,
							}}
						>
							<RebateEditInputTable/>
						</FormItem>
					</Form>
				</PageBlock>
			</EditPage>
		);
	}
	componentDidMount() {
		//TODO fetch data from API
		const { initialValues, } = this.props;

		this.setState({
			tableData: initialValues,
		});
	}
}

GameExternalRulesEditRebatePage.propTypes = propTypes;
GameExternalRulesEditRebatePage.defaultProps = defaultProps;

export default GameExternalRulesEditRebatePage;
