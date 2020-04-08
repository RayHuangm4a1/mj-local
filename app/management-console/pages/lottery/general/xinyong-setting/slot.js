import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { CheckBox, CodeBall, StatusTag } from 'ljit-react-components';

const { SUCCESS, ERROR } = StatusTag.StatusEnums;

const PREFIX_CLASS = 'general-xinyong-setting';

const propTypes = {
	isEditing: PropTypes.bool,
	onChangeStatus: PropTypes.func,
	play: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		status: PropTypes.string,
	}),
};

const defaultProps = {
	isEditing: false,
	onChangeStatus: () => {},
};

class XinYongPlayStatusSlot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOnline: props.play ? props.play.status === 'online' : false,
		};

		this._handleChangeStatus = this._handleChangeStatus.bind(this);
		this._renderSlotBall = this._renderSlotBall.bind(this);
		this._renderStatusTag = this._renderStatusTag.bind(this);
		this._renderCheckBox = this._renderCheckBox.bind(this);
	}
	_handleChangeStatus() {
		const { isOnline, } = this.state;
		const { onChangeStatus } = this.props;
		const newIsOnlne = !isOnline;

		onChangeStatus(newIsOnlne);
		this.setState({ isOnline: newIsOnlne, });
	}

	_renderSlotBall() {
		const { play, } = this.props;

		return (
			<CodeBall.Rectangle
				text={play.name}
				fontSize={CodeBall.Rectangle.FontSizeEnum.SMALL}
			/>
		);
	}

	_renderStatusTag() {
		const { isOnline, } = this.state;
		const status = isOnline ? SUCCESS : ERROR;
		const text = isOnline ? "开启" : "关闭";

		return <StatusTag status={status} text={text}/>;
	}

	_renderCheckBox() {
		const { _handleChangeStatus } = this;
		const { isOnline, } = this.state;

		return (
			<CheckBox
				value={isOnline}
				onChange={_handleChangeStatus}
			>
				上线
			</CheckBox>
		);
	}

	render() {
		const { isEditing, } = this.props;
		const { _renderSlotBall, _renderStatusTag, _renderCheckBox, } = this;

		return (
			<div className={`${PREFIX_CLASS}__slot`}>
				<div>{_renderSlotBall()}</div>
				<div>状态</div>
				{isEditing ? _renderCheckBox() : _renderStatusTag()}
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		const { play, } = this.props;

		if (prevProps.play.status !== play.status) {
			this.setState({
				isOnline: play ? play.status === 'online' : false,
			});
		}
	}
}

XinYongPlayStatusSlot.propTypes = propTypes;
XinYongPlayStatusSlot.defaultProps = defaultProps;

export default XinYongPlayStatusSlot;
