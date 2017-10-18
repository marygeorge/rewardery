import React, { Component } from "react";
import './Parent.css';
import API from "../../utils/API";
import {KidDropDown} from "../../components/KidDropDown/KidDropDown.js";
import {Chore} from "../../components/Chore/Chore.js";
import {AddForm} from "../../components/Chore/AddForm.js";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';

class AddChore extends Component {
    state = {
        date: new Date(),
       
        selectedKidid:"",selectedKidName:"",
        choreName:"",choreDesc:"",chorePoint:"",startdate:"",choretype:"", kidid:0,
        chores:[{taskName:"Do the dishes",RedeemStatus:"undone"},{taskName:"Take out the trash",RedeemStatus:"done"}],
        kids:[]  
    };

    onChange = date => this.setState({ date });

    componentDidMount(){
        API.allKids(sessionStorage.getItem("parentid")).then(res=>{
            console.log(res.data);
            this.setState({kids:res.data});
        });
    };
    
    handleSelectKid=event=>{
        this.setState({kidid:event.target.value});
    };

    handleChange=event=>{
        switch(event.target.id){
            case "choreName":this.setState({choreName:event.target.value});break;
            case "choreDesc":this.setState({choreDesc:event.target.value});break;
            case "selectPointAmount":this.setState({chorePoint:event.target.value});break;
            case "startDate":this.setState({startdate:event.target.value});break;
            case "choreType":this.setState({choretype:event.target.value});break;
        }
    };

    handleDateChange=(event)=>{
        console.log(event.target.value);
    };
    handleSubmit=()=>{
       const chore={
       ParentId:"seccion Id",
       ChildId:"will be provide from dropdown ",
       TaskName:this.state.choreName,
       TaskDescription:this.state.choreDesc,
       TaskPoints:this.state.chorePoint,
       StartDate:this.state.startdate,
       TaskType:this.state.choretype,
       Mandatory:0,
       TaskStatus:"not done"
       };
       console.log(chore);
       API.addChore(chore).then((res)=>{console.log("done")});
    };
    handleKidChange=(event)=>{
       this.setState({selectedKidid:event.target.id});
       this.setState({selectedKidName:event.target.value});
       API.allChildChores(event.target.id).then(res=>console.log("this.setState({chores:res})"));
     };
     handleAddKid=(event)=>{
        console.log("Add kid");
     };
     handleChoreStatus=(event)=>{ 
        const status={newstatus:event.target.value}
     API.setChoreStatus(status).then(res=>console.log(res));
   };
    render() {
    return (
        <div>
        <div className="navbar">
        <div className="row">
        <div className="col-sm-6">
        <img className="logoimg" src = "/assets/logo.png" alt= "logo" />
        <span className="chore">ChoreScore</span>  
        </div>
        <div className="col-sm-6">
         <KidDropDown kids={this.state.kids} handleKidChange={this.handleKidChange}  />
       </div>
        </div>
        </div>
        
        <div className="text-center"> <h2> {this.state.selectedKidName} </h2></div>
       

        <div className="row">
        <div className="col-sm-6 calendar">
        <h2> {this.state.date.toString().substr(0,16)}</h2>
        <div className="calbox">
              
                   <Calendar  onChange={this.onChange}/>
        </div>

        </div>
        <div className="col-sm-6 chore-form">
        <AddForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        </div>
        </div>

        <div className="row">
        <div className="col-sm-10 chore-list">
             {this.state.chores.map(chore=>
             <Chore key={chore.taskName} handleStatus={this.handleChoreStatus}  title={chore.taskName} status={chore.RedeemStatus} />
              )}
            </div>
        <div className="col-sm-2">
            <div className="link-btn text-center">  
                <Link to="/parent" >
                <img className="backMainBtn" 
                src = "/assets/backMainBtn.png" alt="back to main button" /><br/>
                Back To Main
                </Link>
            </div>
        </div>


        </div>

        </div>
);
    }
}

export default AddChore;