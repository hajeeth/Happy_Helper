import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import firebase from "../../../utils/firebase";
import { login } from "../../../store/features/auth/authSlice.js";
import logoPNG from "../../../assets/images/logo.png";
import { useLocation } from "react-router-dom";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: window.innerHeight - 64,
}));



const Form = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.box,
  padding: "32px",
  boxShadow: theme.shadows[1],
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "24px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: "24px",
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: "24px",
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  console.log(from);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate(from);
      }
    });
  }, [navigate]);

  return (
    <Container>
      <img src={logoPNG} alt="logo" style={{ width: "50px", marginBottom: "10px" }} />
      <Form component="form" onSubmit={handleLogin}></Form>
      <Form component="form" onSubmit={handleLogin}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledTextField id="email" label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <StyledTextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton variant="contained" type="submit">
          Login
        </StyledButton>
      </Form>
    </Container>
  );
};

export default Login;
