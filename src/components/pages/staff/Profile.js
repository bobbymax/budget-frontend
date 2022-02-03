import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'
import {AvatarGroup} from '@material-ui/lab'
import React from 'react'
import { useStyles } from '../../../assets/global'

const Profile = () => {

    const classes = useStyles()

    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                style={{ marginBottom: 30 }}
            >
                Profile
            </Typography>

            <Grid container spacing={3}>
                <Grid item md={8}>
                    <Card style={{ marginBottom: 20 }}>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item md={6}>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                    >
                                        Name
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                    >
                                        Ekaro, Bobby Tamunotonye
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                    >
                                        Email
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                    >
                                        bobby.ekaro@ncdmb.gov.ng
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={8}>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                    >
                                        Department
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                    >
                                        Information, Communications Technology (ICT)
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                    >
                                        Team Members
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                    >
                                        <AvatarGroup max={5}>
                                            <Avatar alt="Uche Levi" src="." className={classes.avatarStyles} />
                                            <Avatar alt="Jerry Attabong" src="." className={classes.avatarStyles} />
                                            <Avatar alt="Andy Jisu" src="." className={classes.avatarStyles} />
                                            <Avatar alt="Babatunde Ade" src="." className={classes.avatarStyles} />
                                            <Avatar alt="Ayo Sharp" src="." className={classes.avatarStyles} />
                                            <Avatar alt="Bright Amatoru" src="." className={classes.avatarStyles} />
                                            <Avatar alt="Oluwafemi Ajayi" src="." className={classes.avatarStyles} />
                                        </AvatarGroup>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile
