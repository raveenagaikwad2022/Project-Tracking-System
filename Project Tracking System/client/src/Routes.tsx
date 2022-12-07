import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import OnBoardPage from "./pages/Auth/CreateUserPage";
import ProjectsPage from "./pages/Main/ProjectsPage";
import ProjectDetailsPage from "./pages/Main/ProjectDetailsPage";
import BugDetailsPage from "./pages/Main/BugsDetailsPage";
import { useSelector } from "react-redux";
import { selectAuthState } from "./redux/slices/authSlice";
import storage from "./utils/localStorage";

import { Container, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const Routes = () => {
  const { user } = useSelector(selectAuthState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const isLoggedIn = storage.loadUser() || user;

  return (
    <Container disableGutters={isMobile}>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <ProjectsPage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/projects/:projectId">
          {isLoggedIn ? <ProjectDetailsPage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/projects/:projectId/bugs/:bugId">
          {user ? <BugDetailsPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          {!isLoggedIn ? <LoginPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/onboarduser">
       {isLoggedIn && isLoggedIn.role === "manager" ? (
            <OnBoardPage />
          ) : (
            <Redirect to="/login" />
          )} 
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;
