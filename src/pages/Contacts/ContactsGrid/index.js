import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { CopyToClipboardText } from '../../../components/CopyToClipboardText';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 270,
  },
  card: {
    whiteSpace: "pre-line",
    minHeight: theme.spacing(2),
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "0 auto",
  },
  nat: {
    textTransform: "none",
    minWidth: theme.spacing(15) },
}));

export const ContactsGrid = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.card}
      data-testid="contacts-grid-container"
    >
      {data.map((contact) => (
        <Grid item xs={12} lg={3} sm={6} key={contact.login.uuid}>
          <Card variant="outlined" className={classes.root}>
            <CardContent>
              <Avatar src={contact.picture.thumbnail} className={classes.avatar} variant="circular" />
              <Typography> {contact.name.title} {contact.name.first} {contact.name.last}</Typography>
              <Button
                className={classes.nat}
              >
                {NATIONALITIES_HUMAN_NAME[contact.nat]}
              </Button>
              <Typography>
                {format (parseISO(contact.dob.date),
                'ccc, MM/dd/yyyy, pp')}
              </Typography>
              <Typography>{contact.dob.age} years</Typography>
              <Typography>
                <CopyToClipboardText text={contact.email} />{" "}
              </Typography>
              <CopyToClipboardText text={contact.phone} />
              <Typography>
                <CopyToClipboardText
                  text={`/${contact.location.country}/
			            ${contact.location.street.name} ${contact.location.street.number}`}
                />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
