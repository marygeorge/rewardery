
import React from "react";
import "./circle.css";

export const  Circle=props=>
<div className="circle-box">

<div className="circle progress" 
     data-percent={parseInt(props.totalPoint)>parseInt(props.rewardPoint)?
        "100%"
        :
        //parseInt((props.totalPoint*100)/props.rewardPoint)+"%"}>
        (parseInt(props.totalPoint/props.rewardPoint)*100)+"%"}>
</div>
        <h3>{props.rewardName}: {props.rewardPoint} points</h3>
</div>;



