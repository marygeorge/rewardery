import axios from "axios";

export default {
    // Gets the book with the given id
    login: function(userid,password,type) {
      return axios.get("/api/login/"+userid+"/"+password+"/"+type);
    },
    //addChores
    addChores: function(chore) {
      return axios.post("/api/addtask");
    },
    allKids: function(parentid) {
      return axios.get("/api/childlist/"+parentid);
    },
    allReward: function(parentid) {
      return axios.get("/api/getAllRewards/"+parentid);
    },
    allChildChores: function(childid) { 
      return axios.get("/api/gettasks/"+childid);
    },
    deleteReward:function(rewardid){ //delete a reward
      return axios.post(" /api/delreward/"+rewardid);
    },
    pendingChores:function(parentid,date){ //find chores with status =pending for a particular day
      return axios.get(" /api/pendingChores/"+parentid+"/"+date);
    },
    
    getChildChores:function(childid,date){ // find a child's chores for the day
    console.log("/api/gettasks/"+childid+"/"+date);
      return axios.get("/api/gettasks/"+childid+"/"+date);
    },
    getChild:function(childid){ //get details of a child
      //console.log("getvhild0");
      return axios.get("/api/getChild/"+childid);
    },
    // getParentID=(childid)=>{
    //   return axios.get("/api/getParent/"+childid);
    // },
    deleteChore:function(choreid){
      console.log("delete chore "+choreid)
      return axios.post("/api/deleteTask/"+choreid);
    },

    signUp: function(userData) {
      return axios.post("/api/signUp", userData);
    },
    addChore: function(userData) {
      return axios.post("/api/addtask", userData);
    },
    addReward: function(userData) {
      return axios.post("/api/addreward", userData);
    },
    addKid: function(userData) {
      return axios.post("/api/childsignup", userData);
    },
    setChoreStatus:function(newStatus){
      return axios.put("api/chorestatus",newStatus);
    },
    selectReward:function(newStatus){
      return axios.put("api/selectreward",newStatus);
    },
    markTask:function(id,status,date){
      console.log("api/markTask/"+id+"/"+status+"/"+date);
      return axios.post("/api/markTask/"+id+"/"+status+"/"+date);
    },
  };