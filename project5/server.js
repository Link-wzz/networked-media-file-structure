const themes = ["Ice creme","Cat","Mermaid","Pizza","Shark", "Flower","Handbag","Car","Pineapple","Frog","Jacket","Bed","Camel","Camera","Sofa","Rhino","Dog","Helicopter","Pie","Watch","Guitar"]
const express = require("express"); // imports express
const bodyParser = require("body-parser"); // imports body parser -- allows us to have a body in server request
const urlEncodedParser = bodyParser.urlencoded({ extended: true }); 
const multer = require("multer"); // imports multer -- handles file upload



const nedb = require("@seald-io/nedb");
const cookieParser = require("cookie-parser");
//new libraries to handle sessions
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')
const bcrypt = require('bcrypt')

// encode the body, translates bits and bytes (literal memory and data) 
const app = express();
// what is this configuring?
// A: destination for where files should be uploaded
const upload = multer({
  dest: "public/UserImages",
});

app.use(express.static("public")); // set the default folder for any static files such as assets, css, html
app.use(urlEncodedParser); // middleware to make sure the bits and bytes can be understood by the app
app.use(cookieParser());
app.use(bodyParser.json());


app.set("view engine", "ejs"); // allows us to use ejs
const nedbSessionInit = nedbSessionStore({
  connect: expressSession,
  filename: 'sessions.txt'
})
app.use(expressSession({
  store: nedbSessionInit,
  cookie: {
    maxAge: 365 * 24* 60 * 60 * 1000
  },
  secret: 'supersecret123',
  resave: false,  // 不每次请求都重新保存 session，除非 session 被修改
  saveUninitialized: false  // 不自动保存新初始化的 session，直到 session 被修改
}))
//set up the data base for all the user information
let userdatabase = new nedb({
  filename: "UserDB.txt",
  autoload: true
})

//set up the data base for all the paintings
let DoodleDB = new nedb({
  //use a txt file to store 
  filename: "DoodleDB.txt",
  //auto load
  autoload: true
})

// ******************************************************
// doodle upload route
// ******************************************************
app.post("/upload", upload.single("image"), (req, res) => {
  const currDate = new Date();
  let data = {
    author: req.session.loggedInUser, // 从会话中获取作者 ID
    createdTime: currDate.toLocaleDateString(),
    timestamp: currDate.getTime(),
    name: "",
    image: "",
    ratio: "", // 长宽比
  };

  if (req.file) {
    data.image = "/UserImages/" + req.file.filename; // 存储图像路径

    // 从请求体中获取长宽比
    if (req.body.aspectRatio) {
      data.ratio = req.body.aspectRatio;
    } else {
      console.error("Aspect ratio not provided");
      return res.status(400).send("Aspect ratio is required.");
    }
  }

  DoodleDB.insert(data, (err, newData) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving image and details in database.");
    } else {
      console.log("Image and details saved successfully:", newData);

      userdatabase.update(
        { _id: req.session.userId },
        { $push: { createdWorkID: newData._id } },
        {},
        (err, numUpdated) => {
          if (err) {
            console.error("Error updating user database:", err);
            res.status(500).send("Error updating user database.");
          } else if (numUpdated) {
            console.log("Updated successfully:", numUpdated);
            res.json({ message: "User updated." });
          } else {
            console.log("No document found with provided userID.");
            console.log(req.session.userId);
            res.status(404).send("No user found.");
          }
        }
      );
    }
  });
});





//middleware funciton, that use to check if the user has login
//next is special to middleware, it will go to the callback we use "next"
function requiresAuth(req,res,next){
    if(req.session.loggedInUser){
      next()
    }else{
      res.redirect('/login')
    }
}

app.get("/", requiresAuth, (request, response) => {
  // response.send("server working");

  // what steps do we need in order to use a template ejs file?
  let newVisits = 1;
  if (request.cookies.visits) {
    newVisits = parseInt(request.cookies.visits) + 1;
    response.cookie("visits", newVisits, {
      expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
    });
  } else {
    response.cookie("visits", 1, {
      expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
    });
  }

  let query = {};
  let sortQuery = {
    timestamp: -1, // sort in reverse chronological order
  };

  userdatabase
    .find(query)
    .sort(sortQuery)
    .exec((err, retreivedData) => {
      response.render("index.ejs", {
        posts: retreivedData,
        visitsToSite: newVisits,
      });
    });

  // response.render('index.ejs', {})
  // make sure to comment out the res.send() code above
});

