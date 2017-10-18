const router = require("express").Router();
const path = require("path");
var appDir = path.dirname(require.main.filename);
const db = require("../models");


router.route("/api/login/:username/:password/:type").get((req,res)=>{ 
  console.log("\n username :"+req.params.username+"\n password :"+req.params.password+"\n type :"+req.params.type)
  if(req.params.type==="parent")
  {
   db.Parent.findOne({
            where:{
                ParentUsername:req.params.username,
                ParentPassword: req.params.password
            }
        }).then(function(result) {
            //console.log(result.dataValues);
            res.json(result.dataValues);
        });
  }
  if(req.params.type==="child")
  {
   db.Child.findOne({
            where:{
                ChildUsername:req.params.username,
                ChildPassword: req.params.password
            }
        }).then(function(result) {
            //console.log(result.dataValues);
            res.json(result.dataValues);
        });
  }
  
});

router.route("/api/signUp").post((req,res)=>{ 
  //console.log(req.body);
  const pare={
    ParentFirstName: req.body.firstname,
    ParentLastName:req.body.lastname ,
    ParentEmail:req.body.email,
    ParentUsername: req.body.username,
    ParentPassword: req.body.password,
  }
  console.log(pare);
  db.Parent.create(pare).then(function(result) {
    console.log("parent created");
    res.json(result);
  });
});

router.route("/api/childsignup").post((req,res)=>{ 
  //console.log(req.body);
  const ch={
    ChildName: req.body.childName,
    ChildUsername: req.body.childUsername,
    ChildPassword: req.body.childPassword,
    ChildPointsEarned:0,
    ParentId:req.body.parentid
  }
  db.Child.create(ch).then(function(result) {
    console.log("child created");
    res.json(result);
  });
});

//get child details
router.route("/api/getChild/:id").get((req,res)=>{ 
  console.log("find"+req.params.id);
  db.Child.findOne({
    where :{id: req.params.id}
  }).then(function(result) {
    console.log("child found");
    res.json(result);
    });
});
// router.route("/api/getParent/:childid").get((req.res)=>{
// db.Child.findOne({
//     where :{id: req.params.id}
//   }).then(function(result) {
//     console.log("Parent found");
//     res.json(result);
//     });
// });

// add task
router.route("/api/addtask").post((req,res)=>{ 
  console.log("***********Adding chore*************");
  
  //console.log(req.body);
  db.Tasks.create(req.body).then(function(result) {
    console.log("task created");
     res.json(result);
 });
});
//delete task
router.route("/api/deleteTask/:choreid").post((req,res)=>{
console.log("delete chore*************************");
  console.log(req.params.choreid)
  db.Tasks.destroy({
    where:{
      id:req.params.choreid
    }
  }).then(function(result) {
    console.log("chore deleted");
    res.json(result);
  });
});
//set Task status 
router.route("/api/markTask/:id/:status/:date").post((req,res)=>{
  console.log(req.params.id+ " updated to "+ req.params.status);
  // db.Tasks.update(
  //   {TaskStatus:req.params.status},
  //   {where:{  id:req.params.id},
  // }
  //updateTaskStatus
 db.sequelize.query(`call updateTaskStatus(:taskid, :status, :date)`,{
    replacements:{
      taskid:req.params.id,
      status:req.params.status,
      date:req.params.date,
    }
  }).then(function(result) {

    if (req.params.status==="done")// if a task is being marked 'done' the ChildPintsEarned should be incremented by TaskPoints
    {
      db.Tasks.findOne({
        where :{id: req.params.id}
      }).then(function(result) {
        console.log(result.dataValues);
        const p=result.dataValues.TaskPoints;
        const Cid=result.dataValues.ChildId;
        db.Child.update(
          {ChildPointsEarned:db.Sequelize.literal(`ChildPointsEarned +`+p)},//sequelize.literal('field + 2')
          {where:{  id:Cid},
        }).then(function(res){
          res.json(res);
        });
  }
  ).then(function(result) {
      });
    }
    res.json(result);
  });
});
// add rewards
router.route("/api/addreward").post((req,res)=>{ 
  console.log("add reward*************************");
  const rwrd={
    ParentId:req.body.parentid,
    RewardName: req.body.rewardname,
    RewardsDescription:req.body.rewarddescription,
    RewardPoints: req.body.rewardpoints,
  }
  console.log(rwrd);
  db.Rewards.create(rwrd).then(function(result) {
    console.log("reward created");
     res.json(result);
  });
});

router.route("/api/delreward/:id").post((req,res)=>{ 
  console.log("delete reward*************************");
  console.log(req.params.id)
  db.Rewards.destroy({
    where:{
      id:req.params.id
    }
  }).then(function(result) {
    console.log("reward deleted");
    res.json(result);
  });
});


//get pending chore for the day
router.route("/api/pendingChores/:parentid/:date").get((req,res)=>{ 
  console.log(req.params.childid);
    // db.Tasks.findAll({
    //   where:{
    //     ParentId:req.params.parentid,
    //     StartDate:req.params.date,
    //     TaskStatus:'pending',
    //   }
    //   })
    db.sequelize.query(`call pendingTasks(:parentid, :date)`,{
    replacements:{
      parentid:req.params.parentid,
      date:req.params.date,
    }
  }).then(function(result) {
        //console.log(result);
        res.json(result);
    });
});
// pull up all the rewards.
router.route("/api/getrewardChild/:childid").get((req,res)=>{ 
  db.Child.findOne({
            where:{
                ChildId:req.params.childid,
            }
        }).then(function(result) {
          var parid=result.ParentId;
          db.Rewards.findAll({
            where:{
              ParentId:parid,
            },
            order:{RewardPoints:'asc'},
           }).then(function(result) {
              //console.log(result);
              res.json(result);
            });
        });
});

router.route("/api/getAllRewards/:parentid").get((req,res)=>{ 
  
          db.Rewards.findAll({
            where:{
              ParentId:req.params.parentid,
            },
            // order: [
            //   ['RewardsPoints', 'ASC'],
            // ],
           }).then(function(result) {
              //console.log(result);
              res.json(result);
            });

});

// list of all kids
router.route("/api/childlist/:parentid").get((req,res)=>{ 
  console.log("Finding children of:");
  console.log(req.params.parentid);
  db.Child.findAll({
    where:{
        ParentId:req.params.parentid,
        }
    }).then(function(result) {
        res.json(result);
      });
});


//*******************************************************************************/
//tasks for each child each day
router.route("/api/gettasks/:childid/:day").get((req,res)=>{ 
  //console.log(db.Sequelize);
  db.sequelize.query(`call getTasks(:childid, :date)`,{
    replacements:{
      childid:req.params.childid,
      date:req.params.day,
    }
  }).then(function(results){
    res.json(results);
  });
  //  db.Tasks.findAll({
  //     where:{
  //       ChildId:req.params.childid,
  //       StartDate: { gte: req.params.day + ' 00:00' },
  //       StartDate: { lte: req.params.day + ' 23:59' }
  //     }
  //     }).then(function(result) {
  //       //console.log(result);
  //       res.json(result);
  //       // res.redirect("/childpage");
  //     });
});

//set points for child
  //set credit to 1 if you are adding points for the child, 0 if the points are being reduced
router.route("/api/setpoints/:childid/:points:/:credit").get((req,res)=>{ 
  db.query(`call setChildPoints(:childid, :points, :credit)`, {
    replacements: {
      child: req.params.childid,
      points: req.params.points,
      credit: req.params.credit
    }
  })
  .then(function(results){
    console.log("points updated")
    //console.log(results);
  })
  
});



// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  module.exports = router;



