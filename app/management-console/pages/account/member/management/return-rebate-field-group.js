import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Divider, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import SliderUnit from './slider-unit';
import RebateInputUnit from './rebate-input-unit';

const propTypes = {
	initialValues: PropTypes.shape({
		lottery: PropTypes.number,
		treasure: PropTypes.number,
		video: PropTypes.number,
		ug: PropTypes.number,
		live: PropTypes.number,
	}),
	isDividerVisible: PropTypes.bool,
};
const defaultProps = {
	initialValues: {},
	isDividerVisible: false,
};

class ReturnRebateFieldGroup extends Component {
	render() {
		const {
			initialValues,
			isDividerVisible,
		} = this.props;
		const inputStyle = {
			width: '397px',
		};

		let divider = null;

		if (isDividerVisible) {
			divider = <Divider />;
		}

		return (
			<div className='rebate-form-div'>
				<div className="create-form-title">
					<PageBlock.Title text="返点设置" />
				</div>
				<FormItem
					itemName="lottery"
					itemConfig={{
						initialValue: initialValues.lottery,
					}}
					className="rebate-slider-unit"
				>
					<SliderUnit
						min={0}
						max={15}
						step={0.1}
						inputStyle={inputStyle}
						fieldName={'lottery'}
					/>
				</FormItem>
				{divider}
				<FormItem
					label="连环夺宝"
					labelColon={false}
					className="rebate-form-item"
					itemName="treasure"
					itemConfig={{
						initialValue: initialValues.treasure,
						valuePropName: 'value',
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<RebateInputUnit min={0} max={15} step={0.1} inputStyle={inputStyle}></RebateInputUnit>
				</FormItem>
				<FormItem
					label="真人视讯"
					labelColon={false}
					itemName="video"
					itemConfig={{
						initialValue: initialValues.video,
					}}
					className="rebate-form-item"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<RebateInputUnit min={0} max={13} step={0.1} inputStyle={inputStyle}></RebateInputUnit>
				</FormItem>
				<FormItem
					label="UG"
					labelColon={false}
					itemName="ug"
					itemConfig={{
						initialValue: initialValues.ug,
					}}
					className="rebate-form-item"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<RebateInputUnit min={0} max={13} step={0.1} inputStyle={inputStyle}></RebateInputUnit>
				</FormItem>
				<FormItem
					label="AS直播"
					labelColon={false}
					itemName="live"
					itemConfig={{
						initialValue: initialValues.live,
					}}
					className="rebate-form-item"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<RebateInputUnit min={0} max={13} step={0.1} inputStyle={inputStyle}></RebateInputUnit>
				</FormItem>
			</div>
		);
	}
}

ReturnRebateFieldGroup.propTypes = propTypes;
ReturnRebateFieldGroup.defaultProps = defaultProps;

export default ReturnRebateFieldGroup;
