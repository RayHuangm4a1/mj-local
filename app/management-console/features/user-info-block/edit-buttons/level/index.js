import React, { Fragment, useState, useRef, useEffect, } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import {
	Form,
	FormItem,
	Select,
	LabelContent,
	RadioGroup,
	DatePicker,
	TextButton,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import PageModal from '../../../../components/page-modal';
import { FinanceLevelTypeEnum } from '../../../../lib/enums';
import {
	convertDateStringToTimestamp,
	isDateValid,
} from '../../../../../lib/moment-utils';
import {
	FinanceLevelNamesMapDataPropTypes,
	FinanceLevelOptionsDataPropTypes
} from '../../../../lib/prop-types-utils';
import {
	userFinanceLevelActions,
	notifyHandlingActions,
} from '../../../../controller';
import { notifications, } from '../../../../../lib/notify-handler';
import { usePrevious } from '../../../../lib/react-utils';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import {
	filterNormalFinanceLevels,
	filterSpecialFinanceLevels,
} from '../../../../pages/cash-system/hierarchical/utils';
import './style.styl';

const {
	LOADING,
	SUCCESS,
} = LoadingStatusEnum;

const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const {
	NORMAL,
	SPECIAL,
} = FinanceLevelTypeEnum;

const { notifyHandlingAction, } = notifyHandlingActions;
const { updateUserFinanceLevelAction, } = userFinanceLevelActions;

const propTypes = {
	updateUserFinanceLevelAction: PropTypes.func.isRequired,
	buttonText: PropTypes.string,
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	isDisabled: PropTypes.bool,
	onSubmitForm: PropTypes.func,
	financeLevelNamesMap: FinanceLevelNamesMapDataPropTypes,
	levelId: PropTypes.number,
	levelType: PropTypes.number,
	userId: PropTypes.number,
	updateLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	notifyHandlingAction: PropTypes.func.isRequired,
	levelExpiredAt: PropTypes.string,
	specialOptions: FinanceLevelOptionsDataPropTypes,
	normalOptions: FinanceLevelOptionsDataPropTypes,
};

const defaultProps = {
	level: {},
	buttonText: '修改',
	okText: '确 定',
	cancelText: '取 消',
	isDisabled: false,
	onSubmitForm: () => {},
	financeLevelNamesMap: {},
	specialOptions: [],
	normalOptions: [],
};

const PREFIX_CLASS = 'user-detail-level-edit';

function LevelEditButton({
	buttonText,
	okText,
	cancelText,
	isDisabled,
	updateUserFinanceLevelAction,
	financeLevelNamesMap,
	levelId,
	levelType,
	userId,
	updateLoadingStatus,
	notifyHandlingAction,
	levelExpiredAt,
	specialOptions,
	normalOptions,
}) {
	const prevUpdateLoadingStatus = usePrevious(updateLoadingStatus);
	const [currentLevelType, setCurrentLevelType] = useState(levelType || NORMAL);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const formInstance = useRef(null);

	useEffect(() => {
		if (prevUpdateLoadingStatus === LOADING && updateLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('层级设定修改成功'));
		}
	}, [updateLoadingStatus]);

	function _handleClickCancel() {
		const form = formInstance.current.getForm();

		setIsEditModalVisible(false);
		form.resetFields();
	}
	function _handleUpdateLevel() {
		const form = formInstance.current.getForm();

		form.validateFields((error, { levelId, levelExpiredAt }) => {
			if (!error) {
				const data = { levelId };

				if (isDateValid(levelExpiredAt)) {
					data.levelExpiredAt = convertDateStringToTimestamp(levelExpiredAt);
				}
				updateUserFinanceLevelAction(userId, data);
				_handleClickCancel();
			}
		});
	}
	function _handleChangeLevelType(e) {
		setCurrentLevelType(e.target.value);
		const form = formInstance.current.getForm();

		form.resetFields(['levelId']);
	}
	function _renderLevelAndDueDateFormItems() {
		if (currentLevelType === SPECIAL) {
			return (
				<FormItem
					label="新的层级"
					itemName="levelId"
					className={`${PREFIX_CLASS}__form-item`}
					itemConfig={{
						initialValue: getDefaultValue(specialOptions, levelId),
						rules: [
							{
								required: true,
								message: '新的层级不能为空',
							},
						],
					}}
				>
					<Select
						className={`${PREFIX_CLASS}__select`}
						options={specialOptions}
					/>
				</FormItem>
			);
		} else {
			return (
				<Fragment>
					<FormItem
						label="新的层级"
						itemName="levelId"
						className={`${PREFIX_CLASS}__form-item`}
						itemConfig={{
							initialValue: getDefaultValue(normalOptions, levelId),
							rules: [
								{
									required: true,
									message: '新的层级不能为空',
								},
							],
						}}
					>
						<Select
							className={`${PREFIX_CLASS}__select`}
							options={normalOptions}
						/>
					</FormItem>
					<FormItem
						label="锁定到期日"
						itemName="levelExpiredAt"
						className={cx(`${PREFIX_CLASS}__form-item`, 'date-picker')}
						itemConfig={{
							initialValue: moment(levelExpiredAt),
							rules: [
								{
									type: 'object',
									required: true,
									message: '锁定到期日不能为空',
								}
							],
						}}
					>
						<DatePicker
							placeholder="请输入到期日"
							format="YYYY/MM/DD hh:mm"
						/>
					</FormItem>
				</Fragment>
			);
		}

	}
	function _renderFormBody() {
		return (
			<Fragment>
				<LabelContent
					label="目前层级"
					className={`${PREFIX_CLASS}__form-label`}
				>
					{financeLevelNamesMap[levelId]}
				</LabelContent>
				<FormItem
					label="层级类型"
					itemName="levelType"
					className={`${PREFIX_CLASS}__form-item`}
					itemConfig={{
						initialValue: currentLevelType,
						rules: [
							{
								required: true,
								message: '层级类型不能为空',
							},
						],
					}}
				>
					<RadioGroup
						options={[
							{ label: '一般层', value: NORMAL, },
							{ label: '特殊层', value: SPECIAL, },
						]}
						onChange={_handleChangeLevelType}
					/>
				</FormItem>
				{_renderLevelAndDueDateFormItems()}
			</Fragment>
		);
	}

	return (
		<div>
			<TextButton
				text={buttonText}
				onClick={() => setIsEditModalVisible(true)}
				disabled={isDisabled}
			/>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<PageModal
					title="层级修改"
					visible={isEditModalVisible}
					okText={okText}
					cancelText={cancelText}
					onClickOk={_handleUpdateLevel}
					onClickCancel={_handleClickCancel}
					modalSize={PageModal.ModalSizeEnum.NORMAL}
					className="edit-element-modal"
				>
					{_renderFormBody()}
				</PageModal>
			</Form>
		</div>
	);
}

LevelEditButton.propTypes = propTypes;
LevelEditButton.defaultProps = defaultProps;

function mapStateToProps(state) {
	const profile = state.userData.profile.get('data').toObject();
	const financeLevelOptions = state.financeLevels.get('financeLevelOptions').toArray();

	return {
		financeLevelNamesMap: state.financeLevels.get('financeLevelNamesMap').toObject(),
		userId: profile.id,
		levelId: profile.levelId,
		levelType: profile.type,
		levelExpiredAt:  profile.levelExpiredAt,
		updateLoadingStatus: state.userData.financeLevel.get('updateLoadingStatus'),
		specialOptions: filterSpecialFinanceLevels(financeLevelOptions),
		normalOptions: filterNormalFinanceLevels(financeLevelOptions),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserFinanceLevelAction: (userId, { levelId, levelExpiredAt, } = {}) => dispatch(updateUserFinanceLevelAction(userId, { levelId, levelExpiredAt, })),
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelEditButton);

function getDefaultValue(options = [{ value }], value) {
	const hasValue = options.filter(option => option.value === value)[0];

	if (hasValue) {
		return value;
	} else {
		const defaultValue = options[0] ? options[0].value : null;

		return defaultValue;
	}
}
