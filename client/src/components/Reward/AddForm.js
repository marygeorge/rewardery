
import React from "react";

export const  AddForm=props=>
<div className="addRewardForm" >
<input onChange={props.handleChange} className="form-control" id="rewardName" type="name" placeholder="Reward Name" />
{/*<input onChange={props.handleChange}  className="form-control" id="amazonWishList" type="name" placeholder="Amazon Wish List" />*/}
<input onChange={props.handleChange}  className="form-control" id="rewardDescr" type="name" placeholder="Description(optional)" />
<input onChange={props.handleChange}  className="form-control" id="points" type="number" placeholder="Points" />
                       
<input onClick={props.handleSubmit} type="button" className="submitChores" id="submitChores" value="Submit" />
</div>;



