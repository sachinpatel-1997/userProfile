import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { addUserAction } from '../actions/creators';




const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    buttonProgress: {
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  },
}));

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users?.loading);

  const initialValues = { name: "",
  email: "",
  password: "",
  role: ""};
  // const [inputs, setInputs] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   role: ""
  // });
  const [inputs, setInputs] = useState(initialValues);
  //  const [ setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
	// const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  // useEffect(() => {
  //   handleValidate(inputs);
  // }, [inputs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setFormErrors(validate(inputs));
    // if (handleValidate(inputs)) {
      dispatch(addUserAction(inputs, history));
    // }
  }

  useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && submitted) {
		  console.log(inputs);
		}
	  }, [formErrors]);
  // function handleValidate(values) {
  //   const errors = {};
  //   let isValid = true;
  //   if (!values.name) {
  //     isValid = false;
  //     errors.name = "Please enter name";
  //   }
  //   if (!values.email) {
  //     isValid = false;
  //     errors.email = "Please enter email.";
  //   }
  //   if (!values.password) {
  //     isValid = false;
  //     errors.password = "Please enter password";
  //   }
  //   if (!values.role) {
  //       isValid = false;
  //       errors.role = "Please enter role";
  //     }
  //    setErrors(errors);
  //   return isValid;
  // }
  const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
			
		if (!values.name) {
		  errors.name = "Name is required!";
		} else if (!regex.test(values.name)) {
		  errors.name = "This is not a valid Name format!";
		}
		if (!values.email) {
		  errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
		  errors.email = "This is not a valid email format!";
		}
		if (!values.password) {
		  errors.password = "Password is required";
		} else if (values.password.length < 4) {
		  errors.password = "Password must be more than 4 characters";
		} else if (values.password.length > 10) {
		  errors.password = "Password cannot exceed more than 10 characters";
		}
    	
		if (!values.role) {
		  errors.role = "Role is required!";
		} else if (!regex.test(values.role)) {
		  errors.role = "This is not a valid role format!";
		}
		return errors;
	  };
  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Create User</h1>
      <form
        className={classes.root}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <div>
        <TextField
          type="text"
          name="name"
          label="Name"
          value={inputs.name}
          onChange={handleChange}
          fullWidth
        />
        <p style={{color:'red'}}>{formErrors.name}</p>
        </div>

        <div>
        <TextField
          type="text"
          name="email"
          label="email"
          value={inputs.email}
          onChange={handleChange}
          fullWidth
        />
         <p style={{color:'red'}}>{formErrors.email}</p>
        </div>
        <div>
        <TextField
          type="password"
          name="password"
          label="Password"
          value={inputs.password}
          onChange={handleChange}
          fullWidth
        />
        <p style={{color:'red'}}>{formErrors.password}</p>
        </div>
        {/* <TextField
          type="text"
          name="role"
          label="Role"
          value={inputs.role}
          onChange={handleChange}
          fullWidth
        /> */}
        <div>
        <select
          name="role"
          label="Role"
          value={inputs.role}
          onChange={handleChange}
          fullWidth
        >
          <option value={"admin"}>admin</option>
          <option value={"user"}>user</option>
        </select>
        <p style={{color:'red'}}>{formErrors.role}</p>
        </div>
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          color="primary"
          onChange={submitted}
        
        >
          Submit
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </form>
    </React.Fragment>
  );
}

export default Create;