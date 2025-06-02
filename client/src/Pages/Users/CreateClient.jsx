import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";
import { Dialog, DialogContent, DialogTitle, DialogActions, Slide, TextField, Divider } from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    role: "client"
  };
  const [clientData, setClientData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleClose = () => {
    setClientData(initialState);
    setErrors({});
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    ["firstName", "lastName", "username", "password", "phone"].forEach((field) => {
      if (!clientData[field]) newErrors[field] = `${field} is required`;
    });
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    dispatch(createEmployee(clientData, setOpen));
    setClientData(initialState);
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Add New Client</div>
        <div className="cursor-pointer" onClick={handleClose}><PiXLight className="text-[25px]" /></div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex gap-2 font-normal items-center">
            <PiNotepad size={23} /> <span>Client Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            {["firstName", "lastName", "username", "email", "password", "phone"].map((field) => (
              <tr key={field}>
                <td className="pb-4 text-lg capitalize">{field.replace(/([A-Z])/g, " $1")} </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    type={field === "password" ? "password" : field === "phone" ? "number" : "text"}
                    value={clientData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    error={Boolean(errors[field])}
                    helperText={errors[field] || " "}
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

export default CreateClient;