import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Icon,
	BankCard,
} from 'ljit-react-components';

const propTypes = {
	bankCards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			bankName: PropTypes.string,
			number: PropTypes.string,
			payer: PropTypes.string,
			activatedAt: PropTypes.string,
			withdrawableAt: PropTypes.string,
		})
	),
	onClickAddCard: PropTypes.func,
	onClickUnbindCard: PropTypes.func,
};

const defaultProps = {
	bankCards: [],
	onClickAddCard: () => {},
	onClickUnbindCard: () => {},
};

const PREFIX_CLASS = 'ljit-member-bank-info';

class BankCards extends Component {
	constructor() {
		super();
	}

	render() {
		const { bankCards, onClickAddCard, onClickUnbindCard, } = this.props;

		return (
			<div className={`${PREFIX_CLASS}__container`}>
				<div className={`${PREFIX_CLASS}__bank-cards-grid`}>
					<div
						className={`${PREFIX_CLASS}__add-bank-card`}
						onClick={onClickAddCard}
					>
						<div className={`${PREFIX_CLASS}__add-bank-card-content`}>
							<div className={`${PREFIX_CLASS}__icon-wrapper`}>
								<Icon
									type={Icon.IconTypeEnums.PLUS_CIRCLE}
									size={Icon.SizeEnums.LARGE}
									color={Icon.ColorEnums.ORANGE}
								/>
							</div>
							<div>
								<span>新增银行卡</span>
							</div>
						</div>
					</div>
					{
						bankCards.map((bankCard) => {
							const {
								id,
								bankName,
								number,
								payer,
								activatedAt,
								withdrawableAt,
							} = bankCard;

							return (
								<div key={id} >
									<BankCard
										isUnbindButtonVisible
										dataSource={{
											bankName,
											payer,
											number: number.slice(-4),
											activatedAt,
											withdrawableAt,
										}}
										onClickUnbind={() => onClickUnbindCard(id)}
									/>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
}

BankCards.propTypes = propTypes;
BankCards.defaultProps = defaultProps;

export default BankCards;
