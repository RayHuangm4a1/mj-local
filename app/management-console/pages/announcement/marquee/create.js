import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import MarqueeForm from './form';

const propTypes = {
	onBack: PropTypes.func,
};

const defaultProps = {
	onBack: () => {},
	onNavigate: () => {},
};

class MarqueeCreatePage extends Component {
	constructor() {
		super();

		this._handleSubmitEdit = this._handleSubmitEdit.bind(this);
	}

	_handleSubmitEdit(values, form) {
		// TODO send edit api
	}

	render() {
		const { onBack, } = this.props;
		const { _handleSubmitEdit } = this;

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
						submitText="新增"
						onSubmit={_handleSubmitEdit}
						onBack={onBack}
					/>
				</PageBlock>
			</Fragment>
		);
	}
}

MarqueeCreatePage.propTypes = propTypes;
MarqueeCreatePage.defaultProps = defaultProps;

export default MarqueeCreatePage;
