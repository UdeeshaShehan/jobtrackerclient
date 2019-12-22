import React , {Component} from 'react';
import AddUserComponent from './AddUserComponent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ApiService from "../../service/ApiService";
import Noty from 'noty'; 

class AddUserPopupComponent extends Component {

    constructor(props) {
        super(props);
        this.state ={
            fullname: '',
            passworda: '',
            address: '',
            mobileNumber: '',
            emaila: '',
            repassword:'',
            open:false
        }
        this.saveUser = this.saveUser.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //     fullname: window.localStorage.getItem("fullname"),
        //     passworda: window.localStorage.getItem("passworda"),
        //     address: window.localStorage.getItem("address"),
        //     mobileNumber: window.localStorage.getItem("mobileNumber"),
        //     emaila: window.localStorage.getItem("emaila"),
        //     repassword:window.localStorage.getItem("repassword")
        // });
        this.clear();
    }

    componentWillReceiveProps(props) {
        this.setState({open: props.open});
    }

    handleClose = () => {
        this.setState({open: false});
    };

    saveUser = (e) => {
        e.preventDefault();
        if(this.state.passworda != this.state.repassword) {
            setTimeout(function() {  
                new Noty({
                text: 'Password and reEntered password is not equal'
                }).show();
            }, 1000);
        } else {
            let user = {fullname: this.state.fullname, password: this.state.passworda,
                address: this.state.address, mobileNumber: this.state.mobileNumber, email: this.state.emaila};
             ApiService.addUser(user)
                 .then(res => {
                     this.setState({message : 'User added successfully.'});
                     setTimeout(function() {  
                        new Noty({
                        text: 'User added successfully.'
                        }).show();
                    }, 1000);
                    window.localStorage.setItem("fullname","");
                    window.localStorage.setItem("passworda","");
                    window.localStorage.setItem("address","");
                    window.localStorage.setItem("mobileNumber","");
                    window.localStorage.setItem("emaila", "");
                    window.localStorage.setItem("repassword","");
                    this.clear();
                 });
        }
    }

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value });
    window.localStorage.setItem([e.target.name], e.target.value);
    }

    clear = ()=> {
        this.setState({
            fullname: '',
            passworda: '',
            address: '',
            mobileNumber: '',
            emaila: '',
            repassword:''
        });
    }

    render() {
        return(
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open} 
            aria-labelledby="form-dialog-title">
                <DialogTitle id="simple-dialog-title">Add User</DialogTitle>
                <DialogContent>
                <TextField type="text" placeholder="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>
            
                    <TextField type="text" placeholder="Full Name" fullWidth margin="normal" name="fullname" value={this.state.fullname} onChange={this.onChange}/>
                    <TextField type="password" placeholder="Password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
                    <TextField type="password" placeholder="Re-enter Password" fullWidth margin="normal" name="repassword" value={this.state.repassword} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Address" fullWidth margin="normal" name="address" value={this.state.address} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Mobile Number" fullWidth margin="normal" name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange}/>
                        </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddUserPopupComponent;