/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import { useHistory, useLocation } from 'react-router-dom'
import { useStyles } from '../assets/global'
import logo from "../assets/images/old-logo.png"
import Aside from '../commons/Aside'
import Header from '../commons/Header'
import { fetchAccessibleModules } from '../services/helpers/access'


const ProtectedRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state => state.access.staff.authenticatedUser)

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const theme = useTheme()
    const dispatch = useDispatch()
    
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const [openNested, setOpenNested] = useState(0)
    const [collapseNav, setCollapseNav] = useState(false)
    

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClick = id => {

        if (openNested === id && collapseNav) {
            setCollapseNav(! collapseNav)
        }

        if (! collapseNav) {
            setCollapseNav(! collapseNav)
        }

        setOpenNested(id)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem 
                onClick={() => {
                    history.push('/profile')
                }}
            >
                Profile
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    dispatch({ type: 'LOGGED_OUT' })
                    history.push('/login')
                }
            }>Log Out</MenuItem>
        </Menu>
    )
    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={11} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <Avatar
                    alt="Profile"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    src="/fx.jpg"
                    color="inherit"
                />
                <p style={{ marginLeft: 8 }}>Profile</p>
            </MenuItem>
        </Menu>
    )

    return (

        <div className={classes.root}>
            <CssBaseline />
            <Header 
                styling={classes}
                drawerOpen={handleDrawerOpen}
                open={open}
                menuId={menuId}
                mobileMenuId={mobileMenuId}
                profileMenuOpen={handleProfileMenuOpen}
                mobileMenuOpen={handleMobileMenuOpen}
            />
            {renderMobileMenu}
            {renderMenu}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Avatar alt="NCDMB LOGO" src={logo} />
                    <Typography
                        variant="body2"
                        component="h1"
                        style={{ marginLeft: 10 }}
                        color="primary"
                    >
                        NCDMB Budget Portal
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

                <Aside 
                    modules={fetchAccessibleModules(rest.modules, authenticated)} 
                    auth={authenticated}
                    pathname={location}
                    activeState={classes}
                    openNested={openNested}
                    collapseNav={collapseNav}
                    history={history}
                    showSelected={handleClick}
                />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div className={classes.page}>
                    {/* Components */}
                    <Route {...rest} render={
                        props => {
                            if (authenticated !== null) {
                                return <Component {...props} />;
                            } else {
                                return <Redirect to={
                                    {
                                        pathname: "/login",
                                        state: {
                                            from: props.location
                                        }
                                    }
                                } />
                            }
                        }
                    } />
                </div>
            </main>
        </div>
    )
}

export default ProtectedRoute
