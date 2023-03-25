import { Box, Typography, TextField, Button } from "@mui/material";

const Auth = () => {
  return (
    <div>
      <form>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadious={5}
          boxShadow={"5px 5px 10px #ccc"} sx={{":hover" : {boxShadow: "10px 10px 20px #7733dd", }, }}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            Login
          </Typography>
          <TextField type={"text"} placeholder="First Name" name="firstname" variant="outlined" />
          <TextField type={"text"} placeholder="Last Name" name="lasttname" variant="outlined" />
          <TextField type={"email"} placeholder="Email" name="email" variant="outlined" />
          <TextField type={"password"} placeholder="Password" name="password" variant="outlined" />
          <Button type="submit" sx={{ marginTop: 3, borderRadious: 3}} variant="contained" color="warning">Login</Button>
          <Button sx={{ marginTop: 3, borderRadious: 3}}>Change to Sign Up</Button>

        </Box>
      </form>
    </div>
  );
};

export default Auth;
