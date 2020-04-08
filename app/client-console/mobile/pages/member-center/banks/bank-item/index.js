import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, LabelText, InfoCard, } from 'ljit-react-components';
import { formatDate } from '../../../../../../lib/moment-utils';
import './style.styl';

const PREFIX_CLASS = 'bank-item';

const propTypes = {
	// TODO use correct data schema
	cardData: PropTypes.shape({
		bank: PropTypes.string,
		holder: PropTypes.string,
		account: PropTypes.string,
		createdAt: PropTypes.string,
		bindConut: PropTypes.number,
	}),
	onClickDelete: PropTypes.func,
};
const defaultProps = {
	cardData: [],
	onClickDelete: () => {},
};

function BankItem({
	cardData,
	onClickDelete,
}) {
	const {
		bank,
		holder,
		account,
		createdAt,
		bindConut,
	} = cardData;

	return (
		<div className={PREFIX_CLASS}>
			<Icon type={Icon.IconTypeEnums.SETTING_BANK} size={Icon.SizeEnums.X_LARGE}/>
			<InfoCard
				topLeft={<LabelText
					label={bank}
					text={`尾號 ${account.slice(-4)}`}
				/>}
				left={<LabelText
					label="持卡人："
					text={holder}
				/>}
				right={<LabelText
					label="已綁定："
					text={`${bindConut}次`}
				/>}
				bottom={<LabelText
					label="綁定時間："
					text={formatDate(createdAt)}
				/>}
			/>
			<Button
				onClick={() => onClickDelete(cardData)}
				color={Button.ColorEnums.ORANGE}
				outline={Button.OutlineEnums.HOLLOW}
			>
				删除
			</Button>
		</div>
	);
}

BankItem.propTypes = propTypes;
BankItem.defaultProps = defaultProps;

export default BankItem;
