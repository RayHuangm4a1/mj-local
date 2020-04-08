import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderButtonBar,
	DividendInputRangeTable,
	Notify,
} from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import { connect } from 'ljit-store-connecter';
import { dataAmountMultiplyTenThousand } from '../../../../../../lib/dividend-utils';
import { amountDivided10000 } from '../utils';
import { platformActions, } from '../../../../../controller';
import { LoadingStatusEnum, } from '../../../../../../lib/enums';
import './style.styl';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const { updatePlatformDividendSettingsAction }= platformActions;
const { checkIsLastRowSelected, } = DividendInputRangeTable;
const { Title, } = PageBlock;
const propTypes = {
	onBack: PropTypes.func.isRequired,
	dividendSettings: PropTypes.arrayOf(PropTypes.shape({
		ratio: PropTypes.number,
		amount: PropTypes.number,
	})),
	updatePlatformDividendSettingsAction: PropTypes.func.isRequired,
	updateDividendSettingsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING])
};

class AccountZhaoShangAccountDividendRuleSettingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: props.dividendSettings,
			isSaveable: true,
		};

		this._handleSaveEdit = this._handleSaveEdit.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
	}

	_handleSaveEdit() {
		const { isSaveable, dataSource } = this.state;
		const { updatePlatformDividendSettingsAction } = this.props;
		const updatedDividendSetting = dataSource.map(dataAmountMultiplyTenThousand);

		if (isSaveable) {
			updatePlatformDividendSettingsAction(updatedDividendSetting);
		}
	}

	_handleChangeTable(tableData) {
		this.setState({
			dataSource: tableData,
			isSaveable: checkIsLastRowSelected(tableData),
		});
	}

	render() {
		const { onBack, } = this.props;
		const { _handleSaveEdit, _handleChangeTable } = this;
		const { dataSource, } = this.state;

		return (
			<div className="zhaoshang-account-dividend-rule-setting">
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={onBack}
				>
					回到上一页
				</Button>
				<PageBlock>
					<HeaderButtonBar
						right={
							<Button
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={_handleSaveEdit}
							>
								储存修改
							</Button>
						}
					/>
					<HeaderButtonBar
						left={<Title text="招商分红"/>}
					/>
					<DividendInputRangeTable
						tableData={dataSource}
						onChange={_handleChangeTable}
					/>
				</PageBlock>
			</div>
		);
	}
	componentDidUpdate(prevProps) {
		const {
			updateDividendSettingsLoadingStatus,
		} = this.props;

		if (prevProps.updateDividendSettingsLoadingStatus === LOADING && updateDividendSettingsLoadingStatus === SUCCESS) {
			// TODO use  notification action
			Notify.success("分红规则修改成功");
		}
	}
}

AccountZhaoShangAccountDividendRuleSettingPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		dividendSettings: amountDivided10000(state.platform.get('data').toObject().dividendSettings),
		updateDividendSettingsLoadingStatus: state.platform.get('updateDividendSettingsLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updatePlatformDividendSettingsAction: (dividendSettings) => dispatch(updatePlatformDividendSettingsAction(dividendSettings)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountZhaoShangAccountDividendRuleSettingPage);
