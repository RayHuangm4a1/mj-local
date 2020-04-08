import React from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Button,
} from 'ljit-react-components';

const propTypes = {
	initialValues: PropTypes.shape({
		username: PropTypes.string,
	}),
	onSearch: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	onSearch: () => {},
};

function SearchForm({
	initialValues,
	onSearch,
}) {
	const formInstance = React.useRef(null);
	const _handleSubmit = (event) => {
		event.preventDefault();
		const form = formInstance.current.getForm();

		return form.validateFields((error, data) => {
			if (!error) {
				onSearch(data);
			}
		});
	};

	return (
		<Form
			ref={formInstance}
			submitButtonDisabled
			cancelButtonDisabled
		>
			<FormItem
				labelColon
				className="fund-search__item fund-search__item--inline"
				label="玩家帐号"
				itemName="username"
				itemConfig={{
					initialValue: initialValues.username,
					rules: [
						{
							required: true,
							message: '玩家帐号不能为空',
						},
					],
				}}
			>
				<Input placeholder="请输入帐号" />
			</FormItem>
			<Button
				className="fund-search__button"
				htmlType="submit"
				onClick={_handleSubmit}
			>
				查询
			</Button>
		</Form>
	);
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
