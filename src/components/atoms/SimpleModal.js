import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import Button from 'components/CustomButtons/Button.js';

import style from 'assets/jss/nextjs-material-kit-pro/modalStyle.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);
/**
 * シンプルモーダル
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function SimpleModal(props) {
  const [liveDemo, setLiveDemo] = React.useState(true);
  const classes = useStyles();
  const {
    modalTitle,
    modalText,
    closeBtnTxt,
    yesBtnTxt,
    noBtnTxt,
    callBack,
  } = props;
  console.log({ modalTitle });
  console.log({ modalText });

  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={liveDemo}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setLiveDemo(false);
          callBack && callBack('close');
        }}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => {
              setLiveDemo(false);
              callBack && callBack('close');
            }}
          >
            {' '}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>{modalTitle}</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>{modalText}</p>
        </DialogContent>

        <DialogActions className={classes.modalFooter}>
          {/* クローズボタン設定 */}
          {closeBtnTxt && (
            <Button
              onClick={() => {
                setLiveDemo(false);
                callBack && callBack('close');
              }}
              color="primary"
            >
              Close
            </Button>
          )}
          {/* YESボタン設定 */}
          {yesBtnTxt && (
            <Button
              onClick={() => {
                setLiveDemo(false);
                callBack && callBack('yes');
              }}
              color="primary"
            >
              {yesBtnTxt}
            </Button>
          )}
          {/* NOボタン設定 */}
          {noBtnTxt && (
            <Button
              onClick={() => {
                setLiveDemo(false);
                callBack && callBack('no');
              }}
              color="primary"
            >
              {noBtnTxt}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
