import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';

const propTypes = {
	children: PropTypes.node,
	onBack: PropTypes.func.isRequired,
};

const defaultProps = {};

const EditPage = ({ children, onBack, }) => (
	<Fragment>
		<Button
			className="edit-page__onback-button"
			outline={Button.OutlineEnums.HOLLOW}
			onClick={() => onBack()}
		>
			回到上一页
		</Button>
		{children}
	</Fragment>
);

EditPage.propTypes = propTypes;
EditPage.defaultProps = defaultProps;

export default EditPage;
