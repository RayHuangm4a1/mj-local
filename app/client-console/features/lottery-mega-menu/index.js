import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, ClickableTag, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import './style.styl';


const propTypes = {
	lotteryClassesData: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string,
		name: PropTypes.string,
		id: PropTypes.number,
	})).isRequired,
	lotteriesData: PropTypes.object.isRequired,
	children: PropTypes.any.isRequired,
	onNavigate: PropTypes.func,
};

const defaultProps = {
	onNavigate: () => {},
};

class LotteryMegaMenu extends Component {
	constructor() {
		super();

		this._renderLotteries = this._renderLotteries.bind(this);
		this._renderDropdownContent = this._renderDropdownContent.bind(this);
	}
	_renderLotteries(mappedLotteries, lotteryClassId) {
		const { onNavigate, } = this.props;

		if (!mappedLotteries) {
			return;
		}

		return mappedLotteries.map((lottery = {}) => {
			return (
				<ClickableTag
					key={lottery.id}
					text={lottery.name}
					color={ClickableTag.ColorEnums.WHITE}
					onClick={() => onNavigate(`/lottery/${lotteryClassId}/${lottery.id}/standard`)}
				/>
			);
		});
	}
	_renderDropdownContent() {
		const { lotteryClassesData, lotteriesData, } = this.props;
		const { _renderLotteries, } = this;

		if (!lotteryClassesData) {
			return;
		}

		const cards =  lotteryClassesData.map(lotteryClass => {
			const { id, name, code } = lotteryClass;

			return (
				<div
					key={id}
					className="lottery-mega-menu__list"
				>
					<div className="lottery-mega-menu__list-title">
						<Icon type={Icon.IconTypeEnums.CROWN_COLOR} size={Icon.SizeEnums.X_LARGE} style={{ marginRight: '4px' }}/>
						<span>{name}</span>
					</div>
					<div className="lottery-mega-menu__list-content">
						{_renderLotteries(lotteriesData[id], id)}
					</div>
				</div>
			);
		});

		return (
			<div className="lottery-mega-menu">
				{cards}
			</div>
		);
	}

	render() {
		const { children, } = this.props;
		const { _renderDropdownContent, } = this;

		return (
			<Dropdown
				dropdownContent={_renderDropdownContent()}
				placement={Dropdown.PlacementEnums.BOTTOM_CENTER}
			>
				{children}
			</Dropdown>
		);
	}
}

LotteryMegaMenu.propTypes = propTypes;
LotteryMegaMenu.defaultProps = defaultProps;

function mapStateToProps(state) {

	return {
		lotteryClassesData: state.lotteryClasses.get('data').toArray(),
		lotteriesData: state.lotteries.get('lotteriesData').toObject()
	};
}

export default connect(mapStateToProps)(LotteryMegaMenu);
