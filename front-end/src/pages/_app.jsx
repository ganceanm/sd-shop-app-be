import React from 'react';
import '../styles/globals.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from 'theme';
import { SnackbarProvider } from 'components/Snackbar';
import { getMe } from 'store/me/actions';
import { autoSignIn, signInWithRefreshToken } from 'store/auth/actions';
import cookies from 'next-cookies';
import appWithI18n from 'next-translate/appWithI18n';
import url from 'url';
import App from 'next/app';
import { wrapper } from '../store/makeStore';
import i18n from '../../i18n';

const SmNext = (props) => {
	const { Component, pageProps } = props;

	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SnackbarProvider>
				<Component {...pageProps} />
			</SnackbarProvider>
		</ThemeProvider>
	);
};

const logoutCookies = ['refreshToken=; Max-Age=0', 'accessToken=; Max-Age=0'];

SmNext.getInitialProps = async (appContext) => {
	const { router, ctx } = appContext;

	const { store, req, res, query } = ctx;

	const { accessToken, refreshToken } = cookies(ctx);

	const redirect = (redirectUrl = '/sign-in') =>
		res.writeHead(302, { Location: redirectUrl }).end();

	if (req) {
		if (refreshToken && !accessToken) {
			try {
				// TODO: ide kell majd a cookiebol language beallitast irni
				await store.dispatch(signInWithRefreshToken(refreshToken, res));

				const redirectUrl = {
					pathname: router.pathname,
					query,
				};

				return redirect(url.format(redirectUrl));
			} catch (error) {
				return redirect('/sign-in');
			}
		} else if (!refreshToken && accessToken) {
			res.setHeader('Set-Cookie', logoutCookies);
			return redirect('/sign-in');
		}
	}

	if (accessToken) {
		await store.dispatch(autoSignIn());

		if (req) {
			try {
				await Promise.all([store.dispatch(getMe())]);
			} catch (error) {
				res.setHeader('Set-Cookie', logoutCookies);
				return redirect('/sign-in');
			}
		}
	}

	const appProps = await App.getInitialProps(appContext);

	return { ...appProps };
};

export default wrapper.withRedux(
	appWithI18n(SmNext, {
		...i18n,
		skipInitialProps: false,
	}),
);
