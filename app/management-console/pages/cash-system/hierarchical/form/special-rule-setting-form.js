import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	Form,
	LabelContent,
	FormItem,
	CheckBoxGroup,
	InputTextarea,
	Divider,
	RadioGroup,
	Select,
	TextButton,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import IpLimitedModal from '../modal/ip-limited-modal';
import RegionLimitedModal from '../modal/region-limited-modal';

const { Title } = PageBlock;
const propTypes = {
	levels: PropTypes.arrayOf(PropTypes.string),
	comment: PropTypes.string,
	bettingAmountGreaterThanRechargeAmount: PropTypes.string,
	ipData: PropTypes.arrayOf(PropTypes.shape({
		ip: PropTypes.string,
	})),
	regionData: PropTypes.arrayOf(PropTypes.shape({
		province: PropTypes.string,
		city: PropTypes.string,
	})),
	movingLevel: PropTypes.string,
	onSubmit: PropTypes.func,
};

const defaultProps = {
	levels: [],
	comment: '',
	bettingAmountGreaterThanRechargeAmount: '启用',
	movingLevel: '特殊层级第一层',
	ipData: [],
	regionData: [],
	onSubmit: () => {},
};

class SpecialRuleSettingForm extends Component {
	constructor() {
		super();
		this.state = {
			isIpLimitedModalVisible: false,
			isRegionLimitedModalVisible: false,
			ipData: null,
			regionData: null,
			dataSource: null
		};

		this._handleSumbit = this._handleSumbit.bind(this);
		this._handleSubmitIpLimited = this._handleSubmitIpLimited.bind(this);
		this._handleSubmitRegionLimited = this._handleSubmitRegionLimited.bind(this);
	}
	_handleSumbit() {
		const { onSubmit } = this.props;
		const { ipData, regionData, } = this.state;
		const form  = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const saveData = Object.assign(values, {
					ipData,
					regionData,
				});

				onSubmit(saveData);
			}
		});
	}

	_handleSubmitIpLimited(ipData) {
		// TODO send update ip data api
		this.setState({
			ipData,
			isIpLimitedModalVisible: false,
		});
	}
	_handleSubmitRegionLimited(regionData) {
		// TODO send update ip data api
		this.setState({
			regionData,
			isRegionLimitedModalVisible: false,
		});
	}

	render() {
		const {
			ipData,
			regionData,
			isIpLimitedModalVisible,
			isRegionLimitedModalVisible
		} = this.state;
		const {
			_handleSumbit,
			_handleSubmitIpLimited,
			_handleSubmitRegionLimited,
		} = this;
		const {
			levels,
			comment,
			bettingAmountGreaterThanRechargeAmount,
			movingLevel,
		} = this.props;

		return (
			<div className="special-rule-setting-form">
				<Form
					ref={formRef => this.formInstance = formRef }
					onSubmit={_handleSumbit}
					submitText="保存"
					cancelButtonDisabled
				>
					<div style={{ marginLeft: '33%' }}>
						<Title text="特殊规则设定"/>
						<div style={{ margin: '20px 0', color: 'rgba(0, 0, 0, 0.85)', fontSize: '16px' }}>
							是否限制特定层级移层
						</div>
						<FormItem
							label="层级"
							itemName="levels"
							itemConfig={{ initialValue: levels, }}
						>
							<CheckBoxGroup
							// TODO get options
								options={[
									{ label: '第一层', value: '第一层', },
									{ label: '第二层', value: '第二层', },
									{ label: '第三层', value: '第三层', },
									{ label: '第四层', value: '第四层', },
									{ label: '第五层', value: '第五层', },
									{ label: '第六层', value: '第六层', },
									{ label: '第七层', value: '第七层', },
									{ label: '第八层', value: '第八层', },
									{ label: '第九层', value: '第九层', },
									{ label: '第十层', value: '第十层', },
									{ label: '全选', value: '全选', },
								]}
							/>
						</FormItem>
						<FormItem
							label="备注"
							itemName="comment"
							itemConfig={{ initialValue: comment, }}
						>
							<InputTextarea
								minRows={6}
								maxRows={6}
							/>
						</FormItem>
					</div>
					<Divider />
					<div style={{ marginLeft: '33%' }}>
						<div style={{ margin: '20px 0', color: 'rgba(0, 0, 0, 0.85)', fontSize: '16px' }}>
							其他特殊設定
						</div>
						<FormItem
							label="投注金额>充值金额"
							itemName="bettingAmountGreaterThanRechargeAmount"
							itemConfig={{ initialValue: bettingAmountGreaterThanRechargeAmount, }}
						>
							<RadioGroup
								options={[
									{ label: '启用', value: '启用', },
									{ label: '停用', value: '停用', },
								]}
							/>
						</FormItem>
						<LabelContent
							label="IP限制列表"
						>
							<TextButton
								text="新增"
								onClick={() => this.setState({ isIpLimitedModalVisible: true, })}
							/>
						</LabelContent>
						<Table
							dataSource={ipData}
							columns={[
								{
									title: 'IP列表',
									dataIndex: 'ip',
								}
							]}
						/>
						<LabelContent
							label="地区限制列表"
						>
							<TextButton
								text="新增"
								onClick={() => this.setState({ isRegionLimitedModalVisible: true, })}
							/>
						</LabelContent>
						<Table
							dataSource={regionData}
							columns={[
								{
									title: '地區列表',
									dataIndex: 'area',
									render: (data, record) => {
										return <span>{`${record.province}-${record.city}`}</span>;
									}
								},
							]}
						/>
					</div>
					<Divider />
					<div style={{ marginLeft: '33%' }}>
						<Title text="移動层级（特殊层）"/>
						<FormItem
							itemName="movingLevel"
							itemConfig={{ initialValue: movingLevel, }}
						>
							<Select
								options={[
									{ label: '特殊层级第一层', value: '特殊层级第一层', },
									{ label: '特殊层级第二层', value: '特殊层级第二层', },
									{ label: '特殊层级第三层', value: '特殊层级第三层', },
									{ label: '特殊层级第四层', value: '特殊层级第四层', },
									{ label: '特殊层级第五层', value: '特殊层级第五层', },
								]}
								style={{ width: 380 }}
							/>
						</FormItem>
					</div>
					<IpLimitedModal
						isVisible={isIpLimitedModalVisible}
						defaultData={ipData}
						onSubmit={_handleSubmitIpLimited}
						onClose={() => this.setState({ isIpLimitedModalVisible: false, })}
					/>
					<RegionLimitedModal
						defaultData={regionData}
						isVisible={isRegionLimitedModalVisible}
						onSubmit={_handleSubmitRegionLimited}
						onClose={() => this.setState({ isRegionLimitedModalVisible: false, })}
					/>
				</Form>
			</div>
		);
	}
	componentDidMount() {
		// TODO get data
		const { ipData, regionData, } = this.props;

		this.setState({
			ipData,
			regionData
		});
	}
}

SpecialRuleSettingForm.propTypes = propTypes;
SpecialRuleSettingForm.defaultProps = defaultProps;

export default SpecialRuleSettingForm;
