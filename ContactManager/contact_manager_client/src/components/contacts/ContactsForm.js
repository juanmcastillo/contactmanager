import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import * as ContactsApi from '../../utils/ContactsApi';
import { Redirect } from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class ContactsForm extends React.Component {

    constructor(props) {
        super(props);
        
        const { contacts, match } = props;

        const selectedContactId = match ? parseInt(match.params.id, 10) : null;

        const selectedContact = contacts && selectedContactId ? contacts.find(contact => contact.id === selectedContactId) : null;

        this.state = {
            firstName: selectedContact? selectedContact.firstName : '',
            lastName: selectedContact ? selectedContact.lastName : '',
            phone: selectedContact ? selectedContact.phone : '',
            redirectToMainPage: !selectedContact && selectedContactId
        }
    }

    saveContact = (addContact) => {
        ContactsApi.createContact({
            ...this.state
        }).then((contact) => {
                addContact(contact);

                this.setState({
                    redirectToMainPage: true
                });
            }
        );
    }

    updateContact = (refreshContact, contactId) => {
        ContactsApi.updateContact({
            ...this.state,
            id: contactId
        }).then((contact) => {
            refreshContact(contact);

            this.setState({
                redirectToMainPage: true
            });
        });

    };

    updateField = (field, e) => {
        this.setState({ [field]: e.target.value });
    }

    render() {
        const { addContact, refreshContact, match } = this.props;

        if (this.state.redirectToMainPage) {
            return (<Redirect to="/" />);
        }

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={10}>
                        <ButtonGroup>
                            {
                                !match ? (<Button bsStyle="success"
                                                  onClick={() => this.saveContact(addContact)}>Save</Button>)
                                    : (<Button bsStyle="primary"
                                               onClick={() => this.updateContact(refreshContact, match.params.id)}>Update</Button>)
                            }

                            <Link className="btn btn-default"
                                  to='/'>Cancel</Link>
                        </ButtonGroup>
                    </Col>
                </Row>

                <Row className="show-grid">
                    <form>
                        <FormGroup controlId="formBasicText">

                            <ControlLabel>First Name</ControlLabel>

                            <FormControl type="text"
                                         value={this.state.firstName}
                                         placeholder="Enter first name"
                                         onChange={(e) => this.updateField('firstName', e)} />
                        </FormGroup>

                        <FormGroup controlId="formBasicText">

                            <ControlLabel>Last Name</ControlLabel>

                            <FormControl type="text"
                                         value={this.state.lastName}
                                         placeholder="Enter last name"
                                         onChange={(e) => this.updateField('lastName', e)} />
                        </FormGroup>

                        <FormGroup controlId="formBasicText">

                            <ControlLabel>Phone</ControlLabel>

                            <FormControl type="text"
                                         value={this.state.phone}
                                         placeholder="Enter a phone"
                                         onChange={(e) => this.updateField('phone', e)} />
                        </FormGroup>

                    </form>
                </Row>
            </Grid>
        );
    }
}

export default ContactsForm;
