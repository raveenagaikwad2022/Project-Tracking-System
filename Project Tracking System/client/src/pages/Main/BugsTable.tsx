import React from 'react';
import { BugState } from '../../redux/types';
import BugsMenu from './BugsMenu';
import { formatDateTime } from '../../utils/helperFuncs';
import { priorityStyles, statusStyles } from '../../styles/customStyles';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,  
  Paper,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';

const tableHeaders = [
  'Title',
  'Priority',
  'Status',
  'Added',
  'Updated',  
  'Actions',
];

const BugsTable: React.FC<{ bugs: BugState[] }> = ({ bugs }) => {
  const classes = useTableStyles();
  

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
          {bugs.map((b) => (
            <TableRow key={b.id}>
              <TableCell
                align="center"                 
              >                
                  {b.title}                
              </TableCell>
              <TableCell align="center">
                <div
                  style={{
                    ...priorityStyles(b.priority),
                    textTransform: 'capitalize',
                    margin: '0 auto',
                  }}
                >
                  {b.priority}
                </div>
              </TableCell>
              <TableCell align="center">
                <div
                  style={{
                    ...statusStyles(b.isResolved),
                    margin: '0 auto',
                  }}
                >
                  {b.isResolved ? 'Closed' : 'Open'}
                </div>
              </TableCell>
              <TableCell align="center">
                {formatDateTime(b.createdAt)} ~ {b.createdBy.username}
              </TableCell>
              <TableCell align="center">
                {!b.updatedAt || !b.updatedBy
                  ? 'n/a'
                  : `${formatDateTime(b.updatedAt)} ~ ${b.updatedBy.username}`}
              </TableCell>              
              <TableCell align="center">              
                <BugsMenu                
                  projectId={b.projectId}
                  bugId={b.id}
                  currentData={{
                    title: b.title,
                    description: b.description,
                    priority: b.priority,
                  }}
                  isResolved={b.isResolved}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BugsTable;
