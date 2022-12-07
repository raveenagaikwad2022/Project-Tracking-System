import FormDialog from "../../components/FormDialog";
import BugForm from "./BugForm";
import { useActionCardStyles } from "../../styles/muiStyles";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../redux/slices/authSlice";
const BugsActionCard: React.FC<{
  projectId: string;
  filterValue: string;
  setFilterValue: (filterValue: string) => void;
}> = ({ projectId, filterValue, setFilterValue }) => {
  const classes = useActionCardStyles();
  const { user } = useSelector(selectAuthState);
  const showBugPopup = () => {
    if (user?.role !== "developer")
      return (
        <div>
          <div className={classes.flexWrapper}>
            <FormDialog
              triggerBtn={{
                type: "normal",
                text: "Add Bug",
                icon: AddIcon,
                size: "large",
              }}
              title="Add a new bug"
            >
              <BugForm isEditMode={false} projectId={projectId} />
            </FormDialog>
          </div>
        </div>
      );
  };
  return <div>{showBugPopup()}</div>;
};

export default BugsActionCard;
