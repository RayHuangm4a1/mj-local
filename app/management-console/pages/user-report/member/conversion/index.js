import React, { Component } from "react";
import { Card, Statistic, Button, Icon, } from "ljit-react-components";
import PageBlock from "../../../../components/page-block";
import ConversionSearchForm from "./conversion-search-form";
import { TransferPointRecordTable, } from '../../../../components/table';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../../lib/enums';
import "./style.styl";

const propTypes = {
	layoutConfigs: layoutConfigsPropTypes,
};

const { LARGE, } = Statistic.SizeTypeEnums;

const fakeConversionData = [
	{
		key: '1',
		username: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "AG电子",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 1,
		operator: "admin",
		remark: "",
	},
	{
		key: '2',
		username: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "CQ9",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 0,
		operator: "admin",
		remark: "",
	},
	{
		key: '3',
		username: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "VR电子",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 2,
		operator: "admin",
		remark: "",
	},
	{
		key: '4',
		username: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "JR电子",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 1,
		operator: "admin",
		remark: "",
	},
];
const fakeTotalAmountData = {
	totalTransferIn: 1819,
	totalTransferOut: 3318500,
	totalTransferIn_onHold: 0,
	totalTransferOut_onHold: 0
};

class UserReportMemberConversionPage extends Component {
	constructor() {
		super();
		this.state = {
			isShownSearchResult: false,
			conversionData: null,
			totalAmountData: null
		};

		this._handleOnSubmitSearch = this._handleOnSubmitSearch.bind(this);
		this._handleOnClickResetSearch = this._handleOnClickResetSearch.bind(this);
		this._handleOnClickRedoProcess = this._handleOnClickRedoProcess.bind(this);
		this._renderSearchResult = this._renderSearchResult.bind(this);
	}

	_handleOnSubmitSearch(query) {
		// TODO add api to submit search
		this.setState({
			isShownSearchResult: true,
			conversionData: fakeConversionData,
			totalAmountData: fakeTotalAmountData,
		});
	}
	_handleOnClickResetSearch() {
		this.setState({
			isShownSearchResult: false,
			conversionData: null,
			totalAmountData: null,
		});
	}
	_handleOnClickRedoProcess() {
		// TODO add api to redo process
	}
	_renderSearchResult() {
		const { _handleOnClickRedoProcess, } = this;
		const { totalAmountData, conversionData } = this.state;
		const {
			totalTransferIn,
			totalTransferOut,
			totalTransferIn_onHold,
			totalTransferOut_onHold
		} = totalAmountData;

		return (
			<PageBlock>
				<div className="conversion-result__header">
					<PageBlock.Title text="转换记录"/>
					<Button
						className="conversion-result__header-action"
						onClick={_handleOnClickRedoProcess}
						color={Button.ColorEnums.BRIGHTBLUE500}
						outline={Button.OutlineEnums.HOLLOW}
					>
						重新处理
					</Button>
				</div>
				<div className="conversion-result__cards">
					<Card>
						<Statistic
							title={"总转入"}
							value={totalTransferIn}
							prefix={<Icon type="pay-circle"/>}
							sizeType={LARGE}
						/>
					</Card>
					<Card>
						<Statistic
							title={"总转出"}
							value={totalTransferOut}
							prefix={<Icon type="pay-circle"/>}
							sizeType={LARGE}
						/>
					</Card>
					<Card>
						<Statistic
							title={"总转入（待处理）"}
							value={totalTransferIn_onHold}
							prefix={<Icon type="pay-circle"/>}
							sizeType={LARGE}
						/>
					</Card>
					<Card>
						<Statistic
							title={"总转出（待处理）"}
							value={totalTransferOut_onHold}
							prefix={<Icon type="pay-circle"/>}
							sizeType={LARGE}
						/>
					</Card>
				</div>
				<TransferPointRecordTable dataSource={conversionData}/>
			</PageBlock>
		);
	}

	render() {
		const { isShownSearchResult } = this.state;
		const {
			_handleOnSubmitSearch,
			_handleOnClickResetSearch,
			_renderSearchResult,
		} = this;
		const { layoutConfigs: { isFeatureActive, }, } = this.props;

		let searchResult = null;

		if (isShownSearchResult) {
			searchResult = _renderSearchResult();
		}
		if (!isFeatureActive) {
			return null;
		}
		return (
			<div className="conversion">
				<PageBlock noMinHeight>
					<ConversionSearchForm
						onSubmit={_handleOnSubmitSearch}
						onClickReset={_handleOnClickResetSearch}
					/>
				</PageBlock>
				{searchResult}
			</div>
		);
	}
}

UserReportMemberConversionPage.propTypes = propTypes;

export default compose(
	withFeatureToggle(FeatureCodeEnum.USERREPORT_MEMBER_CONVERSION)
)(UserReportMemberConversionPage);
