
import React from "react";
import { Link } from "react-router-dom";

export const  KidDropDown =props=>
     <div className="dropdown kid-dd">
     <button className="btn btn-default dropdown-toggle dropDownBox" type="button" 
       id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
     <b className="kids">Kids</b>
     {/*<span className="caret" ></span>*/}
     </button>
     <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
     {props.kids.map((kid,i)=>
        <li key={kid.id}>
               <button key={kid.id} className="text-btn" id={kid.id} value={kid.ChildName} type="button" onClick={props.handleKidChange} > 
               {kid.ChildName} 
               </button>
             </li>     
        
     )}
     <li role="separator" className="divider"></li>
     { props.addKid ?
     <li><button id="btnAddKid" className="text-btn">Add-Kid</button></li>
     : "" }
     </ul>
     </div>;
             


{/*<li key={kid.id}>
          <Link key={kid.id} to={`/parent/ChildPage?id=${kid.id}`}>
          {kid.ChildName} 
          </Link>
        </li>*/}