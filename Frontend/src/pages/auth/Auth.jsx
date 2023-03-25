import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [signUp, setSignUp] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialValues);

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
    //getUser()
    setUser(initialValues);
  };

  const resetState = () => {
    setSignUp(!signUp);
    setUser(initialValues);
  };

  const registerUser = async () => {
    try {
      const newUser = await axios.post("http://localhost:4000/user", user);
      if (newUser.data.success) {
        alert(newUser.data.message)
        console.log(newUser.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //const getUser = async() => {
    //const newUser = await axios.get("http://localhost:4000/user", user);
    //console.log(newUser.data)
  //}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderradious={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{ ":hover": { boxShadow: "10px 10px 20px #7733dd" } }}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            {signUp ? "Sign Up" : "Log in"}
          </Typography>
          {signUp && (
            <TextField
              onChange={handleChange}
              type={"text"}
              placeholder="First Name"
              name="firstname"
              variant="outlined"
              value={user.firstname}
            />
          )}
          {signUp && (
            <TextField
              onChange={handleChange}
              type={"text"}
              placeholder="Last Name"
              name="lastname"
              variant="outlined"
              value={user.lastname}
            />
          )}
          <TextField
            onChange={handleChange}
            type={"email"}
            placeholder="Email"
            name="email"
            variant="outlined"
            value={user.email}
          />
          <TextField
            onChange={handleChange}
            type={"password"}
            placeholder="Password"
            name="password"
            variant="outlined"
            value={user.password}
          />
          <Button
            type="submit"
            sx={{ marginTop: 3, borderradious: 3 }}
            variant="contained"
            color="warning"
          >
            {signUp ? "Sign Up" : "Log In"}
          </Button>
          <Button onClick={resetState} sx={{ marginTop: 3, borderradious: 3 }}>
            {!signUp ? "Change to Sign Up" : "Change to Login"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
