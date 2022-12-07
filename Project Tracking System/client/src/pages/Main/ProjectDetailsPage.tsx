import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectById,
  deleteProject,
} from "../../redux/slices/projectsSlice";
import { selectAuthState } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import ProjectForm from "./ProjectForm";
import BugsCard from "./BugsCard";
import ConfirmDialog from "../../components/ConfirmDialog";
import FormDialog from "../../components/FormDialog";
import { formatDateTime } from "../../utils/helperFuncs";

import { Paper, Typography, Divider, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useMainPageStyles } from "../../styles/muiStyles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";

interface ParamTypes {
  projectId: string;
}

const ProjectDetailsPage = () => {
  const classes = useMainPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { projectId } = useParams<ParamTypes>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthState);
  const projectInState = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  if (!projectInState) {
    return (
      <div className={classes.root}>
        <Paper className={classes.notFoundPaper}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.error404Text}
            style={{ marginTop: "5em" }}
          >
            404: Project Not Found!
          </Typography>
        </Paper>
      </div>
    );
  }

  const { id, name, members, createdAt, updatedAt, createdBy } = projectInState;

  const isAdmin = createdBy.id === user?.id;
  const isProjectManager = user?.role === "team_leader";

  const handleDeleteProject = () => {
    dispatch(deleteProject(id, history));
  };

  const adminBtns = () => {
    if (!isAdmin && !isProjectManager) return null;

    return (
      <>
        <FormDialog
          triggerBtn={{
            type: isMobile ? "round" : "normal",
            text: "Add Members",
            icon: GroupAddOutlinedIcon,
            style: { marginRight: "1em" },
          }}
          title="Add members to project"
        >
          <ProjectForm
            editMode="members"
            currentMembers={members.map((m) => m.member.id)}
            projectId={id}
          />
        </FormDialog>
        <ConfirmDialog
          title="Confirm Delete Project"
          contentText="Are you sure you want to permanently delete your project?"
          actionBtnText="Delete Project"
          triggerBtn={{
            type: isMobile ? "round" : "normal",
            text: "Delete Project",
            icon: DeleteOutlineIcon,
          }}
          actionFunc={handleDeleteProject}
        />
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.detailsHeader}>
        <div className={classes.flexHeader}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            color="secondary"
            style={{ marginRight: "0.2em" }}
          >
            <strong>{name}</strong>
          </Typography>
          {isAdmin && (
            <FormDialog
              triggerBtn={{ type: "icon", icon: EditIcon, size: "small" }}
              title="Edit the project name"
            >
              <ProjectForm editMode="name" currentName={name} projectId={id} />
            </FormDialog>
          )}
        </div>
        <Divider style={{ margin: "0.5em 0" }} />
        <Typography variant="subtitle2" color="secondary">
          Created At: <em>{formatDateTime(createdAt)}</em>
        </Typography>
        {createdAt !== updatedAt && (
          <Typography variant="subtitle2" color="secondary">
            Updated At: <em>{formatDateTime(updatedAt)}</em>
          </Typography>
        )}
        <div className={classes.btnsWrapper}>{adminBtns()}</div>
      </Paper>
      <BugsCard projectId={projectId} isMobile={isMobile} />
    </div>
  );
};

export default ProjectDetailsPage;
