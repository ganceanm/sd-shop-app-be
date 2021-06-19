/* eslint-disable object-shorthand */
import cookies from 'next-cookies';
import loadNamespaces from 'next-translate/loadNamespaces';

export const loadLocaleFromCtx = async (ctx) => {
	const { pathname } = ctx;
	const { NEXT_LOCALE } = cookies(ctx);

	// TODO: create language picker + cookie persist on lang change
	// https://github.com/vinissimus/next-translate#10-how-to-save-the-user-defined-language
	return loadNamespaces({ locale: NEXT_LOCALE, pathname: pathname });
};
