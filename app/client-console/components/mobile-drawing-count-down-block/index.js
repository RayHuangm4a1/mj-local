import React from 'react';
import PropTypes from 'prop-types';
import { Toggle, Countdown, Button, Icon } from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'mobile-drawing-count-down-block';

const propTypes = {
	onTimeout: PropTypes.func,
	onClickTrend: PropTypes.func,
	onClickToggleStandard: PropTypes.func,
	onClickToggleXinyong: PropTypes.func,
	endDate: PropTypes.instanceOf(Date),
	isStandard: PropTypes.bool,
};

const defaultProps = {
	onTimeout: () => {},
	onClickTrend: () => {},
	onClickToggleStandard: () => {},
	onClickToggleXinyong: () => {},
	endDate: new Date,
	isStandard: true,
};

function MobileDrawingCountDownBlock({
	onTimeout,
	onClickTrend,
	onClickToggleStandard,
	onClickToggleXinyong,
	endDate,
	isStandard,
}) {
	return (
		<div className={PREFIX_CLASS}>
			<div>
				<p>截止时间</p>
				<Countdown
					onFinish={onTimeout}
					endDate={endDate}
				/>
			</div>
			<div>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={onClickTrend}
				>
					<Icon
						type={Icon.IconTypeEnums.TREND}
						size={Icon.SizeEnums.LARGE}
					/>
						走势图
				</Button>
				{/* TODO change size and color when pr 1056 has been merged or change design*/}
				<Toggle
					left={'官方'}
					right={'信用'}
					onClickLeft={onClickToggleStandard}
					onClickRight={onClickToggleXinyong}
					isLeftActive={isStandard}
				/>
			</div>
		</div>
	);
}

MobileDrawingCountDownBlock.propTypes = propTypes;
MobileDrawingCountDownBlock.defaultProps = defaultProps;

export default MobileDrawingCountDownBlock;
