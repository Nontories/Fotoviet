import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() =>{
        const storedItem = localStorage.getItem("user");
        return storedItem ? JSON.parse(storedItem) : {};
    });

    // Define a function to update the user information
    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};