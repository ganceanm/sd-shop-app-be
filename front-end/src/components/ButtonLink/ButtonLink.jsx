/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const ButtonLink = (props) => {
	const { href, children, prefetch, ...rest } = props;

	return (
		<Link href={href} passHref prefetch={prefetch}>
			<Button {...rest}>{children}</Button>
		</Link>
	);
};

ButtonLink.propTypes = {
	className: PropTypes.string,
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default ButtonLink;
