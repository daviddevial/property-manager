import { AppBar, Button, Grid, TextField, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Container from '@material-ui/core/Container';
import { GetPropertiesResponse, getPropertiesQuery, addPropertyQuery, AddPropertyResponse, editPropertyQuery, EditPropertyResponse, DeletePropertyResponse, deletePropertyQuery } from './query';
import { makeRequest } from './request';
import { Property } from './types';

function App() {
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [newProperty, setNewProperty] = useState<Property>({ id: uuid(), name: "" });

    // Fetch data from API on load
    useEffect(() => {
        (async () => {
            const response = await makeRequest<null, GetPropertiesResponse>(getPropertiesQuery, null);
            setProperties(response.data.getProperties);
        })();
    }, []);

    // Save a new property with the API and update view
    const addProperty = async () => {
        try {
            const response = await makeRequest<{ property: Property }, AddPropertyResponse>(addPropertyQuery, { property: newProperty });
            if (response.data.addProperty) {
                setProperties([
                    ...properties,
                    newProperty
                ]);
                setNewProperty({ id: uuid(), name: "" });
            }
        } catch (e) {
            console.error("Failed to add property", e);
        }
    };

    // Save editing changes with the API and update view
    const editProperty = async () => {
        if (editingProperty) {
            try {
                const response = await makeRequest<{ property: Property }, EditPropertyResponse>(editPropertyQuery, { property: editingProperty });
                if (response.data.editProperty) {
                    setProperties(properties.map(item => item.id === editingProperty.id ? editingProperty : item));
                    setEditingProperty(null);
                }
            } catch (e) {
                console.error("Failed to edit property", e);
            }
        }
    };

    // Enter editing mode for an existing property
    const editMode = (property: Property) => {
        return () => {
            setEditingProperty(property);
        };
    };

    // Cancel editing mode
    const cancelEdit = () => {
        setEditingProperty(null);
    };

    // Delete existing property with the API and update view
    const deleteProperty = (property: Property) => {
        return async () => {
            try {
                const response = await makeRequest<{ property: Property }, DeletePropertyResponse>(deletePropertyQuery, { property });
                if (response.data.deleteProperty) {
                    setProperties(properties.filter(item => item.id !== property.id));
                }
            } catch (e) {
                console.error("Failed to delete property", e);
            }
        };
    };

    // Change handler for editing mode input
    const editNameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(editingProperty, event.target.value)
        setEditingProperty(
            editingProperty
                ? {
                    ...editingProperty,
                    name: event.target.value
                } : null
        );
    };

    // Change handler for add property input
    const addNameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProperty({
            ...newProperty,
            name: event.target.value
        });
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Manage your properties
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {properties.map(property => {
                    if (editingProperty?.id === property.id) {
                        return (
                            <Grid container spacing={3} key={property.id}>
                                <Grid item sm={8}>
                                    <TextField onChange={editNameInputChangeHandler} value={editingProperty.name} />
                                </Grid>
                                <Grid item sm={2}>
                                    <Button color="secondary" variant="contained" onClick={cancelEdit} data-testid="cancel-button">Cancel</Button>
                                </Grid>
                                <Grid item sm={2}>
                                    <Button color="secondary" variant="contained" onClick={editProperty} data-testid="save-button">Save</Button>
                                </Grid>
                            </Grid>
                        );
                    }
                    return (
                        <Grid container spacing={3} key={property.id}>
                            <Grid item sm={8}>
                                <p>{property.name}</p>
                            </Grid>
                            <Grid item sm={2}>
                                <Button color="secondary" variant="contained" onClick={editMode(property)} data-testid="edit-button">Edit</Button>
                            </Grid>
                            <Grid item sm={2}>
                                <Button color="secondary" variant="contained" onClick={deleteProperty(property)} data-testid="delete-button">Delete</Button>
                            </Grid>
                        </Grid>
                    );
                })}
                <TextField onChange={addNameInputChangeHandler} value={newProperty.name} inputProps={{ "data-testid": "add-input" }} />
                <Button color="primary" variant="contained" onClick={addProperty} data-testid="add-button">Add</Button>
            </Container>
        </>
    );
}

export default App;
