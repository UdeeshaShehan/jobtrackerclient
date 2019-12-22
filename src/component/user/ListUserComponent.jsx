import React, { Component } from 'react'
import './ListUser.css';
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import AddUserPopupComponent from './AddUserPopupComponent';
import Profile from './Profile';
import EditUserComponent from './EditUserComponent';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
            show: true,
            open:false, 
            selectedValue:"",
            open2:false,
            fullname:"",
            email:"",
            mobileNumber:"",
            address:""

        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.searchUser = this.searchUser.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
        console.log(this.state.show);
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() { 
        ApiService.fetchUsers({fullname:this.state.fullname,
        email:this.state.email,
        mobileNumber:this.state.mobileNumber,
        address:this.state.address})
            .then((res) => {
                this.setState({users: res.data})
            });
    }

    deleteUser(userId) {
        this.setState({open : false, open2:false});
        ApiService.deleteUser(userId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })

    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        console.log(id);
        //this.props.history.push('/edit-user');
        this.setState({open : true, open2:false});
    }

    addUser() {
        window.localStorage.removeItem("userId");
        //this.props.history.push('/add-user');
    }

    searchUser() {
        this.reloadUserList();
    }

    handleClose = value => {
        this.setState({open : false});
        this.setState({open2 : false });
      };

    openadd = ()=>{
        console.log("add");
        this.setState({open2 : true, open:false });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value, open:false, open2:false });

    render() {
        return (
            <div>
                <Paper ><h2 className="text-center">User Details</h2></Paper>
                <Grid container spacing={3}>
                    
                    <Grid item xs={3}>
                    
                        <TextField type="text" placeholder="Full Name" fullWidth margin="normal" 
                        name="fullname" value={this.state.fullname} onChange={this.onChange}/>
                    
                    </Grid>
                    <Grid item xs={3}>
                    
                        <TextField type="text" placeholder="Email" fullWidth margin="normal" 
                        name="email" value={this.state.email} onChange={this.onChange}/>
                    
                    </Grid>
                    <Grid item xs={3}>
                   
                        <TextField type="text" placeholder="Mobile Number" fullWidth margin="normal"
                         name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange}/>
                    
                    </Grid>
                    <Grid item xs={3}>
                    
                        <TextField type="text" placeholder="Address" fullWidth margin="normal" 
                        name="address" value={this.state.address} onChange={this.onChange}/>
                    
                    </Grid>

                    <Grid item xs={1}>
                    <Button variant="contained" color="primary" onClick={this.searchUser} >Search</Button>
                    </Grid>
                   
                </Grid>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                <Tooltip title="Add a User" aria-label="add">
                <Fab color="primary" aria-label="add" onClick = {this.openadd}>
                <AddIcon />
                </Fab>
                </Tooltip>
            
                </Grid>
                </Grid>
                <Divider />
                <Paper >User List</Paper>
                <Divider />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="hidden-xs" >Id</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Mobile Number</TableCell>
                            <TableCell align="right">User Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.fullname}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.mobileNumber}</TableCell>
                                <TableCell align="right">{row.role}</TableCell>
                                <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                <EditUserComponent selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} />
                <AddUserPopupComponent  open={this.state.open2} onClose={this.handleClose} />
            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

ListUserComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
//const SimpleModalWrapped = withStyles(styles)(ListUserComponent);
export default ListUserComponent;
