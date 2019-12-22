import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import MainScreen from './MainScreen';
import Noty from 'noty';  

import CommonDataManager from './component/utility/CommonDataManager';
//import "../node_modules/noty/lib/noty.css";  
//import "../node_modules/noty/lib/themes/mint.css";

class Login extends Component {

constructor(props){
  super(props);
  this.state={
  mobileNumber:'',
  password:''
  }
 }

 handleClick(event){
    //var apiBaseUrl = "http://ec2-18-140-67-5.ap-southeast-1.compute.amazonaws.com:8080";
    var apiBaseUrl = 'http://localhost:8080'
    var self = this;
    var payload={
        "mobileNumber":this.state.mobileNumber,
        "password":this.state.password
    }
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
      }
    axios.post(apiBaseUrl+'/api/auth/login', payload, config)
    .then(function (response) {
        console.log(response);
        if(response.status == 200){
            console.log("Login successfull");
            var uploadScreen=[];
            uploadScreen.push(<MainScreen appContext={self.props.appContext}/>);
            self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen});
            this.setState({"mobileNumber":"","password":""});
            setTimeout(function() {  
              new Noty({
                text: 'Login suceess!'
              }).show();
            }, 1000);
        }else{
            console.log("Username does not exists");
            setTimeout(function() {  
              new Noty({
                text: 'Your Email or Password is incorrect. Please try again!'
              }).show();
            }, 1000); 
        }
    }).catch(function (error) {
        console.log( error + "  " + error.response);
    });
}
 
render(){
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Mobile Number"
             floatingLabelText="Mobile Number"
             onChange = {(event,newValue) => this.setState({mobileNumber:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );}
  
}
const style = {
 margin: 15,
};
export default Login;