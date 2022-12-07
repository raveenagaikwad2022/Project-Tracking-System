import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState, logout } from "../redux/slices/authSlice";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  Container,
  Avatar,
  Typography,
} from "@material-ui/core";
import { useNavStyles } from "../styles/muiStyles";
import { useTheme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const NavBar = () => {
  const { user } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const classes = useNavStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  const handleGoBack = () => {
    if (pathname.includes("/bugs")) {
      history.push(`${pathname.slice(0, pathname.indexOf("/bugs"))}`);
    } else {
      history.push("/");
    }
  };

  const mainButton = () => {
    if (["/", "/login", "/signup"].includes(pathname)) {
      return (
        <div className={classes.logoWrapper}>
          <Button
            className={classes.logoBtn}
            component={RouterLink}
            to="/"
            color="secondary"
          >
            Project Tracker
          </Button>
         {!isMobile}
        </div>
      );
    } else {
      return (
        <Button
          startIcon={<ArrowBackIcon />}
          color="secondary"
          onClick={handleGoBack}
          className={classes.backBtn}
        >
          {pathname.includes("/bugs") ? "Project" : "Home"}
        </Button>
      );
    }
  };

  return (
    <Container disableGutters={isMobile} className={classes.container}>
      <AppBar elevation={1} color="inherit" position="static">
        <Toolbar variant="dense" disableGutters={isMobile}>
          <div className={classes.leftPortion}>{mainButton()}</div>
          <div>
            {user ? (
              <div className={classes.btnsWrapper}>
                <div className={classes.userInfo}>
                  <Avatar className={classes.avatar}>
                    {user.username.slice(0, 1)}
                  </Avatar>
                  <Typography color="secondary" variant="body1">
                    {user.username}
                  </Typography>

                  <Typography
                    color="secondary"
                    variant="body1"
                    style={{ marginLeft: "1em" }}
                  >
                    {user.role}
                  </Typography>
                </div>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  className={classes.lastBtn}
                  onClick={handleLogout}
                  startIcon={<PowerSettingsNewIcon />}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  component={RouterLink}
                  to="/login"
                  startIcon={<ExitToAppIcon />}
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default NavBar;
