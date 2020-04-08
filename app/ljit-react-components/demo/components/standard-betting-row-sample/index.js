import React, { Component, } from 'react';
import StandardBettingRow from '../../../src/components/standard-betting-row';
import ComponentBlock from '../ComponentBlock';

const codes = [
	{
		name: '0',
		bonus: '',
		isSelected: false,
	},
	{
		name: '1',
		bonus: '',
		isSelected: false,
	},
	{
		name: '2',
		bonus: '',
		isSelected: false,
	},
	{
		name: '3',
		bonus: '',
		isSelected: false,
	},
	{
		name: '4',
		bonus: '',
		isSelected: false,
	},
	{
		name: '5',
		bonus: '',
		isSelected: true,
	},
	{
		name: '6',
		bonus: '',
		isSelected: true,
	},
	{
		name: '7',
		bonus: '',
		isSelected: true,
	},
	{
		name: '8',
		bonus: '',
		isSelected: true,
	},
	{
		name: '9',
		bonus: '',
		isSelected: true,
	},
];
const quickOptions = ['大', '小', '單', '雙', '全','清',];
const LongHuHeCodes = [
	{
		name: '龙',
		bonus: '',
		isSelected: true,
	},
	{
		name: '和',
		bonus: '',
		isSelected: false,
	},
	{
		name: '虎',
		bonus: '',
		isSelected: false,
	},
];


const placeholder =
`说明：1.支持常见的各种单式格式，间隔符如：空格、回车、逗号、分号。
	   2.上传文件必须是.txt或.csv格式
	   3.文件较大时会导致上传时间较长，请耐心等候
	   格式范例：12345 23456 34567 45678`;


class StandardBettingRowSample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
		};
		this.onChangeText = this.onChangeText.bind(this);
	}
	onChangeText(data) {
		this.setState({
			data,
		});
	}
	render() {
		const { data, } = this.state;
		const { onChangeText, } = this;

		return (
			<ComponentBlock title="StandardBettingRow">
				<ComponentBlock title="code-ball">
					<StandardBettingRow.CodeBall
						title="万位"
						codes={codes}
						quickOptions={quickOptions}
						onPressCodeBall={ () => {console.log('code'); }}
						onPressQuickOption={ () => {console.log('option'); }}
					/>
				</ComponentBlock>
				<ComponentBlock title="Long-hu-he">
					<StandardBettingRow.LongHuHe
						title='特殊号'
						codes={LongHuHeCodes}
						onPressCodeBall={ (index) => { console.log(index); }}
					/>
				</ComponentBlock>
				<ComponentBlock title="text-input">
					<StandardBettingRow.TextInput
						placeholder={placeholder}
						data={data}
						onChangeText={onChangeText}
					/>
				</ComponentBlock>
			</ComponentBlock>
		);
	}
}

export default StandardBettingRowSample;
