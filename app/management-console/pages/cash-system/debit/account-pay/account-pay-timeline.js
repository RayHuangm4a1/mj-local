import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	ScrollContainer,
	Timeline,
	Row,
	Col,
} from 'ljit-react-components';

const propTypes = {
	timelineDatas: PropTypes.array,
	onClick: PropTypes.func,
};
const defaultProps = {
	onClick: () => {},
};

const PREFIX_CLASS = 'account-pay-timeline';

class AccountPayTimeline extends Component {
	constructor() {
		super();

		this.state = {
			isButtonDisabled: false,
		};

		this._renderTimelineItems = this._renderTimelineItems.bind(this);
	}

	_renderTimelineItems() {
		const { timelineDatas, } = this.props;

		return timelineDatas.map(data => {
			const { dataIndex, timeLineTitle, timeLineContent, } = data;
			const timeLineContentDivs = timeLineContent.map((content, index) => {

				return (
					<div
						key={`${dataIndex}-${index}`}
						className="ljit-time-line-item__item-content"
					>{content}</div>
				);
			});

			return (
				<Timeline.Item key={dataIndex}>
					<Row type='flex'>
						<Col>
							{timeLineTitle}
						</Col>
						<Col style={{ marginLeft : '5px', }}>
							{timeLineContentDivs}
						</Col>
					</Row>
				</Timeline.Item>
			);
		});
	}

	render() {
		const { isButtonDisabled, } = this.state;
		const { onClick, } = this.props;
		const { _renderTimelineItems, } = this;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__title account-pay-modal__title`}>系统备注</div>
				<ScrollContainer
					isButtonDisabled={isButtonDisabled}
					onClick={() => onClick()}
				>
					<Timeline mode={Timeline.ModeEnums.LEFT}>
						{_renderTimelineItems()}
					</Timeline>
				</ScrollContainer>
			</div>
		);
	}
}

AccountPayTimeline.propTypes = propTypes;
AccountPayTimeline.defaultProps = defaultProps;

export default AccountPayTimeline;
