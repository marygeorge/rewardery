import React, { Component } from "react";
import './Parent.css';
import API from "../../utils/API";
import {KidDropDown} from "../../components/KidDropDown/KidDropDown.js";
import {Chore} from "../../components/Chore/Chore.js"
import {Reward} from "../../components/Reward/Reward.js"
import {Popup} from "../../components/Popup/Popup.js"
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';



class Parent extends Component {
    state = {
        date: new Date(),
        selectedKidid:"",selectedKidName:"",
        addKidName:"",addKidUser:"",addKidPass:"",
        chores:[],
        // rewards:[{id:1,RewardName:"soccer ball",RewardPoints:"500"},{id:2,RewardName:"iphone",RewardPoints:"1000"}],
        rewards:[],
        kids:[] 
    };

    

    componentDidMount(){
        console.log("new date"+new Date());
        this.isLoggedIn();
        this.loadKids();
        this.loadRewards();
        this.loadPendingChores(new Date())
    };

    isLoggedIn=()=>
    {
        
        if(sessionStorage.getItem("parentid"))
        {   
            console.log("session id -parent " +sessionStorage.getItem("parentid"));
        }
        else
        {
            console.log("not Logged in");
            window.location='/';
            
        }
        
    };

    onChange = date => {
        this.setState({date: date });
         this.loadPendingChores(date);
    };


    loadKids=()=>{
        API.allKids(sessionStorage.getItem("parentid")).then(res=>{
            // console.log(res.data);
            // console.log(res.data.length);
            this.setState({kids:res.data});
        })
        .catch(err => console.log(err));
    };

    loadPendingChores=(date)=>{
        const year = date.getFullYear();
        const month =date.getMonth()+1;
        const day = date.getDate();
        const dateString = `${year}-${month}-${day}`; 
        API.pendingChores(sessionStorage.getItem("parentid"),dateString).then(res=>{
            console.log("pending chores for "+date);
            this.setState({chores:res.data});
        });
    };

    loadRewards=()=>{
        API.allReward(sessionStorage.getItem("parentid")).then(res=>{
            // console.log(res.data);
            this.setState({rewards:res.data});
        });
    }

    handleKidChange=(event)=>{
        this.setState({selectedKidid:event.target.id});
        this.setState({selectedKidName:event.target.value});
        sessionStorage.setItem("selectedChildId", event.target.id);
         window.location='/parent/ChildPage';
         ///parent/ChildPage
        //render Child/Child.js page
        // API.allChildChores(event.target.id).then(res=>console.log("this.setState({this.state.chores:res})"));
      };
    handleChange=event=>{
        switch(event.target.id){
            case "kidName":this.setState({addKidName:event.target.value});break;
            case "kidUser":this.setState({addKidUser:event.target.value});break;
            case "kidPass":this.setState({addKidPass:event.target.value});break;
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
        // console.log(kid);
        API.addKid(kid).then(res=>{
            this.loadKids();
            console.log("kid added")
        });
        
    };
    handleChoreStatus=(event)=>{ 
            const status={newstatus:event.target.value}
            API.setChoreStatus(status).then(res=>{
                this.loadPendingChores();
                // console.log(res)
            });
    };

    handleDeleteReward=event=>{
         console.log(event.target.id);
         API.deleteReward(event.target.id).then((res)=>{
             this.loadRewards();
             console.log("done")
            });
     };

     handleApproveChore=event=>{
         console.log(event.target.id);
         API.markTask(event.target.id,"done").then((res)=>{
             this.loadPendingChores(this.state.date);
            //  console.log(res)
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

     
    <div className="text-center"> <h2> {this.state.selectedKidName} </h2></div>
        <div className="row">
            <div className="col-md-6">
            <div className="calendar">
                    <h2> {this.state.date.toString().substr(0,16)}</h2>
                <div>
                    <Calendar  onChange={this.onChange}/>
                </div>
            </div> 
            </div>
            <div className="col-md-6">
            <div className="pendingChores"> 
                <div className="col-sm-12 kid-chores">
                {this.state.chores.length ? (
                    <div>
                    {this.state.chores.map(chore=>
                    <Chore key={chore.id} roleClick="confirm" page="parent" handleStatus={this.handleChoreStatus} who="parent" choreid={chore.id} handleDeleteChore={this.handleDeleteChore} handleApproveChore={this.handleApproveChore} title={chore.TaskName} points={chore.TaskPoints} status={chore.TaskStatus} />
                    )}
                    </div>
                ):(
                    <div>
                    <h3>No Chores to Approve - {this.state.date.toString().substr(4,11)}</h3>
                    </div>
                )}
                    
                </div>
            </div>
            </div>
        </div>
<br/><br/>
        <div className="row pageend">
            <div className="col-lg-6">
                <h2> Reward List</h2>
                <div className="rewardsParent">
                    {this.state.rewards.map(reward=>
                        <Reward title={reward.RewardName} points={reward.RewardPoints} rewardId={reward.id} key={reward.id} handleDeleteReward={this.handleDeleteReward} />
                    )}
                    <div className="link-btn text-center"> 
                    <Link to="/parent/addreward" >
                    Add Reward
                    <img src = "/assets/addChoresBtn.png" alt="add chores button" />
                    </Link> 
                    
                </div>
            </div>
        </div>      
        

        {/*<div className="link-btn text-right">  
            <Link to="/parent/addchore" >
            Add Chores
            <img src = "/assets/addChoresBtn.png" alt="add chores button" />
            </Link>        
            </div>*/}

        
     <Popup handleChange={this.handleChange} handleSubmit={this.handleAddKid} />

    </div>
</div>
);
    }
}

export default Parent;