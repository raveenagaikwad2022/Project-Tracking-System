import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ProjectState } from '../../redux/types';
import { formatDateTime, truncateString } from '../../utils/helperFuncs';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Paper,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';

const tableHeaders = ['Name', 'Bugs', 'Members', 'Manager', 'Added'];

const ProjectsTable: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useTableStyles();
  const history = useHistory();

  return (
    <Paper className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((t) => (
              <TableCell key={t} align="center">
                {t}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((p) => (
            <TableRow key={p.id}>
              <TableCell
                onClick={() => history.push(`/projects/${p.id}`)}
                className={classes.clickableCell}
                align="center"
              >
                <Link
                  component={RouterLink}
                  to={`/projects/${p.id}`}
                  color="secondary"
                >
                  {truncateString(p.name, 30)}
                </Link>
              </TableCell>
              <TableCell align="center">{p.bugs.length}</TableCell>
              <TableCell align="center">{p.members.length}</TableCell>
              <TableCell align="center">{p.createdBy.username}</TableCell>
              <TableCell align="center">
                {formatDateTime(p.createdAt)}
              </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProjectsTable;
