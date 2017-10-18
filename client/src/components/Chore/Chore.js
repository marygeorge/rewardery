
import React from "react";

export const  Chore=props=>
<div className="panel panel-default chore-item">
  <div className="panel-body">
    <div className="row">
      <div className="col-xs-6 col-sm-5">{props.title}</div>
      <div className="col-xs-5 col-sm-4">{props.points} points</div>
      {props.who==="child" ? (
      <div className="col-xs-1 col-sm-3 text-center">
        {
         props.status=="not done"?<input type="image" value={props.roleClick} onClick={props.handleStatus} id={props.choreid} src = "/assets/redCheck.png" alt="red check" /> :
         props.status=="pending"?<input type="image" value={props.roleClick} onClick={props.handleStatus}  src = "/assets/yellowCheck.png" alt="yellow check" /> :
         <img src = "/assets/greenCheck.png" alt="green check" /> 
        }
      </div>
      ):(
        <div>
          {props.page=="parent"?(
          <div> 
            <input type="image" value="deny" onClick={props.handleApproveChore} id={props.choreid} src = "/assets/yellowCheck.png" alt="yellow X" />
          </div>
          ):(
            <div>
            <input type="image" value="deny" onClick={props.handleDeleteChore} id={props.choreid} src = "/assets/redX.png" alt="red X" />
            </div>
          )
          }
        </div>
      )}
    </div>
  </div>
</div>;



