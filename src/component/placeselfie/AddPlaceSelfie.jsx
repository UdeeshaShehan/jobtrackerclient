import React, {Component} from 'react';
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Noty from 'noty';
//import DateFnsUtils from "@date-io/date-fns"; // import
//import DatePicker from 'react-datepicker'; 
//import {SingleDatePicker} from 'react-dates';
//import { TimePicker } from 'material-ui-pickers'



class AddPlaceSelfie extends Component {

    constructor(props){
        super(props);
        this.state ={
            jobName:"",
            email:"",
            jobDescription:"",
            dateOfJob: null
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
                <h2 className="text-center">Add a Job</h2>
                <form>
                    <TextField type="text" placeholder="Job Name" fullWidth margin="normal" name="jobName" value={this.state.jobName} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Job Description" fullWidth margin="normal" name="jobDescription" value={this.state.jobDescription} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Mobile Number" fullWidth margin="normal" name="email" value={this.state.mobileNUmber} onChange={this.onChange}/>
                    <TextField type="text" placeholder="Date of Job" fullWidth margin="normal" name="dateOfJob" value={this.state.dateOfJob} onChange={this.onChange}/>
                
                    <Button variant="contained" color="primary" onClick={this.saveSelfie}>Save</Button>
                </form>
            </div>
        );
    }
}

export default AddPlaceSelfie;