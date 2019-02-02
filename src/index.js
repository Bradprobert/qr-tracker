import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import firebase from 'firebase/app';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0D284D',
        },
        secondary: {
            main: '#DA5926',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
        ].join(','),
    },
});

function Main(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    )
}

var config = {
    apiKey: "AIzaSyDJHXlB6_BEk55UQlLkGq6SajLvNmhE9cY",
    authDomain: "qr-tracker-4f3ce.firebaseapp.com",
    databaseURL: "https://qr-tracker-4f3ce.firebaseio.com",
    projectId: "qr-tracker-4f3ce",
    storageBucket: "qr-tracker-4f3ce.appspot.com",
    messagingSenderId: "939175861621"
};
firebase.initializeApp(config);

ReactDOM.render(<Main />, document.getElementById('root'));
