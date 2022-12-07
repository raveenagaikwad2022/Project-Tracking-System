import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBugsByProjectId,
  selectBugsByProjectId,
  selectBugsState,
} from "../../redux/slices/bugsSlice";
import { RootState } from "../../redux/store";
import BugsTable from "./BugsTable";
import BugsActionCard from "./BugsActionCard";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Paper, Typography } from "@material-ui/core";
import { useMainPageStyles } from "../../styles/muiStyles";
import BugReportOutlinedIcon from "@material-ui/icons/BugReportOutlined";

const BugsCard: React.FC<{ projectId: string; isMobile: boolean }> = ({
  projectId,
  isMobile,
}) => {
  const classes = useMainPageStyles();
  const dispatch = useDispatch();
  const bugs = useSelector((state: RootState) =>
    selectBugsByProjectId(state, projectId)
  );
  const { fetchLoading, fetchError } = useSelector(selectBugsState);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (!bugs) {
      dispatch(fetchBugsByProjectId(projectId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSortedBugs = bugs;

  const bugsDataToDisplay = () => {
    if (fetchLoading) {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "4em",
          }}
        >
          <CircularProgress disableShrink size={80} />
        </div>
      );
    } else if (fetchError) {
      return <div>{`Error: ${fetchError}`}</div>;
    } else if (!bugs || bugs.length === 0) {
      return <div>No Bugs added yet.</div>;
    } else {
      return <div>{<BugsTable bugs={filteredSortedBugs} />}</div>;
    }
  };

  return (
    <Paper className={classes.bugsPaper}>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        color="secondary"
        className={classes.flexHeader}
      >
        <BugReportOutlinedIcon
          fontSize={isMobile ? "default" : "large"}
          style={{ marginRight: "0.2em" }}
        />
        Bugs
      </Typography>
      <div className={classes.bugsActionCard}>
        <BugsActionCard
          projectId={projectId}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </div>
      {bugsDataToDisplay()}
    </Paper>
  );
};

export default BugsCard;
