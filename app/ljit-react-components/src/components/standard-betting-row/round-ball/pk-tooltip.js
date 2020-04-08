import React from 'react';
import Tooltip from '../../tooltip';

function PKTooltip() {
	return (
		<Tooltip
			title={
				<div>
					<p>单挑说明：标示为单挑选项的玩法，将受到平台规范中单期单挑最高盈利的限制，单挑限额请参照奖金详情。</p>
				</div>
			}
			placement={Tooltip.PlacementEnums.BOTTOM}
			overlayColor={Tooltip.ColorEnums.WHITE}
		>
			<span>單挑說明</span>
		</Tooltip>
	);
}

export default PKTooltip;
