import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  clearAuthError,
  selectAuthState,
} from "../../redux/slices/authSlice";
import { Alert, AlertTitle } from "@material-ui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
} from "@material-ui/core";
import { useAuthPageStyles } from "../../styles/muiStyles";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface InputValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const LoginPage = () => {
  const classes = useAuthPageStyles();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuthState);
  const [showPass, setShowPass] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = ({ username, password }: InputValues) => {
    dispatch(login({ username, password }));
  };

  return (
    <div>
      <Paper className={classes.root} elevation={2}>
        <form onSubmit={handleSubmit(handleLogin)} className={classes.form}>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="username"
              type="text"
              label="Username"
              variant="outlined"
              error={"username" in errors}
              helperText={"username" in errors ? errors.username.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="password"
              type={showPass ? "text" : "password"}
              label="Password"
              variant="outlined"
              error={"password" in errors}
              helperText={"password" in errors ? errors.password.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass((prevState) => !prevState)}
                      size="small"
                    >
                      {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ExitToAppIcon />}
            type="submit"
            className={classes.submitButton}
            disabled={loading}
          >
            Log In
          </Button>
        </form>

        {error && (
          <div
            style={{ width: "100%", marginTop: "0.8em", marginBottom: "0.8em" }}
          >
            <Alert severity="error" onClose={() => dispatch(clearAuthError())}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default LoginPage;
