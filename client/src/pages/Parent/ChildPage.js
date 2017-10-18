import React, { Component } from "react";
import './Parent.css';
import API from "../../utils/API";
import {KidDropDown} from "../../components/KidDropDown/KidDropDown.js";
// import {Child} from "../../components/Child/Child.js"
import {Chore} from "../../components/Chore/Chore.js"
// import {Reward} from "../../components/Reward/Reward.js"
import {Popup} from "../../components/Popup/Popup.js"
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import {AddForm} from "../../components/Chore/AddForm.js";



class ChildPage extends Component {
    state = {
        selDate: new Date(),
        selectedKidid:0,
        selectedKidName:"",
        addKidName:"",
        addKidUser:"",
        addKidPass:"",
        chores:[],
        kids:[]
    };



    componentDidMount(){
        // not a good idea to pass id in query string. Need to find a better way
        console.log("new date"+new Date());
        this.setChild();
        this.loadKids();
        this.loadChores(new Date());
    };

    setChild=()=>{
        this.setState({selectedKidid:sessionStorage.getItem("selectedChildId")});
        API.getChild(sessionStorage.getItem("selectedChildId")).then(res=>{
            console.log(res);
             this.setState({selectedKidName:res.data.ChildName});
        });
    };

    loadKids=()=>{
        API.allKids(sessionStorage.getItem("parentid")).then(res=>{
            this.setState({kids:res.data});
        });
    };

    loadChores=(date)=>{
        const year = date.getFullYear();
        const month =date.getMonth()+1;
        const day = date.getDate();
        const dateString = `${year}-${month}-${day}`; 
        console.log(dateString);
        API.getChildChores(sessionStorage.getItem("selectedChildId"),dateString).then(res=>{
            console.log(res);
            this.setState({chores:res.data});
        });
    }

    onChange = date => {
        this.setState({selDate: date });
        this.setState({startdate:date});
        this.loadChores(date);
    };

    
    handleChange=event=>{
        switch(event.target.id){
            case "kidName":this.setState({addKidName:event.target.value});break;
            case "kidUser":this.setState({addKidUser:event.target.value});break;
            case "kidPass":this.setState({addKidPass:event.target.value});break;
            case "choreName":this.setState({choreName:event.target.value});break;
            case "choreDesc":this.setState({choreDesc:event.target.value});break;
            case "selectPointAmount":this.setState({chorePoint:event.target.value});break;
            case "startDate":this.setState({startdate:event.target.value});break;
            case "choreType":this.setState({choretype:event.target.value});break;
        }
    };
    handleAddKid=()=>{
          console.log("Add kid");
        const kid={
            childName:this.state.addKidName,
            childUsername:this.state.addKidUser,
            childPassword:this.state.addKidPass,
            parentid:sessionStorage.getItem("parentid")
        }
        console.log(kid);
        API.addKid(kid).then(res=>{
            this.loadKids();
            console.log("kid added")
        });
    };
    handleKidChange=(event)=>{
        this.setState({selectedKidid:event.target.id});
        this.setState({selectedKidName:event.target.value});
        sessionStorage.setItem("selectedChildId", event.target.id);
        window.location='/parent/ChildPage';
     };
   
    handleSubmit=()=>{
        const d=new Date(this.state.startdate);
        const Eyear = d.getFullYear();
        const Emonth =d.getMonth()+1;
        const Eday = d.getDate();
        const EdateString = `${Eyear+1}-${Emonth}-${Eday}`; 
       const chore={
       ParentId:sessionStorage.getItem("parentid"),
       ChildId:this.state.selectedKidid,
       TaskName:this.state.choreName,
       TaskDescription:this.state.choreDesc,
       TaskPoints:this.state.chorePoint,
       StartDate:this.state.startdate,
       EndDate:EdateString,
       TaskType:this.state.choretype,
       Mandatory:0,
       TaskStatus:"not done"
       };
       console.log(chore);
       API.addChore(chore).then((res)=>{
           this.loadChores(this.state.selDate);
           console.log("done")
        });
        this.loadChores(this.state.selDate);
    };
    handleDeleteChore=(event)=>{
        console.log(event.target.id);
        API.deleteChore(event.target.id).then((res)=>{
            console.log("chore deleted");
            this.loadChores(this.state.selDate);
        });
    };
    logout=()=>{
        sessionStorage.clear();
        console.log("AFTER clear() session id -parent " +sessionStorage.getItem("parentid"));
        window.location='/';
     };


    render() {
    return (
        <div>
        <div className="row">
        <div className="navBar">
            <div className="col-xs-12 col-md-2">
                <img className="logoimg" src = "/assets/logo.png" alt= "logo"/>
            </div>
            <div className="col-xs-12 col-md-7">
                <h2 className="parentNav">Parent</h2>
            </div>
            <div className="col-xs-12 col-md-2">
                <KidDropDown addKid="true" kids={this.state.kids} key={this.state.kids.id} handleKidChange={this.handleKidChange}  />
            </div>
            <div className="col-xs-12 col-md-1">
                  <button onClick={this.logout} className="logout">
                Log Out
                </button> 
            </div>
        </div>
        </div>
        <div className="text-center childname"> <h1> Set tasks for {this.state.selectedKidName} </h1></div>
        

        <div className="row">
            <div className="col-sm-6">
            <div>
                <div className="calbox">
                    <h2> {this.state.selDate.toString().substr(0,16)}</h2>
                    <Calendar  onChange={this.onChange}/>
                </div>
            </div>
            </div>

        <div className="col-sm-6 kid-chores">
        {this.state.chores.length ? (
            <div>
                <h3> Chores for {this.state.selDate.toString().substr(4,11)}</h3>
            {this.state.chores.map(chore=>
            <Chore key={chore.id} roleClick="confirm" page="parentchild" handleStatus={this.handleChoreStatus} who="parent" choreid={chore.id} handleDeleteChore={this.handleDeleteChore} title={chore.TaskName} points={chore.TaskPoints} status={chore.TaskStatus} />
            )}
            </div>
        ):(
            <div>
            <h3>No Chores for set this day - {this.state.selDate.toString().substr(4,11)}</h3>
            </div>
        )}

        </div>
        
    <div className="col-md-12 pageend">    
        <div className="col-md-6 link-btn text-right">
        <br/><br/>
            <div className="col-sm-8 col-sm-offset-2 chore-form">
            <AddForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </div>
            <div className="col-sm-2">

            </div>
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
     <Popup handleChange={this.handleChange} handleSubmit={this.handleAddKid} />

</div>
);
    }
}

export default ChildPage;