function TodayTheme(){
    //using Modulo Operation
    let today = new Date();
    let dayOfYear = today.getFullYear() *1000 + today.getMonth() *31 + today.getDate()
    let index = dayOfYear % themes.length;

    return themes[index];
}

//Login: Authentication code, from Sam
app.post("/authenticate",(req,res)=>{
    let data = {
      username: req.body.username,
      //unencrypted password used for log in
      password: req.body.password,
    }
  
    let query = {
      username: data.username,
    }
  
    //searching for the database for one user name that matches
    userdatabase.findOne(query,(err,user)=>{
      console.log('attempted login')
      //checks if error, or if user is not found
      if(err || user == null){
        //redirects to login if user is not found
        res.redirect('/login')
      } else{
        console.log('found user')
        let encPass = user.password 
  
        // use bcrypt to compare the enc pass with the password from the attempted login
        if(bcrypt.compareSync(data.password, encPass)){
          console.log('successful login!');
  
          req.session.loggedInUser = user.username;
          req.session.userId = user._id;
  
          // if success, redirect to the home page
          res.redirect('/');
        }
        else{

          res.redirect('/login')
        }
      }
    })
  
  })



app.get('/test-session', (req, res) => {
    if (req.session.userId) {
        res.send(`Session is working, User ID: ${req.session.userId}`);
    } else {
        res.send('Session is not working correctly, no user ID found');
    }
});



app.get("/gamePrepare.ejs", (request, response) =>{
    const todayTheme = TodayTheme();

    response.render('gamePrepare.ejs',{theme: todayTheme});
})

app.get("/drawingPage.ejs", (req, res) =>{
    //set the timer 
    const todayTheme = TodayTheme();

    res.render('drawingPage.ejs',{loggedInUser: req.session.loggedInUser, userId:req.session.userId,theme: todayTheme});
})

app.get("/gameEnd.ejs", (req, res) => {
  if (!req.session.userId) {
      return res.redirect('/login'); // 如果用户未登录，重定向到登录页面
  }

  userdatabase.findOne({ _id: req.session.userId }, (err, user) => {
      if (err) {
          console.error("Error fetching user:", err);
          return res.status(500).send("Internal server error.");
      }

      if (!user || user.createdWorkID.length === 0) {
          console.log("No images found or user does not exist.");
          return res.render('gameEnd.ejs', { image: null, ratio: null }); // 没有找到图片时的处理
      }

      // 获取最后一个作品的 ID
      const lastWorkId = user.createdWorkID[user.createdWorkID.length - 1];

      // 查询该作品的详细信息
      DoodleDB.findOne({ _id: lastWorkId }, (err, doodle) => {
          if (err) {
              console.error("Error fetching doodle:", err);
              return res.status(500).send("Internal server error.");
          }

          if (!doodle) {
              console.log("Doodle not found.");
              return res.render('gameEnd.ejs', { image: null, ratio: null });
          }

          // 渲染页面并传递图片路径和比例
          res.render('gameEnd.ejs', { image: doodle.image, ratio: doodle.ratio });
      });
  });
});

app.post("/updateName", (req, res) => {
  // 检查用户是否已登录
  if (!req.session.userId) {
      return res.redirect("/login"); // 未登录用户重定向到登录页
  }

  const newName = req.body.workName; // 从请求中获取新的作品名称
  const userId = req.session.userId;

  if (!newName || newName.trim() === "") {
      return res.status(400).send("Name cannot be empty."); // 确保名称非空
  }

  // 查找用户
  userdatabase.findOne({ _id: userId }, (err, user) => {
      if (err) {
          console.error("Error fetching user:", err);
          return res.status(500).send("Internal server error.");
      }

      if (!user || user.createdWorkID.length === 0) {
          console.log("No works found or user does not exist.");
          return res.status(404).send("No works found for this user.");
      }

      // 获取用户最后一幅画的 ID
      const lastWorkId = user.createdWorkID[user.createdWorkID.length - 1];

      // 更新最后一幅画的名称
      DoodleDB.update(
          { _id: lastWorkId },
          { $set: { name: newName } },
          {},
          (err, numUpdated) => {
              if (err) {
                  console.error("Error updating work name:", err);
                  return res.status(500).send("Internal server error.");
              }

              if (numUpdated) {
                  console.log(`Work ${lastWorkId} updated with name: ${newName}`);
                  return res.redirect("/gameEnd.ejs"); // 更新成功后重定向到 Game End 页面
              } else {
                  console.log("No work found to update.");
                  return res.status(404).send("Work not found.");
              }
          }
      );
  });
});

