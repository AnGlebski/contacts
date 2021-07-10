import { useState, useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useContacts } from './useContacts';
import { ContactsTable } from './ContactsTable';
import { ToggleDataViewMode } from './ToggleDataViewMode';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { DATA_VIEW_MODE } from './constants';
import { useDataViewMode } from './useDataViewMode';
import { ContactsFilters } from './ContactsFilters';
import { ContactsGrid } from './ContactsGrid';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headConteiner: {
      marginBottom: theme.spacing(3),
    },
    filtersConteiner: {
      marginBottom: theme.spacing(3),
    }
  })
);

const FiltersDefaultValue = {
  fullname: "",
  gender: "all",
  nationality: "all",
};

const filterByFullname = ({ first, last }, fullname) =>
  first?.toLowerCase().includes(fullname.toLowerCase()) ||
  last?.toLowerCase().includes(fullname.toLowerCase());

const filterByGender = (value, gender) => {
  if (gender === "all") {
    return true;
  }
  return value === gender;
};

const filterByNationality = (value, nationality) => {
  if (nationality === "all") {
    return true;
  }
  return value === nationality;
};

export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  const [filters, setFilters] = useState(FiltersDefaultValue);


  const updateFilter = useCallback((name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(FiltersDefaultValue)
  }, [])

  const filteredContacts = contacts.data
  .filter((contact) =>
    filterByFullname(contact.name, filters.fullname))
  .filter((contact) =>
    filterByGender(contact.gender, filters.gender))
  .filter((contact) =>
    filterByNationality(contact.nat, filters.nationality));

  return (
    <Container className={classes.root}>
      <Grid container>
      <Grid item xs={12} className={classes.headConteiner}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h1">
              Contacts
            </Typography>
            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode} />
          </Box>
        </Grid>

        <Grid item xs={12} className={classes.filtersConteiner}>
          <ContactsFilters
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters} />
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress data-testid="contacts-loader" />;
            }
            if (contacts.isError) {
              return <div data-testid="contacts-error">...error...</div>;
            }
            if (dataViewMode === DATA_VIEW_MODE.TABLE) {
              return <ContactsTable data={filteredContacts} />
            }
            if (dataViewMode === DATA_VIEW_MODE.GRID) {
              return <ContactsGrid data={filteredContacts} />
            }
            return null;
          })()}
        </Grid>

      </Grid>
    </Container>
  )

}
