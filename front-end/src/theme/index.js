import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import breakpoints from './breakpoints';

const theme = createMuiTheme({
	palette,
	typography,
	overrides,
	breakpoints,
});

export default theme;
