
// File: src/Pages/Clients/EditClient.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, DialogActions, Slide, TextField, Divider } from "@mui/material";
import { updateUser } from "../../redux/action/user";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditClient = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { currentEmployee: currentClient, isFetching } = useSelector((state) => state.user);
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: ""
  };

  const [clientData, setClientData] = useState(currentClient);

  useEffect(() => {
    setClientData(currentClient);
  }, [currentClient]);

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(updateUser(currentClient._id, clientData, "client"));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit Client</div>
        <div className="cursor-pointer" onClick={handleClose}><PiXLight className="text-[25px]" /></div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex gap-2 font-normal items-center">
            <PiNotepad size={23} /> <span>Client Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            {["firstName", "lastName", "email", "username", "phone"].map((field) => (
              <tr key={field}>
                <td className="pb-4 text-lg capitalize">{field.replace(/([A-Z])/g, " $1")} </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData?.[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                    sx={{ "& .MuiFormHelperText-root": { marginTop: "2px" } }}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose} className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d]">Cancel</button>
        <button onClick={handleSubmit} className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400">
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClient;
