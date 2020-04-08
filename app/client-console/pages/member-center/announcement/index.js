import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AnnouncementContent from './content';
import AnnouncementList from './data-list';
import { connect, } from 'ljit-store-connecter';
import { announcementActions, } from '../../../controller';
import { LoadingStatusEnum } from '../../../lib/enums';
import './style.styl';

const { NONE, } = LoadingStatusEnum;
const {
	fetchAnnouncementsAction,
	setSelectedAnnouncementIdAction,
} = announcementActions;

const PREFIX_CLASS = 'announcement-page';

const propTypes = {
	announcementsData: PropTypes.arrayOf(PropTypes.object),
	selectedId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	setSelectedAnnouncementIdAction: PropTypes.func.isRequired,
	fetchAnnouncementsAction:  PropTypes.func.isRequired,
	loadingStatus: PropTypes.number.isRequired,
};

class AnnouncementPage extends Component {
	constructor() {
		super();

		this._handleClickItem = this._handleClickItem.bind(this);
	}
	_handleClickItem(rowData) {
		const {
			setSelectedAnnouncementIdAction,
		} = this.props;

		setSelectedAnnouncementIdAction(rowData.id);
	}
	render() {
		const {
			selectedId,
			announcementsData,
		} = this.props;

		let selectedItem = getNextAnnouncement(announcementsData, selectedId);

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__list-bar`}>
					<AnnouncementList
						selectId={selectedItem.id}
						announcementData={announcementsData}
						onClickItem={this._handleClickItem}
					/>
				</div>
				<div  className={`${PREFIX_CLASS}__content`}>
					<AnnouncementContent
						title={selectedItem.title}
						createdAt={selectedItem.createdAt}
						content={selectedItem.content}
					/>
				</div>
			</div>
		);
	}
	componentDidMount() {
		const {
			loadingStatus,
			fetchAnnouncementsAction,
		} = this.props;

		if (loadingStatus === NONE) {
			fetchAnnouncementsAction();
		}
	}
}

AnnouncementPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		announcementsData: state.announcements.get('data').toArray(),
		selectedId: state.announcements.get('selectedAnnouncementId'),
		loadingStatus: state.announcements.get('loadingStatus'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchAnnouncementsAction: () => dispatch(fetchAnnouncementsAction()),
		setSelectedAnnouncementIdAction: (...args) => dispatch(setSelectedAnnouncementIdAction(...args))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage);

function getNextAnnouncement(announcementsData, selectedId) {
	let nextAnnouncementData = announcementsData ? announcementsData.slice() : [];

	if (selectedId) {
		nextAnnouncementData = nextAnnouncementData.filter(announcement => announcement.id === selectedId);
	}

	return nextAnnouncementData.length > 0 ? nextAnnouncementData[0] : {};
}
