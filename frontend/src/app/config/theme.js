const { createTheme, responsiveFontSizes } = require("@mui/material");

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default theme;
