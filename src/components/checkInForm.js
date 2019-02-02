import React, {Component} from 'react';
import {TextField} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    checkInForm: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '10px 0px',
    },
    textField: {
        flex: 1,
        margin: theme.spacing.unit,
        minWidth: 200
    },
});

class CheckInForm extends Component {

    handleChange = name => event => {
        this.props.handleChange(name, event);
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.checkInForm} noValidate autoComplete='off'>
                <TextField
                    label="First Name"
                    className={classes.textField}
                    value={this.props.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"/>
                <TextField
                    label="Last Name"
                    className={classes.textField}
                    value={this.props.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"/>
            </form>
        );
    }
}

export default withStyles(styles, {withTheme: true})(CheckInForm);
