
import React from "react";

export const  Reward=props=>
<div className="panel panel-default reward-item">
  <div className="panel-body">
    <div className="row">
      <div className="col-xs-6 col-sm-6">
        <span className="glyphicon glyphicon-star"></span> &nbsp;&nbsp;
        {props.title}
      </div>
      <div className="col-xs-4 col-sm-3">
        <span className="rewardpointslabel label-default"> {props.points} </span>
     </div>
     <div className="col-xs-2 col-sm-3">
       <button onClick={props.handleDeleteReward} id={props.rewardId} className="dReward">
       <span  className="glyphicon glyphicon-remove" id={props.rewardId} ></span>
       </button> 
     </div>  
    </div>
  </div>
</div>;



