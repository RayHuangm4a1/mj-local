import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Input,
	Form,
	FormItem,
} from 'ljit-react-components';
import MobileBottomDrawerRounded from '../rounded';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-mobile-confirm-betting-drawer';

const propTypes = {
	isVisible: PropTypes.bool,
	className: PropTypes.string,
	height: PropTypes.number,
	children: PropTypes.node,
	onClose: PropTypes.func,
	onClickBet: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	className: '',
	height: 365,
	onClose: () => {},
	onClickBet: () => {},
};

function MobileConfirmBettingDrawer({
	isVisible,
	className,
	height,
	children,
	onClose,
	onClickBet,
}) {
	const formInstance = useRef(null);

	const _handleSubmit = (event) => {
		event.preventDefault();
		const form = formInstance.current.getForm();

		form.validateFields((err, { password, }) => {
			if (!err) {

				onClickBet(password);
				form.resetFields();
			}
		});
	};
	const _handleClose = () => {
		const form = formInstance.current.getForm();

		form.resetFields();
		onClose();
	};

	return (
		<MobileBottomDrawerRounded
			title="确认投注"
			className={cx(PREFIX_CLASS, className)}
			onClose={_handleClose}
			isVisible={isVisible}
			height={height}
		>
			<div className={`${PREFIX_CLASS}__content`}>
				{children}
			</div>
			<Form
				ref={formInstance}
				cancelButtonDisabled
				submitButtonDisabled
			>
				<FormItem
					className={`${PREFIX_CLASS}__verify-password`}
					label="输入投注密码"
					labelColon={false}
					itemName="password"
					itemConfig={{
						initialValue: null,
						rules: [{ required: true, },],
					}}
				>
					<Input
						type="password"
						placeholder="请输入资金密码"
					/>
				</FormItem>
			</Form>
			<Button
				onClick={_handleSubmit}
				color={Button.ColorEnums.ORANGE}
			>
				投注
			</Button>
		</MobileBottomDrawerRounded>
	);
}

MobileConfirmBettingDrawer.propTypes = propTypes;
MobileConfirmBettingDrawer.defaultProps = defaultProps;

export default MobileConfirmBettingDrawer;
