/* eslint-disable no-unused-vars */
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import SearchIcon from '@material-ui/icons/Search'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import MoreIcon from '@material-ui/icons/MoreVert'
import clsx from 'clsx'

const Header = ({
    styling,
    drawerOpen,
    open,
    profileMenuOpen,
    menuId,
    mobileMenuId,
    mobileMenuOpen

}) => {
    return (
        <AppBar
            position="fixed"
            className={clsx(styling.appBar, {
                [styling.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => drawerOpen()}
                    edge="start"
                    className={clsx(styling.menuButton, open && styling.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    NCDMB Budget Portal
                </Typography>
                <div className={styling.search}>
                    <div className={styling.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: styling.inputRoot,
                        input: styling.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={styling.grow} />
                <div className={styling.sectionDesktop}>
                    {/* <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
                    <Avatar
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={e => profileMenuOpen(e)}
                        className={styling.avatar} 
                        src="/fx.jpg"
                        color="inherit"
                    />
                </div>
                <div className={styling.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={e => mobileMenuOpen(e)}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
