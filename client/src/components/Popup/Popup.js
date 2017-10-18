
import React from "react";

export const  Popup=props=>
  <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Add Kid</h4>
        </div>
        <div className="modal-body">
        <input onChange={props.handleChange} className="form-control" id="kidName" type="name" placeholder="Kid Name" />
        <input onChange={props.handleChange}  className="form-control" id="kidUser" type="name" placeholder="kid Username" />
        <input onChange={props.handleChange}  className="form-control" id="kidPass" type="password" placeholder="Kid Password" />
     
        </div>
        <div className="modal-footer">
          <button id="btnSubmitKid" type="button" className="btn btn-default" onClick={props.handleSubmit}>Add</button>
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>;



