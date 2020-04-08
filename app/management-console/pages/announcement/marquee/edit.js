import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import MarqueeForm from './form';
import { RouteKeyEnums, } from '../../../routes';

const { ANNOUNCEMENT_MARQUEE, } = RouteKeyEnums;

const propTypes = {
	onBack: PropTypes.func,
	onNavigate: PropTypes.func,
	title: PropTypes.string,
	startAt: PropTypes.object,
	endAt: PropTypes.object,
	content: PropTypes.string,
	levels: PropTypes.array,
};

const defaultProps = {
	onBack: () => {},
	onNavigate: () => {},
};

class MarqueeEditPage extends Component {
	constructor() {
		super();

		this._handleSubmitEdit = this._handleSubmitEdit.bind(this);
	}

	_handleSubmitEdit(values, form) {
		// TODO send edit api
	}

	render() {
		const {
			onBack,
			title,
			startAt,
			endAt,
			content,
			levels,
		} = this.props;
		const { _handleSubmitEdit } = this;
		const initialValues = {
			title,
			startAt,
			endAt,
			content,
			levels
		};

		return (
			<Fragment>
				<div style={{ marginBottom: 24 }}>
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						onClick={() => onBack()}
					>
						返回上一层
					</Button>
				</div>
				<PageBlock className="announcement-marquee__form">
					<MarqueeForm
						submitText="保存设置"
						onSubmit={_handleSubmitEdit}
						onBack={onBack}
						initialValues={initialValues}
					/>
				</PageBlock>
			</Fragment>
		);
	}

	componentDidMount() {
		const {
			onNavigate, title, startAt, endAt, content, levels,
		} = this.props;

		if (!title || !startAt || !endAt || !content || !levels) {
			onNavigate(`${ANNOUNCEMENT_MARQUEE}`);
		}
	}
}

MarqueeEditPage.propTypes = propTypes;
MarqueeEditPage.defaultProps = defaultProps;

export default MarqueeEditPage;
