const express=require("express");
const app=express();


const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const mongoose=require("mongoose");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/signupdb",{useNewUrlParser:true, useUnifiedTopology:true});


const signSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
});

const Signup=mongoose.model("Signup",signSchema);


app.listen(3000,function(){
  console.log("servor is running")
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});


// app.post("/page",function(req,res{
//   res.write("hi");
//   res.send();
// }))

app.post("/check",async(req,res)=>{
  var a=req.body.email;
  var b=req.body.password;
  console.log(a,b);
  const data= await Signup.findOne({email:a}); //gives entire data that has email as a which includes a's name password etc. given in schema of database made
  try{
    if(data.password===b){
    res.sendFile(__dirname+"/final.html")
     }
    else{
      res.write("password does not matched");
      res.send();
    }
  }
  catch(error){
      res.write("incorrect email");
      res.send();
  }
// console.log(data.password);
});
app.post("/second",function(req,res){
  res.sendFile(__dirname+"/index2.html")
});
app.post("/",function(req,res){
  var namez=req.body.name;
var emailz=req.body.email;
var passwordz=req.body.password;
const signup=new Signup({
  name:namez,
  email:emailz,
  password:passwordz
})
signup.save();
res.sendFile(__dirname+"/final.html");
// if(error)
// {
//   res.write("bad");
//   res.send();
// }
// else{
// res.write("done");
// res.send();
// }
// res.redirect("/login");
//redirect("/page");
});

// app.get("/login",function(req,res){
//   // res.sendFile(__dirname+"/index2.html");
//   console.log("hi");
// });
