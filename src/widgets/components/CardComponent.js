import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import { red } from '@material-ui/core/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { canAccessModule } from '../../services/helpers/access';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  }));


const CardComponent = ({auth, module, pageLink, parent=null}) => {
    const classes = useStyles();
    const path = module.children.length !== 0 ? `/modules/${module.label}` : module.path
    return (
        <>
            {canAccessModule(module, auth) ? 
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton 
                                aria-label="settings"
                                onClick={() => pageLink(path)}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        }
                        title={module.name}
                        subheader="September 14, 2016"
                    />
                </Card>
            : null}
        </>
    )
}

export default CardComponent
