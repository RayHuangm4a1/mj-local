import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Row, InputNumber, LabelContent, SliderBar } from 'ljit-react-components';

class SliderUnit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || 0,
		};

		this._handleChange = this._handleChange.bind(this);
	}

	_handleChange(value) {
		this.setState({
			value: value,
		});

		this.props.onChange(value);
	}

	render() {
		const { inputStyle, min, max, step, } = this.props;

		return (
			<div>
				<LabelContent
					label="快速設置"
					labelColon={false}
					className="rebate-form-item"
					columnType={LabelContent.ColumnTypeEnums.MEDIUM}
				>
					<Row className={cx('slider-wrapper','wrapper')} type={Row.TypeEnums.FLEX}>
						<SliderBar
							min={min}
							max={max}
							step={step}
							value={this.state.value}
							className="rebate-slider"
							onChange={this._handleChange}
							suffix="单位"
						/>
						<span className="unit-text">上限：{max}   下限：{min}</span>
					</Row>
				</LabelContent>
				<LabelContent
					label="时时彩"
					labelColon={false}
					className="rebate-form-item"
					columnType={LabelContent.ColumnTypeEnums.MEDIUM}
				>
					<div>
						<InputNumber min={min} max={max} step={step} value={this.state.value} style={inputStyle} onChange={this._handleChange}></InputNumber>
						<span className="unit-text">{(this.state.value*20+1700||1700)}</span>
					</div>
				</LabelContent>
			</div>
		);
	}
}


SliderUnit.propTypes = {
	fieldName: PropTypes.string,
	inputStyle: PropTypes.object,
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	labelLayout: PropTypes.object,
	onChange: PropTypes.func,
};
SliderUnit.defaultProps = {
};

export default SliderUnit;
