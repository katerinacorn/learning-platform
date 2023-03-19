import {
  createTheme,
} from '@mui/material';
import {
  teal,
  grey,
  red,
} from '@mui/material/colors';

const overrides = {
  palette: {
    primary: {
      main: teal[800],
    },
    secondary: {
      main: grey[700],
    },
    hoverIcon: {
      main: red.A700,
    },
  },
};

const theme = createTheme(overrides);

export {
  overrides,
};
export default theme;
