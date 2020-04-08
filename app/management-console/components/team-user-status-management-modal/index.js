import React from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import PageModal from '../page-modal';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	title: PropTypes.string,
	isVisible: PropTypes.bool,
	onClickCancel: PropTypes.func,
	// TODO update data schema after api is ok
	userData: PropTypes.shape({
		statusText: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]).isRequired,
		operation: PropTypes.node.isRequired,
	}),
	// TODO update data schema after api is ok
	teamData: PropTypes.shape({
		statusText: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]).isRequired,
		operation: PropTypes.node.isRequired,
	}),
	className: PropTypes.string,
	isShowUserTable: PropTypes.bool,
	isShowTeamTable: PropTypes.bool,
};
const defaultProps = {
	title: '',
	isVisible: false,
	onClickCancel: () => {},
	className: '',
	isShowUserTable: true,
	isShowTeamTable: true,
};

const TeamUserStatusManagementModal = ({
	title,
	isVisible,
	onClickCancel,
	userData,
	teamData,
	isShowUserTable,
	isShowTeamTable,
	className,
}) => {
	const _renderUserTable = () => {
		return (
			<Table
				columns={[
					{
						title: '个人状态',
						dataIndex: 'statusText',
						width: 100,
						render: () => userData.statusText
					},{
						title: '操作',
						width: 100,
						render: () => userData.operation
					}
				]}
				dataSource={[{ ...userData, id: 0, }]}
				rowKey="id"
			/>
		);
	};
	const _renderTeamTable = () => {
		return (
			<Table
				columns={[
					{
						title: '团队状态',
						dataIndex: 'statusText',
						width: 100,
						render: () => teamData.statusText
					},{
						title: '操作',
						width: 100,
						render: () => teamData.operation
					}
				]}
				dataSource={[{ ...teamData, id: 0, }]}
				rowKey="id"
			/>
		);
	};

	return (
		<PageModal
			title={title}
			visible={isVisible}
			onClickCancel={onClickCancel}
			cancelText="关闭"
			className={cx("team-user-status-management-modal", className)}
		>
			{isShowUserTable? _renderUserTable() : null}
			{isShowTeamTable? _renderTeamTable() : null}
		</PageModal>
	);
};

TeamUserStatusManagementModal.propTypes = propTypes;
TeamUserStatusManagementModal.defaultProps = defaultProps;

export default TeamUserStatusManagementModal;
