import React, {Component} from 'react';
import {
    Typography,
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import QrReader from 'react-qr-reader';
import CheckInForm from './checkInForm';
import firebase from 'firebase';
import {databaseEvents} from '../constants'

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    qrBox: {
        maxWidth: 500,
        padding: 10,
        margin: 'auto',
        textAlign: 'center'

    },
    header: {
        margin: 10
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
    button: {
        margin: theme.spacing.unit,

    },
    id: {
        margin: theme.spacing.unit
    },

    toolbar: theme.mixins.toolbar
});

class Content extends Component {
    state = {
        result: '',
        open: false,
        firstName: '',
        lastName: '',
        cantAttend: false
    }

    handleScan = result => {
        if (result) {
            if (result !== this.state.result) {
                this.setState({
                    result: result
                });
            }
        }
    };

    handleError = err => {
        console.error(err)
    };

    toggleDialogOpen = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    handleChange = (name, event) => {
        this.setState({
            [name]: event.target.value,
        });
    }

    onClear = () => {
        this.setState({
            result: '',
            firstName: '',
            lastName: ''
        })
    }

    onSubmit = () => {
        const eventId = this.props.currentEvent.event_id;
        if (eventId.includes('check')) {
            firebase.database().ref('hackers/' + this.state.result).set({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                events: databaseEvents
            });
        } else {
            const id = eventId.replace('-', '_');
            firebase.database().ref('hackers/' + this.state.result + '/events/' + id).once('value').then(
                snap => {
                    this.setState({
                        cantAttend: snap.val(),
                    });
                    if(!snap.val()) {
                        firebase.database().ref('hackers/' + this.state.result + '/events/' + id).set(true).then(() => {
                                this.setState({
                                    result: ''
                                })
                            }
                        );
                    }
                }
            )
        }
        this.toggleDialogOpen();
    }

    render() {
        const {classes} = this.props;
        const {event_id, display_name} = this.props.currentEvent;
        const {result, firstName, lastName} = this.state;
        //Todo: finish dialog popup
        return (
            <main className={classes.content}>
                <div className={classes.toolbar}/>

                <Paper className={classes.qrBox}>
                    <Typography className={classes.header}
                                variant="h4">
                        {display_name}
                    </Typography>
                    {event_id.includes('check') &&
                    <CheckInForm firstName={firstName} lastName={lastName}
                                 handleChange={this.handleChange}/>}
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                    <Typography className={classes.id}>QR ID: {result}</Typography>
                    <div className={classes.buttonContainer}>
                        <Button
                            variant='contained'
                            className={classes.button}
                            onClick={this.onClear}>clear</Button>
                        <Button variant='contained'
                                color='secondary'
                                className={classes.button}
                                disabled={result === ''}
                                onClick={this.onSubmit}>submit</Button>
                    </div>
                </Paper>
                <Dialog
                    onClose={this.toggleDialogOpen}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.toggleDialogOpen}>
                        {this.state.cantAttend ? "Oops!" : "Awesome"}
                    </DialogTitle>
                    <DialogContent>
                        {event_id.includes('check') &&
                        <Typography variant='h4' gutterBottom>Welcome to AuburnHacks, {firstName}!</Typography>}
                        {this.state.cantAttend ?
                            <Typography variant='h4' gutterBottom>Sorry, you have already attended this event!</Typography> :
                            <Typography variant='h4' gutterBottom>Welcome to {display_name}</Typography>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleDialogOpen} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        );
    }
}

export default withStyles(styles)(Content);
