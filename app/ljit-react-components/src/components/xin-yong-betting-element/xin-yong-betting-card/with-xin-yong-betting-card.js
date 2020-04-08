import React from 'react';
import XinYongBettingCard from '../../xin-yong-betting-card';

function withXinYongBettingCard({
	orientation = XinYongBettingCard.OrientationEnums.VERTICAL,
	columnCount = 4,
} = {}, playTemplates = []) {
	return function wrappedXinYongBettingCard(props) {
		return (
			<XinYongBettingCard
				orientation={orientation}
				playTemplates={playTemplates}
				columnCount={columnCount}
				{...props}
			/>
		);
	};
}

export default withXinYongBettingCard;
