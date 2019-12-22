import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Noty from 'noty';  
//import "../../node_modules/noty/lib/noty.css";  
//import "../../node_modules/noty/lib/themes/mint.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            fullname: '',
            passworda: '',
            address: '',
            mobileNumber: '',
            emaila: '',
            repassword:'',
            mentorMobileNumber:'',
            role:''
        }
        this.saveUser = this.saveUser.bind(this);
    }

    componentDidMount() {
        this.setState({
            fullname: window.localStorage.getItem("fullname"),
            passworda: window.localStorage.getItem("passworda"),
            address: window.localStorage.getItem("address"),
            mobileNumber: window.localStorage.getItem("mobileNumber"),
            emaila: window.localStorage.getItem("emaila"),
            repassword: window.localStorage.getItem("repassword"),
            mentorMobileNumber: window.localStorage.getItem("mentorMobileNumber"),
            role:window.localStorage.getItem("role")
        });
    }

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
                    window.localStorage.setItem("mentorMobileNumber","");
                    window.localStorage.setItem("role","");
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
            repassword:'',
            mentorMobileNumber:''
        });
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Add User</h2>
                <form>
                <TextField type="text" placeholder="Full Name" fullWidth margin="normal" name="fullname" value={this.state.fullname} onChange={this.onChange}/>
                <TextField type="password" placeholder="Password" fullWidth margin="normal" name="passworda" value={this.state.password} onChange={this.onChange} autoComplete='off'/>
                <TextField type="password" placeholder="Re-enter Password" fullWidth margin="normal" name="repassword" value={this.state.repassword} onChange={this.onChange}/>
                <TextField type="text" placeholder="Address" fullWidth margin="normal" name="address" value={this.state.address} onChange={this.onChange}/>
                <TextField type="text" placeholder="Mobile Number" fullWidth margin="normal" name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange}/>
                <TextField type="text" placeholder="Email" fullWidth margin="normal" name="emaila" value={this.state.emaila} onChange={this.onChange}/>
                <TextField type="text" placeholder="Mentor Mobile Number" fullWidth margin="normal" name="mentorMobileNumber" value={this.state.mentorMobileNumber} onChange={this.onChange}/>
                <InputLabel  >Role</InputLabel>
                <Select type="text" placeholder="Role" fullWidth margin="normal" name="role" value={this.state.role} onChange={this.onChange}>
                    <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                    <MenuItem value={'USER'}>USER</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
            </form>
    </div>
        );
    }
}

export default AddUserComponent;
