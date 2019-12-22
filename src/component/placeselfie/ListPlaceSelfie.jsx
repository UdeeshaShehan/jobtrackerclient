import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import {SingleDatePicker} from 'react-dates';

//import Icon from './icon';

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

class ListPlaceSelfie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeselfies: [],
            message: null,
            jobName:"",
            mobileNumber:"",
            beginDate:"",
            endDate:"",
            date: null,
      focused: null

        }
        this.reloadSelfieList = this.reloadSelfieList.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        this.reloadSelfieList();
    }
    
    componentDidMount() {
        this.reloadSelfieList();
    }

    reloadSelfieList() {
        ApiService.fetchAllSelfie({jobName:this.state.jobName,
        email:this.state.email,
        jobDescription:this.state.jobDescription})
            .then((res) => {
                this.setState({placeselfies: res.data})
            });
    }

    expoertcsv = ()=>{

    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
             <Paper ><h2 className="text-center">Job details</h2></Paper>
                <Grid container spacing={3}>
                    
                    <Grid item xs={3}>
                    
                        <TextField type="text" placeholder="Job Name" fullWidth margin="normal" 
                        name="jobName" value={this.state.jobName} onChange={this.onChange}/>
                    
                    </Grid>
                    <Grid item xs={3}>
                    
                        <TextField type="text" placeholder="Phone Number" fullWidth margin="normal" 
                        name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange}/>
                    
                    </Grid>
                    <Grid item xs={3}>
                   
                        <TextField type="text" placeholder="First Selfie Date From" fullWidth margin="normal"
                         name="beginDate" value={this.state.beginDate} onChange={this.onChange}/>
                       
                    
                    </Grid>
                    <Grid item xs={3}>
                    
                        <TextField type="text" placeholder="First Selfie Date To" fullWidth margin="normal" 
                        name="endDate" value={this.state.endDate} onChange={this.onChange}/>
                    
                    </Grid>

                    <Grid item xs={1}>
                    <Button variant="contained" color="primary" onClick ={this.search} >Search</Button>
                    </Grid>
                    <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick ={this.expoertcsv} >Export CSV</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip title="Add A Job" aria-label="add">
                            <Fab color="primary" aria-label="add" onClick = {this.openadd}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Divider />
                <Paper >Job tracker List</Paper>
                <Divider />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >Job Name</TableCell>
                        <TableCell>Job Description</TableCell>
                        <TableCell>Date Of Job</TableCell>
                        <TableCell>First Selfies</TableCell>
                        <TableCell>Latitude 1</TableCell>
                        <TableCell>Longitude 1</TableCell>
                        <TableCell>First Selfie Date</TableCell>
                        <TableCell>Last Selfie</TableCell>
                        <TableCell>Latitude 2</TableCell>
                        <TableCell>Longitude 2</TableCell>
                        <TableCell>Last Selfie Date</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.state.placeselfies.map(
                    selfie =>
                            <TableRow key={selfie.id}>
                                <TableCell>{selfie.jobName}</TableCell>
                                <TableCell>{selfie.jobDescription}</TableCell>
                                <TableCell>{selfie.dateOfJob}</TableCell>
                                <TableCell>{selfie.firstSelfie ? <img source={{uri: 'data:image/png;base64,' + selfie.lastSelfie}}/> : ''}</TableCell> 
                                <TableCell>{selfie.firstLocation ?selfie.firstLocation.latitude: ''}</TableCell>
                                <TableCell>{selfie.firstLocation ?selfie.firstLocation.longitude: ''}</TableCell>
                                <TableCell>{selfie.firstSelfieDate}</TableCell>
                                <TableCell>{selfie.lastSelfie ? <img src={`data:image/png;base64,${selfie.lastSelfie}}`}/> : ''}</TableCell>
                                <TableCell>{selfie.lastLocation ?selfie.lastLocation.latitude: ''}</TableCell>
                                <TableCell>{selfie.lastLocation ?selfie.lastLocation.longitude: ''}</TableCell>
                                <TableCell>{selfie.lastSelfieDate}</TableCell>
                                <TableCell>{selfie.email}</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>

        );
    }
}

export default ListPlaceSelfie;