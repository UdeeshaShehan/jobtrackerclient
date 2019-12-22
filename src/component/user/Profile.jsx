import React, {Component} from 'react';
import ApiService from "../../service/ApiService";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class Profile extends Component{

    constructor(props) {
        super(props);
        this.state ={
            id: '',
            fullname: '',
            password: '',
            address: '',
            mobileNumber: '',
            email: '',
            open:false
        }
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                let user = res.data;
                this.setState({
                id: user.id,
                fullname: this.state.fullname, password: this.state.password,
                   address: this.state.address, mobileNumber: this.state.mobileNumber, email: this.state.email
                })
            });
    }

    updateProfile() {}

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return(
            <div>
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open} aria-labelledby="form-dialog-title">
                <DialogTitle id="simple-dialog-title">Profile</DialogTitle>
                <DialogContent>
                    <TextField type="text" placeholder="Full Name" fullWidth margin="normal" name="fullname" value={this.state.fullname} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Address" fullWidth margin="normal" name="address" value={this.state.address} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Mobile Number" fullWidth margin="normal" name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    <Button variant="contained" color="primary" onClick={this.updateProfile}>Update</Button>
                </DialogActions>
                
            </Dialog>   
            </div>
        );
    }
}

export default Profile;