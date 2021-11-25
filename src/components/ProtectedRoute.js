/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Avatar from '@material-ui/core/Avatar'
import MoreIcon from '@material-ui/icons/MoreVert'
import { useHistory, useLocation } from 'react-router-dom'
import { useStyles } from '../assets/global'
import { menuItems } from '../services/utils/menuItems'
import logo from "../assets/images/old-logo.png"


const ProtectedRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state => state.access.staff.authenticatedUser)

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const theme = useTheme()
    
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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

    // const loadClasses = item => {
    //     const active = location.pathname === item.path ? classes.active : null
    //     return ({
    //         active,
    //         nested: classes.nested
    //     })
    // }

    const nested = classes.nested

    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        NCDMB Budget Portal
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            className={classes.avatar} 
                            src="/fx.jpg"
                            color="inherit"
                        />
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
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
                <List>
                    {menuItems.map(item => {
                        if (item.children.length > 0) {
                            return (
                                <div 
                                    key={item.id}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                >
                                    <ListItem
                                        button
                                        key={item.id}
                                        onClick={() => handleClick(item.id)}
                                        className={location.pathname === item.path ? classes.active : null}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                        {openNested === item.id && collapseNav ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Divider />
                                    <Collapse in={openNested === item.id && collapseNav} timeout="auto" unmountOnExit>
                                        <List component="div">
                                            {item.children.map(child => (
                                                <ListItem
                                                    key={child.id}
                                                    button
                                                    className={`${location.pathname === child.path ? classes.active : null} ${classes.nested}`}
                                                    onClick={() => history.push(child.path)}
                                                >
                                                    <ListItemIcon>
                                                        {child.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={child.text} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    key={item.id}
                                >
                                    <ListItem
                                        button
                                        onClick={() => history.push(item.path)}
                                        className={location.pathname === item.path ? classes.active : null}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        }
                    })}
                </List>
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
