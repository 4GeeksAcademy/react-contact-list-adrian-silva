const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userName: 'adrian-silva',
			contactList: []
		},
		actions: {
			addContact: async (newContact) => {
				try {
					const store = getStore();
					const response = await fetch(
						`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								name: newContact.name,
								phone: newContact.phone,
								email: newContact.email,
								address: newContact.address
							}),
						}
					);
					if (!response.ok) {
						throw new Error("Failed to add new contact");
					}
					const addedContact = await response.json();
					setStore({ contactList: [...store.contactList, addedContact] });
					await getActions().getContactList();

				} catch (error) {
					setStore({ error: error.message });
					console.error("Error adding new contact:", error);
				}
			},

			editContact: async (contactId, newContact) => {
				try {
					const store = getStore();
					const response = await fetch(
						`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts/${contactId}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(newContact),
						}
					);
					if (response.ok) {
						const data = await response.json();
						setStore({ contactList: store.contactList.map(contact => contact.id === data.id ? data : contact) });
					} else {
						throw new Error("Failed to update contact");
					}
				} catch (error) {
					setStore({ error: error.message });
					console.error("Error updating contact:", error);
				}
			},

			deleteContact: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(
						`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts/${id}`,
						{
							method: "DELETE"
						}
					);
					if (!response.ok) {
						throw new Error("Failed to delete contact");
					}
					const updatedContacts = store.contactList.filter(contact => contact.id !== id);
					setStore({ contactList: updatedContacts });
				} catch (error) {
					setStore({ error: error.message });
					console.error("Error deleting contact:", error);
				}
			},

			addUser: async (slug) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({}),
					});
					if (!response.ok) {
						throw new Error('Failed to create agenda');
					}
					await response.json();
				} catch (error) {
					console.error('Error creating user\'s agenda:', error);
				}
			},

			getContactList: async () => {
				const store = getStore();
				const actions = getActions();
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts`);

				if (!response.ok) {
					if (response.status === 404) {
						await actions.addUser(store.userName);
					}
					return false;
				}
				const data = await response.json();
				setStore({ contactList: data.contacts });
			}
		}
	};
};

export default getState;