app.get("/gallery",(req,res)=>{

  let query ={};
  let sortQuery = {
    timestamp: -1, // sort in reverse chronological order
  }

  
  DoodleDB
    .find(query)
    .sort(sortQuery)
    .exec((err, retreivedData) => {
      res.render("gallery.ejs", {
        paintings: retreivedData,
      });
    });
})


app.post("/save", (req, res) => {
  if (!req.session.userId) {
      return res.redirect("/login"); // 未登录用户重定向到登录页面
  }

  const paintingId = req.body.paintingId;

  // 从数据库中获取用户收藏
  userdatabase.findOne({ _id: req.session.userId }, (err, user) => {
      if (err) {
          console.error("Error fetching user:", err);
          return res.status(500).send("Internal server error.");
      }

      if (!user) {
          console.error("User not found.");
          return res.status(404).send("User not found.");
      }

      // 检查是否已收藏
      const isAlreadyFavorited = user.userFavoriteID.includes(paintingId);

      if (isAlreadyFavorited) {
          // 从收藏中移除
          userdatabase.update(
              { _id: req.session.userId },
              { $pull: { userFavoriteID: paintingId } }, // 使用 $pull 移除 ID
              {},
              (err, numUpdated) => {
                  if (err) {
                      console.error("Error removing painting from favorites:", err);
                      return res.status(500).send("Internal server error.");
                  }

                  console.log(`Painting ${paintingId} removed from userFavoriteID.`);
                  // 同步到 session
                  req.session.userFavorites = user.userFavoriteID.filter(id => id !== paintingId);
                  return res.redirect("back"); // 重定向回原页面
              }
          );
      } else {
          // 添加到收藏
          userdatabase.update(
              { _id: req.session.userId },
              { $push: { userFavoriteID: paintingId } },
              {},
              (err, numUpdated) => {
                  if (err) {
                      console.error("Error saving painting:", err);
                      return res.status(500).send("Internal server error.");
                  }

                  console.log(`Painting ${paintingId} added to userFavoriteID.`);
                  // 同步到 session
                  req.session.userFavorites.push(paintingId);
                  return res.redirect("back"); // 重定向回原页面
              }
          );
      }
  });
});





app.get("/login",(request, response)=>{
    response.render('login',{})
})

app.get("/signup",(request, response)=>{
  response.render('signup.ejs',{})
})

app.get("/personal", (req, res) => {
  // 检查用户是否已登录
  if (!req.session.userId) {
      return res.redirect("/login"); // 未登录用户重定向到登录页面
  }

  // 根据 session 中的 userId 查询用户信息
  userdatabase.findOne({ _id: req.session.userId }, (err, user) => {
      if (err) {
          console.error("Error fetching user:", err);
          return res.status(500).send("Internal server error.");
      }

      if (!user) {
          console.log("User not found.");
          return res.status(404).send("User not found.");
      }



      DoodleDB.find({})
      .sort({ timestamp: -1 }) // 按时间倒序排列
      .exec((err, retreivedData) => {
          if (err) {
              console.error("Error fetching paintings:", err);
              return res.status(500).send("Internal server error.");
          }

          // 将用户信息和所有作品数据传递到 EJS
          res.render("personal.ejs", {
              user,
              paintings: retreivedData,
          });
      });
  });
});






app.post('/SignUp',(req,res)=>{
  //encrypt password
  console.log('Password:', req.body.password);
  console.log('Username:', req.body.username);
  
  //创建用户创作过的作品ID名单
  let createdWorkID =[];
  //创建用户收藏的作品ID名单
  let userFavoriteID =[];

  let hashedPassword = bcrypt.hashSync(req.body.password, 10)

  let data = {
    username: req.body.username,
    password: hashedPassword,
    createdWorkID: createdWorkID,
    userFavoriteID: userFavoriteID,
  }

  userdatabase.insert(data, (err,insertedData)=>{
    console.log(insertedData)
    res.redirect('/login')
  })
})




app.listen(6777, () => {
    console.log("server started on port 6777");
  });
  
