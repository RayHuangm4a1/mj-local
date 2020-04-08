import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import EditForm from './forms/edit-form';

const propTypes = {
	onBack: PropTypes.func,
};

class PopUpCreatePage extends Component {
	constructor() {
		super();

		this._handleSubmitCreate = this._handleSubmitCreate.bind(this);
	}

	_handleSubmitCreate(values) {
		// TODO send create api
	}

	render() {
		const { onBack, } = this.props;
		const { _handleSubmitCreate } = this;

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
						onSubmit={_handleSubmitCreate}
						onBack={onBack}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}
}

PopUpCreatePage.propTypes = propTypes;

export default PopUpCreatePage;
