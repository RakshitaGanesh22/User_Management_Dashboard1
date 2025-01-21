import { createContext, useState } from "react";
const Context = createContext();

function Contextprovider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [editData, setEditData] = useState([]);
  const [openEdit, setOpen] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [infiniteData, setInfinite] = useState([]);
  const [finiteOpen, setFinite] = useState(false);
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
        infiniteData,
        setInfinite,
        finiteOpen,
        setFinite,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Contextprovider, Context };
