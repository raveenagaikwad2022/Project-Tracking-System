import { useSelector } from "react-redux";
import { selectProjectsState } from "../../redux/slices/projectsSlice";
import ProjectsTable from "./ProjectsTable";
import ProjectActionCard from "./ProjectsActionCard";
import { Paper } from "@material-ui/core";
import { useMainPageStyles } from "../../styles/muiStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProjectsPage = () => {
  const classes = useMainPageStyles();
  const { projects, fetchStatus, fetchError } =
    useSelector(selectProjectsState);

  const filteredSortedProjects = projects;

  const projectsDataToDisplay = () => {
    if (fetchStatus === "loading") {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "9em",
          }}
        >
          <CircularProgress disableShrink size={80} />
        </div>
      );
    } else if (fetchStatus === "succeeded" && projects.length === 0) {
      return <div>No Projects added yet.</div>;
    } else if (fetchStatus === "failed" && fetchError) {
      return <div>{`Error: ${fetchError}`}</div>;
    } else if (
      fetchStatus === "succeeded" &&
      projects.length !== 0 &&
      filteredSortedProjects.length === 0
    ) {
      return <div>No matches found.</div>;
    } else {
      return (
        <div className={classes.projectsListTable}>
          {<ProjectsTable projects={filteredSortedProjects} />}
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.projectsPaper}>
        <ProjectActionCard />
        {projectsDataToDisplay()}
      </Paper>
    </div>
  );
};

export default ProjectsPage;
