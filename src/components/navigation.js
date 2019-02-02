import React, {Component} from 'react';
import {Divider, List, ListItemText, ListItemIcon, ListItem, Drawer, Hidden, ListSubheader} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CodeIcon from '@material-ui/icons/Code';
import LaptopIcon from '@material-ui/icons/Laptop'
import FoodIcon from '@material-ui/icons/Fastfood'
import LinkIcon from '@material-ui/icons/Link'
import {drawerWidth} from '../constants'

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
});

const IconPicker = props => {
    const {id} = props;
    return (
        <div>
            {id.includes('check') && <ExitToAppIcon/>}
            {id.includes('link') && <LinkIcon/>}
            {(id.includes('breakfast') || id.includes('lunch') ||
                id.includes('dinner') || id.includes('snack')) &&
            <FoodIcon/>}
            {id.includes('tech') && <LaptopIcon/>}
            {id.includes('mc') && <CodeIcon/>}
        </div>
    )
}

class Navigation extends Component {

    render() {
        const {classes, theme} = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Events</ListSubheader>}
                >
                    {this.props.events.map(({event_id, display_name}, index) => (
                        <ListItem button key={index} selected={this.props.selectedIndex === index}
                                  onClick={() => this.props.onChangeSelectedIndex({event_id, display_name}, index)}>
                            <ListItemIcon>
                                <IconPicker id={event_id}/>
                            </ListItemIcon>
                            <ListItemText primary={display_name}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </div>
        );

        return (
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileOpen}
                        onClose={this.props.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Navigation);
