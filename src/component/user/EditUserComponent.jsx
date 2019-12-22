import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            fullname: '',
            passworde: '',
            repassworde: '',
            address: '',
            mobileNumber: '',
            emaile: '', 
            open:false

        };
        this.updateUser = this.updateUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        console.log('mount');
        this.loadUser();
    }

    componentWillReceiveProps(props) {
        this.setState({open: props.open});
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                console.log(res);
                let user = res.data;
                console.log('user');
                console.log(user);
                this.setState({
                 id: user.id,
                fullname: user.fullname,
                   address: user.address, mobileNumber: user.mobileNumber, emaile: user.email
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    updateUser = (e) => {
        //e.preventDefault();
        let user = {id: this.state.id, password: this.state.passworde, fullname: this.state.fullname, 
            email: this.state.emaile, address: this.state.address, mobileNumber: this.state.mobileNumber};
        console.log(user);
        ApiService.editUser(user)
            .then(res => {
                this.setState({message : 'User update successfully.'});
                //this.props.history.push('/users');
            });
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open} aria-labelledby="form-dialog-title">
                <DialogTitle id="simple-dialog-title">Edit User</DialogTitle>
                <DialogContent>
                <TextField type="text" placeholder="Full Name" fullWidth margin="normal" name="fullname" value={this.state.fullname} onChange={this.onChange}/>
                <TextField type="text" placeholder="Address" fullWidth margin="normal" name="address" value={this.state.address} onChange={this.onChange}/>
                <TextField type="text" placeholder="Mobile Number" fullWidth margin="normal" name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange}/>
                <TextField type="text" placeholder="Email" fullWidth margin="normal" name="emaile" value={this.state.emaile} onChange={this.onChange}/>
                <TextField type="password" placeholder="Password" fullWidth margin="normal" name="passworde" value={this.state.passworde} onChange={this.onChange} autoComplete='off'/>
                <TextField type="password" placeholder="Re-enter Password" fullWidth margin="normal" name="repassword" value={this.state.repassword} onChange={this.onChange}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button variant="contained" color="primary" onClick={this.updateUser}>Update</Button>
                </DialogActions>
                
            </Dialog>
        );
    }
}

/*EditUserComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };*/

export default EditUserComponent;
