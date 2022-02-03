/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListAltIcon from '@material-ui/icons/ListAlt'
import SubjectOutlined from '@material-ui/icons/SubjectOutlined'

const Aside = ({ 
    modules, 
    auth,
    pathname,
    activeState,
    openNested,
    collapseNav,
    history,
    showSelected
}) => {

    return (
        <List>
            <>
                <ListItem
                    button
                    onClick={() => history.push('/')}
                    className={pathname.pathname === "/" ? activeState.active : null}
                >
                    <ListItemIcon>
                        <SubjectOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Divider />
                {modules.map(item => {
                    if (item.type === "application") {

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
                                        onClick={() => showSelected(item.id)}
                                        className={pathname.pathname === item.path ? activeState.active : null}
                                    >
                                        <ListItemIcon>
                                            {/* {item.icon} */}
                                            <ListAltIcon />
                                        </ListItemIcon>
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
                                                    className={`${pathname.pathname === child.path ? activeState.active : null} ${activeState.nested}`}
                                                    onClick={() => history.push(child.path)}
                                                >
                                                    <ListItemIcon>
                                                        {/* {child.icon} */}
                                                        <ListAltIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={child.name} />
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
                                        className={pathname.pathname === item.path ? activeState.active : null}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        }

                    } else {
                        return null
                    }
                })}
            </>
        </List>
    )
}

export default Aside
