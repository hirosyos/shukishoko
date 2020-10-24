/* react */
import React from 'react';
import clsx from 'clsx';
/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardAvatar from 'components/Card/CardAvatar.js';

import CardHeader from 'components/Card/CardHeader.js';

import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import { cardTitle } from 'assets/jss/nextjs-material-kit-pro.js';

import { convertFromTimestampToDatetime } from 'src/common/common';
import Link from 'src/components/atoms/Link';

const useStyles = makeStyles((style) => ({
  // width: '40rem',
  root: {
    width: '40rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardTitle,
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: style.transitions.create('transform', {
      duration: style.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'white',
  },
}));

/**
 * ユーザカード
 *
 * @param {*} { userName, userData }
 * @return {*}
 */
const UserCard = ({ userName, userData }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      {/* <CardHeader
        // 著者アイコン
        avatar={
          <Avatar
            aria-label="recipe"
            // className={classes.avatar}
            className={classes.lightGray}
          >
            {userData.userIconImageUrl}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // ユーザ名
        title={userData.userDisplayName}
        // 手記更新日
        subheader={convertFromTimestampToDatetime(userData.updatedAt.seconds)}
      /> */}
      <CardHeader color="primary">
        <GridContainer spacing={2}>
          <GridItem item xs={2}>
            <Avatar aria-label="avatar" className={classes.avatar}>
              {userData.userIconEmoji ? userData.userIconEmoji : '🙆'}
            </Avatar>
          </GridItem>
          <Grid item xs={8}>
            <h4>
              {userData.userDisplayName}@{userData.userName}
            </h4>
          </Grid>
          <GridItem item xs={2}>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </GridItem>
        </GridContainer>
      </CardHeader>
      <CardActionArea>
        <Link underline="none" href={`/users/${userName}`}>
          <CardBody>
            <h4 className={classes.cardTitle}>aaa</h4>
            <Typography variant="body2" color="textSecondary" component="p">
              ユーザ公開設定:{userData.isPublic}
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                ユーザ公開設定:{userData.isPublic}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                ユーザアイコン画像URL:{userData.userIconImageUrl}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ユーザカバー画像URL:{userData.userCoverImageUrl}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ユーザ自己紹介文:{userData.userIntroduction}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                料金プラン:{userData.pricePlan}
              </Typography>
              <br />
              <Typography variant="body2" color="textSecondary" component="p">
                作成日:
                {convertFromTimestampToDatetime(userData.createdAt.seconds)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                更新日:
                {convertFromTimestampToDatetime(userData.updatedAt.seconds)}
              </Typography>
            </CardContent>
          </CardBody>
        </Link>
      </CardActionArea>
      <Divider />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default UserCard;
