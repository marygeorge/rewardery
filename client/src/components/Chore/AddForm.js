
import React from "react";


export const  AddForm=props=>
<div >

<input onChange={props.handleChange}  className="form-control" id="choreName" type="name" placeholder="Chore Name" />
<input onChange={props.handleChange}  className="form-control" id="choreDesc" type="name" placeholder="Description/ Notes" />
<input onChange={props.handleChange}  className="form-control" id="selectPointAmount" type="number" placeholder="Enter Points" />
<input onChange={props.handleChange}  className="form-control" id="startDate" type="date" placeholder="Start Date" />
{/*<input onChange={props.handleChange}  className="form-control" id="Type" type="name" placeholder="Select Type" />*/}
<select  onChange={props.handleChange}  className="form-control" id="choreType" >
  <option value="Once">Select Schedule</option>
  <option value="Once">Once</option>
  <option value="Daily">Daily</option>
  <option value="Weekly">Weekly</option>
  <option value="Altdays">Alt Days</option>
</select>



{/*<input onChange={props.handleChange}  className="form-control" id="mandatory" type="name" placeholder="Mandatory" hidden="hidden" />*/}
                       
<input onClick={props.handleSubmit} type="button" className="submitChores" id="submitChores" value="Add Chore" />
</div>;



