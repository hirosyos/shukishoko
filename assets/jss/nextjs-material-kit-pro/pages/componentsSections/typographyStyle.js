import {
  grayColor,
  container,
  title
} from "assets/jss/nextjs-material-kit-pro.js";

import imagesStyles from "assets/jss/nextjs-material-kit-pro/imagesStyles.js";

const typographyStyle = {
  section: {
    padding: '70px 0',
  },
  container,
  space50: {
    height: '50px',
    display: 'block',
  },
  title: {
    ...title,
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
    width: '100%',
  },
  note: {
    fontFamily: '"Noto Sans JP", "Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: grayColor[21],
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
  marginLeft: {
    marginLeft: 'auto !important',
  },
  ...imagesStyles,
};

export default typographyStyle;
