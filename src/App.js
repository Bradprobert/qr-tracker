import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, CssBaseline, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import {Navigation, Content} from './components'
import {drawerWidth, events} from "./constants";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
});

class App extends React.Component {
    state = {
        result: 'No result',
        mobileOpen: false,
        events: events,
        currentEvent: events[0],
        currentEventIndex: 0,
    };


    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    updateCurrentEvent = (currentEvent, index) => {
        this.setState({
            currentEvent: currentEvent,
            currentEventIndex: index,
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            QR Tracker
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Navigation events={this.state.events} selectedIndex={this.state.currentEventIndex}
                            onChangeSelectedIndex={this.updateCurrentEvent} mobileOpen={this.state.mobileOpen}
                            handleDrawerToggle={this.handleDrawerToggle}/>
                <Content currentEvent={this.state.currentEvent}/>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);