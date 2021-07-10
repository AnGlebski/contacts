import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { CopyToClipboardText } from '../../../components/CopyToClipboardText';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
  table: {
  },
});

export const ContactsTable = ({ data }) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper} data-testid="contacts-table-container">
      <Table className={classes.table} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((contact) => (
            <TableRow key={contact.login.uuid}>
              <TableCell component="th" scope="row">
                <Avatar alt="avatar" src={contact.picture.thumbnail} />
              </TableCell>
              <TableCell>{contact.name.title} {contact.name.first} {contact.name.last}</TableCell>
              <TableCell>
              <Typography>{format (parseISO(contact.dob.date), 'ccc, MM/dd/yyyy, pp')}</Typography>
                <Typography>{contact.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.email} /></TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.phone} />
              </TableCell>
              <TableCell>
                <CopyToClipboardText
                  text={`/${contact.location.country}/ ${contact.location.street.number} ${contact.location.city}
			            ${contact.location.street.name}  ${contact.location.postcode}`}
                />
              </TableCell>
              <TableCell>{NATIONALITIES_HUMAN_NAME[contact.nat]}</TableCell>
            </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}></TableRow>
            )}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}
