import React, { forwardRef, } from 'react';
import { CascaderSelect, } from 'ljit-react-components';
import './style.styl';

const ClientCascaderSelect = forwardRef((props, ref) => (
	<CascaderSelect
		ref={ref}
		{...props}
		className="ljit-client-cascader-select"
		popupClassName="ljit-client-cascader-select__pop-up"
	/>
));

ClientCascaderSelect.displayName = 'ClientCascaderSelect';

export default ClientCascaderSelect;
