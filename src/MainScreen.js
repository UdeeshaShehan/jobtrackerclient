import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'

import ListUserComponent from "./component/user/ListUserComponent";
import AddUserComponent from "./component/user/AddUserComponent";
import ListPlaceSelfie from "./component/placeselfie/ListPlaceSelfie";
//import AddPlaceSelfie from "./component/placeselfie/AddPlaceSelfie";
import Loginscreen from './Loginscreen';
import Profile from './component/user/Profile';
import AddPlaceSelfie from './component/placeselfie/AddPlaceSelfie';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [open2, setOpen2]  = React.useState(false);
  /*const handleChanged = event => {
    setAuth(event.target.checked);
  };*/

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen2(false);
  };

  const handleLogout= () =>{
    // var loginPage =[];
    // loginPage.push(<Loginscreen parentContext={this}/>);
    // console.log("log out");
    // props.appContext.setState({loginPage:loginPage,
    //   uploadScreen:[]});
    window.location.reload();
  };

  const handleProfile = ()=>{
    setOpen2(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Job Tracker
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleProfile}>Profile</MenuItem> */}
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Add a User" {...a11yProps(1)} />
          <Tab label="Job Tracker" {...a11yProps(2)} />
          <Tab label="Add a Job" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       <ListUserComponent/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddUserComponent/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ListPlaceSelfie/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddPlaceSelfie/>
      </TabPanel>
      
      <Profile  open={open2} onClose={handleClose} />
    </div>
  );
}