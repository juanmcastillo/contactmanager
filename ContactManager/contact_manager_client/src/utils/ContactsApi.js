const api = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : window.location.origin;

/* Contacts End Points */

export const getAllContacts = () =>
    fetch(`${api}/contacts`, {
            method: 'GET'
        })
        .then(res => res.json());

export const createContact = (body) =>
    fetch(`${api}/contacts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    .then(res => res.json());

export const deleteContact = (contactId) =>
    fetch(`${api}/contacts/${contactId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: contactId
            })
        });

export const updateContact = (contact) =>
    fetch(`${api}/contacts/${contact.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...contact
            })
        }).then(res => res.json());
