import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import EditForm from './forms/edit-form';

const propTypes = {
	onBack: PropTypes.func,
	onNavigate: PropTypes.func,
	title: PropTypes.string,
	startShowingTime: PropTypes.object,
	endShowingTime: PropTypes.object,
	content: PropTypes.string,
	levels: PropTypes.array,
	isEditing: PropTypes.bool,
};

const defaultProps = {
	onBack: () => {},
	onNavigate: () => {},
	isEditing: false,
};

class PopUpEditPage extends Component {
	constructor() {
		super();

		this._handleSubmitEdit = this._handleSubmitEdit.bind(this);
	}

	_handleSubmitEdit(values) {
		// TODO send edit api
	}

	render() {
		const {
			onBack,
			title,
			startShowingTime,
			endShowingTime,
			content,
			levels,
			isEditing,
		} = this.props;
		const { _handleSubmitEdit } = this;
		const initialValues = {
			title,
			startShowingTime,
			endShowingTime,
			content,
			levels
		};

		return (
			<React.Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					style={{ marginBottom: 28 }}
					onClick={onBack}
				>
					返回上一層
				</Button>
				<PageBlock>
					<EditForm
						onSubmit={_handleSubmitEdit}
						onBack={onBack}
						initialValues={initialValues}
						isEditing={isEditing}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}

	componentDidMount() {
		const { onNavigate, isEditing } = this.props;

		if (!isEditing) {
			onNavigate('/announcement/pop-up');
		}
	}
}

PopUpEditPage.propTypes = propTypes;
PopUpEditPage.defaultProps = defaultProps;

export default PopUpEditPage;
