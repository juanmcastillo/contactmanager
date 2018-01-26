import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import ShortId from 'shortid';
import { Link } from 'react-router-dom';
import * as ContactsApi from '../../utils/ContactsApi';

class ContactsList extends React.Component {

    state = {
        showModal: false
    }

    openModal = (contactId) => this.setState({
        showModal: true,
        contactId
    })
    
    closeModal = () => this.setState({ showModal: false })

    deleteContact = (removeContact) => ContactsApi.deleteContact(this.state.contactId)
                                                .then(response => {
                                                    this.closeModal();
                                                    removeContact(this.state.contactId);
                                                });

    render() {
        const { contacts, removeContact } = this.props;
        return (
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Creation Date</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contacts.map(contact => (
                            <tr key={ShortId.generate()}>
                                <td>{new Date(contact.creationDate).toDateString()}</td>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.phone}</td>

                                <td>
                                    <ButtonToolbar>
                                        <ButtonGroup>
                                            <Link className='btn btn-warning'
                                                  to={`edit/${contact.id}`}>Edit</Link>

                                            <Button bsStyle="danger"
                                                    onClick={() => this.openModal(contact.id)}>Delete</Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        ))
                    }
                    
                    </tbody>
                </Table>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this record ?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                        <Button bsStyle="danger"
                                onClick={() => this.deleteContact(removeContact)}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default ContactsList;
