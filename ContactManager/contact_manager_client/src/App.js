import React from 'react';
import * as ContactsApi from './utils/ContactsApi';
import AppHeader from './components/shared/AppHeader';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import { Route, Switch } from 'react-router-dom';
import ContactsView from './components/contacts/ContactsView';
import ContactsForm from './components/contacts/ContactsForm';

class App extends React.Component {

    state = {
        contacts: []
    }

    componentDidMount() {
        ContactsApi.getAllContacts()
                 .then((contacts) => this.setState({contacts}));
    }

    addContact = (contact) => this.setState({
        contacts: this.state.contacts.concat(contact)
    });

    removeContact = (contactId) => this.setState({
        contacts: this.state.contacts.filter(contact => contact.id !== contactId)
    });

    refreshContact = (contact) => this.setState({
        contacts: this.state.contacts.filter(c => contact.id !== c.id)
                                     .concat(contact)
    });

    render() {
    return (
        <div className="App">
            <AppHeader />
            <Jumbotron>
                <Grid>
                    <Switch>

                        <Route exact path='/' render={() => 
                            <ContactsView contacts={this.state.contacts} removeContact={this.removeContact} />
                        }/>

                        <Route exact path='/create' render={() => (
                            <ContactsForm addContact={this.addContact}/>
                        )} />

                        <Route exact path='/edit/:id' render={(props) => (
                            <ContactsForm contacts={this.state.contacts}
                                          match={props.match}
                                          refreshContact={this.refreshContact}/>
                        )} />

                        <Route render={() => (
                            <h1>Not Found</h1>
                        )} />

                    </Switch>
                </Grid>
            </Jumbotron>
        </div>
    );
    }
}

export default App;
