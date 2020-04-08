import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import XinYongBettingCard from '../../xin-yong-betting-card';
import './style.styl';

function withXinYongBettingGroup(playSubconditionIdRows = []) {
	class XinYongBettingGroup extends Component {
		constructor(props) {
			super(props);
			this._renderXinYongBettingCards = this._renderXinYongBettingCards.bind(this);
			this._handleChangeAmount = this._handleChangeAmount.bind(this);
		}
		_handleChangeAmount(playSubcondition, play, amount) {
			const {
				lotteryClass,
				lottery,
				onChange,
			} = this.props;

			onChange(lotteryClass, lottery, playSubcondition, play, amount);
		}
		_renderXinYongBettingCards() {
			const {
				_handleChangeAmount,
			} = this;
			const {
				lotteryClass,
				lottery,
				playSubconditionsMap,
				playsMap,
				bettingsMap,
				isDisabled,
				disabledText,
				defaultAmount,
			} = this.props;

			return playSubconditionIdRows.map(function (playSubconditionIdRow, index) {
				const XinYongBettingCardComponents = playSubconditionIdRow.map(function (playSubconditionId) {
					const playSubcondition = playSubconditionsMap[playSubconditionId] || {};
					const XinYongBettingCardComponent = XinYongBettingCard.get(lotteryClass.id, lottery.id, playSubconditionId);

					return (
						<XinYongBettingCardComponent
							key={playSubconditionId}
							playSubcondition={playSubcondition}
							playsMap={playsMap}
							bettingsMap={bettingsMap}
							isDisabled={isDisabled}
							disabledText={disabledText}
							defaultAmount={defaultAmount}
							onChange={_handleChangeAmount}
						/>
					);
				});

				return (
					<div key={'playSubconditionIdRow' + index} className='ljit-xin-yong-betting-group-row'>
						{XinYongBettingCardComponents}
					</div>
				);
			});
		}
		render() {
			return (
				<div className={cx('ljit-xin-yong-betting-group')}>
					{this._renderXinYongBettingCards()}
				</div>
			);
		}
	}

	XinYongBettingGroup.propTypes = {
		lotteryClass: PropTypes.shape({
			id: PropTypes.number,
		}).isRequired,
		lottery: PropTypes.shape({
			id: PropTypes.number,
		}).isRequired,
		playSubconditionsMap: PropTypes.objectOf(
			PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
			})
		),
		playsMap: PropTypes.objectOf(
			PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				odds: PropTypes.number,
				status: PropTypes.string,
			})
		),
		bettingsMap: PropTypes.objectOf(
			PropTypes.shape({
				play: PropTypes.shape({
					id: PropTypes.number,
					name: PropTypes.string,
					odds: PropTypes.number,
				}),
				amount: PropTypes.number,
			}),
		),
		isDisabled: PropTypes.bool,
		disabledText: PropTypes.string,
		defaultAmount: PropTypes.number,
		onChange: PropTypes.func,
	};

	XinYongBettingGroup.defaultProps = {
		playSubconditionsMap: {},
		playsMap: {},
		bettingsMap: {},
		isDisabled: false,
		disabledText: '',
		defaultAmount: 0,
		onChange: () => {}, // (lotteryClass, lottery, play, amount) => {}
	};

	return XinYongBettingGroup;
}

export default withXinYongBettingGroup;
