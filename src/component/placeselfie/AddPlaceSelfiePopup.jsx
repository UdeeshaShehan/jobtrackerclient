import React, {Component} from 'react';
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Noty from 'noty'; 

class AddPlaceSelfie extends Component {

    constructor(props){
        super(props);
        this.state ={
            jobName:"",
            email:"",
            jobDescription:"",
            dateOfJob: ""
        }
        this.saveSelfie = this.saveSelfie.bind(this);
    }

    componentDidMount() {
        this.setState({
            jobName: window.localStorage.getItem("jobName"),
            email: window.localStorage.getItem("email"),
            jobDescription: window.localStorage.getItem("jobDescription"),
            dateOfJob: window.localStorage.getItem("dateOfJob"),
        });
    }

    saveSelfie = (e) => {
        e.preventDefault();
    
        let selfie = {jobName: this.state.jobName, jobDescription: this.state.jobDescription,
            dateOfJob: this.state.dateOfJob, email: this.state.email};
        ApiService.addSelfie(selfie)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                setTimeout(function() {  
                new Noty({
                text: 'User added successfully.'
                }).show();
            }, 1000);
            window.localStorage.setItem("jobName","");
            window.localStorage.setItem("email","");
            window.localStorage.setItem("jobDescription","");
            window.localStorage.setItem("dateOfJob","");
            this.clear();
        });
        
        
    }

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value });
    window.localStorage.setItem([e.target.name], e.target.value);
    }

    clear = ()=> {
        this.setState({
            jobName:"",
            email:"",
            jobDescription:"",
            dateOfJob: ""
        });
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Add User</h2>
                <form>
                    <TextField type="text" placeholder="Job Name" fullWidth margin="normal" name="jobName" value={this.state.jobName} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Job Description" fullWidth margin="normal" name="jobDescription" value={this.state.jobDescription} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Date of Job" fullWidth margin="normal" name="dateOfJob" value={this.state.dateOfJob} onChange={this.onChange}/>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.saveSelfie}>Save</Button>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    </DialogActions>
                    
                </form>
            </div>
        );
    }
}

export default AddPlaceSelfie;