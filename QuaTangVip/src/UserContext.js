// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user_id, setUser_id] = useState(null);


//     const updateUser_id = (newUser_id) => {
//         setUser_id(newUser_id);
//     };

//     return (
//         <UserContext.Provider value={{ user_id, updateUser_id }}>
//         {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => {
//     return useContext(UserContext);
// };


import React, { createContext, useContext, useState, useMemo } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userGL, setUserGL] = useState({
    user_id: null,
    name: '',
    sex: null,
  });

  const updateUser = (newUser) => {
    setUserGL((prevUser) => ({
      ...prevUser,
      ...newUser,
    }));
  };

  const updateUserId = (newUserId) => {
    setUserGL((prevUser) => ({
      ...prevUser,
      user_id: newUserId,
    }));
  };

  const updateSex = (newSex) => {
    setUserGL((prevUser) => ({
      ...prevUser,
      sex: newSex,
    }));
  };

  const value = useMemo(() => ({
    userGL,
    updateUser,
    updateUserId,
    updateSex,
  }), [userGL]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
