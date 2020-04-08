import React, { Fragment, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	Icon,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { isDateValid, formatDate, } from '../../../lib/moment-utils';
import DataInlineList from '../../components/data-inline-list';
import { announcementActions, } from '../../controller';
import { connectObservable } from 'ljit-observable/react-observable';
import { EventEnum, } from '../../lib/enums';
import { RouteKeyEnums } from '../../route-modals/member-center/routes';
import './style.styl';

const {
	fetchAnnouncementsAction,
	setSelectedAnnouncementIdAction,
} = announcementActions;

const {
	IconTypeEnums,
	ColorEnums,
	SizeEnums,
} = Icon;
const PREFIX_CLASS = 'announcement-list';

const propTypes = {
	// TODO update prop types with schema
	announcesData: PropTypes.arrayOf(PropTypes.object),
	fetchAnnouncementsAction: PropTypes.func.isRequired,
	setSelectedAnnouncementIdAction: PropTypes.func.isRequired,
	notifyShowMemberCenter: PropTypes.func.isRequired,
};

const AnnouncementList = ({
	announcesData = [],
	fetchAnnouncementsAction = () => {},
	setSelectedAnnouncementIdAction = () => {},
	notifyShowMemberCenter = () => {},
}) => {

	useEffect(() => {
		fetchAnnouncementsAction();
	}, []);

	return (
		<DataInlineList
			className={PREFIX_CLASS}
			data={announcesData}
			onClickItem={(item) => {
				setSelectedAnnouncementIdAction(item.id);
				notifyShowMemberCenter(RouteKeyEnums.ANNOUNCEMENT);
			}}
			renderItem={(data = {}) => (
				<ListItem
					title={<span title={data.title}>{data.title}</span>}
					description={(
						<Fragment>
							<Icon
								className={`${PREFIX_CLASS}__icon`}
								type={IconTypeEnums.TIMER}
								color={ColorEnums.GREY}
								size={SizeEnums.X_SMALL}
							/>
							{isDateValid(data.createdAt) ? formatDate(data.createdAt) : ''}
						</Fragment>
					)}
				/>
			)}
		/>
	);
};

AnnouncementList.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		announcesData: state.announcements.get('data').toArray(),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchAnnouncementsAction: () => dispatch(fetchAnnouncementsAction()),
		setSelectedAnnouncementIdAction: (...args) => dispatch(setSelectedAnnouncementIdAction(...args))
	};
}

function mapNotifyToProps(notify) {
	return {
		notifyShowMemberCenter: (data) => notify(EventEnum.SHOW_MEMBER_CENTER, data),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)((connectObservable(mapNotifyToProps)(AnnouncementList)));
