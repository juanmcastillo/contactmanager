import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import ContactsList from './ContactsList';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

function ContactsView(props) {
    const { contacts, removeContact } = props;
    return (
        <Grid>
            <Row className="show-grid">
                <Col xs={6} xsOffset={10}>
                    <Link className="btn btn-success"
                          to="/create">Create</Link>
                </Col>
            </Row>

            <Row className="show-grid">
                <ContactsList contacts={contacts} removeContact={removeContact}/>
            </Row>
        </Grid>
    );
}

export default ContactsView;
