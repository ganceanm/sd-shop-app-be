import { useContext } from 'react';

import { SnackbarContext } from './SnackbarProvider';

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
