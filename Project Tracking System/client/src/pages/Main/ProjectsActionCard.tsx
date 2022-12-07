import FormDialog from "../../components/FormDialog";
import ProjectForm from "./ProjectForm";
import { Typography } from "@material-ui/core";
import { selectAuthState } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";

import AddIcon from "@material-ui/icons/Add";

const ProjectsActionCard = () => {
  const { user } = useSelector(selectAuthState);

  const showAddProjectButton = () => {
    if (user?.role === "manager") {
      return (
        <FormDialog
          triggerBtn={{
            type: "normal",
            text: "Add Project",
            icon: AddIcon,
            size: "large",
          }}
          title="Add a new project"
        >
          <ProjectForm editMode={null} />
        </FormDialog>
      );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1em" }}>
        <Typography variant={"h5"} color="secondary">
          All Projects
        </Typography>
        <Typography variant={"subtitle1"} color="secondary">
          List of all the created or joined projects.
        </Typography>
      </div>
      {showAddProjectButton()}
    </div>
  );
};

export default ProjectsActionCard;
