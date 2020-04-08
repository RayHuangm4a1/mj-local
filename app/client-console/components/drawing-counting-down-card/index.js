import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Statistic, Countdown, Loading } from 'ljit-react-components';
import cx from 'classnames';
import './style.styl';
export const prefixClass = 'ljit-drawing-counting-down-card';

const TypeEnums = {
	DEFAULT: 'default',
	UNDER_MAINTENANCE: 'under-maintenance',
	LOADING: 'loading',
};

const ColorEnums = {
	ORANGE: 'orange',
	BLUE: 'blue',
	GRAY: 'gray',
};

const OrientationEnums = {
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal',
};

const propTypes = {
	title: PropTypes.string,
	closedAt: PropTypes.instanceOf(Date),
	onFinish: PropTypes.func,
	type: PropTypes.oneOf(Object.values(TypeEnums).concat('')),
	color: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	orientation: PropTypes.oneOf(Object.values(OrientationEnums).concat('')),
	format: PropTypes.oneOf(Object.values(Countdown.FormatEnums).concat('')),
	className: PropTypes.string,
	offset: PropTypes.number,
	timeOutText: PropTypes.string,
};

const defaultProps = {
	title: '',
	closedAt: new Date(),
	onFinish: () => {},
	type: TypeEnums.UNDER_MAINTENANCE,
	color: ColorEnums.GRAY,
	orientation: OrientationEnums.VERTICAL,
	className: '',
	offset: 0,
	timeOutText: '已封盤',
	format: Countdown.FormatEnums.HH_MM_SS
};


class DrawingCountDownCard extends Component {
	constructor() {
		super();
		this._renderCountingDownCard = this._renderCountingDownCard.bind(this);
		this._renderHorizontalCountingDownCard = this._renderHorizontalCountingDownCard.bind(this);
		this._handleFinish = this._handleFinish.bind(this);
		this.state = {
			isTimeOut: false
		};
	}
	componentDidMount() {
		const { closedAt, offset } = this.props;
		const isTimeOut = (new Date()).getTime() > (closedAt.getTime() + offset);

		this.setState({
			isTimeOut: isTimeOut
		});
	}
	componentDidUpdate(prevProps) {
		if (this.props.closedAt.getTime() > prevProps.closedAt.getTime()) {
			this.setState({
				isTimeOut: false
			});
		}
	}
	_handleFinish() {
		this.setState({
			isTimeOut: true,
		});
		this.props.onFinish();
	}
	_renderCountingDownCard() {
		const {
			title,
			closedAt,
			type,
			timeOutText,
			offset,
			color,
			format,
		} = this.props;
		const { isTimeOut } = this.state;
		const { _handleFinish } = this;

		switch (type) {
			case TypeEnums.DEFAULT: {
				if (isTimeOut) {
					return (
						<Statistic
							title={title}
							value={timeOutText}
							className={color}
						/>
					);
				}
				return (
					<Statistic
						title={title}
						prefix={
							<Countdown
								endDate={closedAt}
								onFinish={_handleFinish}
								offset={offset}
								format={format}
							/>}
						value={' '}
					/>
				);
			}
			case TypeEnums.UNDER_MAINTENANCE: {
				return (
					<Statistic
						title={title}
						value=' - : - : - '
					/>
				);
			}
			case TypeEnums.LOADING: {
				return (
					<Statistic
						title={title}
						prefix={<Loading/>}
						value={' '}
					/>
				);
			}
			default: {
				return (
					<Statistic
						title={title}
						value=' - : - : - '
					/>
				);
			}
		}
	}

	_renderHorizontalCountingDownCard() {
		const {
			title,
			closedAt,
			type,
			timeOutText,
			offset,
			color,
			format,
		} = this.props;
		const { isTimeOut } = this.state;
		const { _handleFinish } = this;

		switch (type) {
			case TypeEnums.DEFAULT: {
				if (isTimeOut) {
					return (
						<Statistic
							prefix={title}
							suffix={timeOutText}
							className={color}
							value={' '}
						/>
					);
				}
				return (
					<Statistic
						prefix={title}
						suffix={
							<Countdown
								endDate={closedAt}
								onFinish={_handleFinish}
								offset={offset}
								format={format}
							/>}
						value={' '}
					/>
				);
			}

			case TypeEnums.UNDER_MAINTENANCE: {
				return (
					<Statistic
						prefix={title}
						suffix=' - : - : - '
						value={' '}
					/>
				);
			}
			case TypeEnums.LOADING: {
				return (
					<Statistic
						prefix={title}
						suffix={<Loading/>}
						value={' '}
					/>
				);
			}
			default: {
				return (
					<Statistic
						title={title}
						value=' - : - : - '
					/>
				);
			}
		}
	}

	render() {
		const { _renderCountingDownCard, _renderHorizontalCountingDownCard } = this;
		const { className, orientation } = this.props;

		return (
			<div className={cx(prefixClass, className)}>
				{ orientation === OrientationEnums.VERTICAL ? _renderCountingDownCard() : _renderHorizontalCountingDownCard() }
			</div>
		);
	}
}


DrawingCountDownCard.propTypes = propTypes;
DrawingCountDownCard.defaultProps = defaultProps;
DrawingCountDownCard.TypeEnums = TypeEnums;
DrawingCountDownCard.ColorEnums = ColorEnums;
DrawingCountDownCard.OrientationEnums = OrientationEnums;
DrawingCountDownCard.FormatEnums = Countdown.FormatEnums;

export default DrawingCountDownCard;
