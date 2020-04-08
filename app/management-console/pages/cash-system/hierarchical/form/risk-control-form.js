import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	RadioGroup,
} from 'ljit-react-components';

const { ColumnTypeEnums, } = FormItem;

const propTypes = {
	// TODO update rule prop type
	initialRuleValue: PropTypes.number,
};

const RiskControlForm = ({
	initialRuleValue,
}) => {
	const formInstance = useRef(null);

	return (
		<Form
			ref={formInstance}
			submitButtonDisabled
			cancelButtonDisabled
		>
			<FormItem
				label="规则"
				itemName="rule"
				itemConfig={{
					initialValue: initialRuleValue,
				}}
				columnType={ColumnTypeEnums.SMALL}
			>
				<RadioGroup
					options={[
						// TODO update real value
						{ label: '银行ID与帐号ID不符', value: 1, },
					]}
				/>
			</FormItem>
		</Form>
	);
};

RiskControlForm.propTypes = propTypes;

export default RiskControlForm;
