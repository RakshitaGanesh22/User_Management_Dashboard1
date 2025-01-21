import { createContext, useState } from "react";
const Context = createContext();

function Contextprovider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [editData, setEditData] = useState([]);
  const [openEdit, setOpen] = useState(false);
  const [pageData, setPageData] = useState([]);
  return (
    <Context.Provider
      value={{
        editData,
        setEditData,
        data,
        setData,
        loading,
        setLoading,
        register,
        setRegister,
        openEdit,
        setOpen,
        pageData,
        setPageData,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Contextprovider, Context };
