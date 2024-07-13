const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contactList: [] 
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				//reset the global store
				setStore({ demo: demo });
			},
			addContact: async(newContact, username) => {
				try {
					const response = await fetch(
						`https://playground.4geeks.com/agendas/${username}/contacts`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newContact),
                        }
					);
					if(!response.ok){
						const errorData = await response.json();
						throw new Error("Failed to add new contact");
					}
					const addedContact = await response.json();
					console.log("New contact added successfully:", addedContact);

					setStore({contacts:[...getStore().contactList, addedContact]});
					await getContactList(username);

				} catch (error) {
					setStore({error: error.message});
					console.error("Error adding new contact:", error);
				}
			},
			editContact: async(userName, contactId, newContact) => {
				try {
					const response = await fetch(
						`https://playground.4geeks.com/agendas/${userName}/contacts/${contactId}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newContact),
                        }
					);
				} catch (error) {
					setStore({error: error.message});
					console.error("Error updating contact:", error);
				}
			},

			deleteContact: async (userName, id) => {
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/agendas/${userName}/contacts/${id}`,
                        {
                            method: "DELETE"
                        }
                    );
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error("Failed to delete contact");
                    }
                    console.log("Contact deleted successfully");

                    // Actualizar el store después de la eliminación
                    const { contactList } = getStore();
                    const updatedContacts = contactList.filter(contact => contact.id !== id);
                    setStore({ contactList: updatedContacts });
                } catch (error) {
                    setStore({ error: error.message });
                    console.error("Error deleting contact:", error);
                }
            },

			getContactList: (username) => {
				console.log(`Fetching contacts for username:${username}`)
				fetch(`https://playground.4geeks.com/contact/agendas/${username}/contacts`)
					.then((response) => {
						console.log(`Response status: ${response.status}`)
						if (response.status === 404) {
							throw new Error('User does not have contacts');
						}
						return response.json();
					})
					.then((data) => {
						console.log('Data fetched:',data)
						if (data && data.contacts) {
							// Actualizo el store con la lista
							setStore({ contactList: data.contacts });
						}
					})
					.catch((error) => console.log('Error fetching contacts:', error));
			}
		}
	};
};

export default getState;
