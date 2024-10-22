// imports express library
const express = require('express')
// include body parser library
const parser = require('body-parser')
const encodedParser = parser.urlencoded({extended: true})
// include multer library
const multer = require('multer')
// const uploadProcessor = multer({dest:'public/upload'})
const uploadProcessor = multer({dest:'public/blogUpload'})
// initialize express
const app = express();
//include path library
const path = require('path');
//include the File System module 
const fs = require('fs');

const filePath = path.join(__dirname,'public','blogUpload','allBlogs.json');

// initialize public folder for assets
app.use(express.static('public'))

app.use(express.json());
// initialize body parser with the app
app.use(encodedParser)

// initialize template engine to look at views folder for rendering
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
// TODO INCLASS: SET UP ROUTES!
app.get('/', (req, res)=>{
    res.render("home.ejs",{})
})

// Request to establish a post
app.get('/discover',(req, res)=>{
    const filePath= path.join(__dirname,'public/blogUpload/allBlogs.json');
    fs.readFile(filePath, (err,data) =>{
        if (err) {
            res.status(500).send("Error reading posts data.");
            return;
        }
        // read json file
        const posts = JSON.parse(data);
        posts.forEach(post => {
            post.tagsHtml = post.selectedArray.split(',').map(tag =>
                `<span class="previewTag">${tag.trim()}</span>`
            ).join(' ');
        });
        res.render('discover', { posts: posts }); // Render the page and pass the data
    })
})

// Create an Array with all the tags and pass it into the postEdit Page
let allTags = ['Food','Relationship','Shopping'];

//render the postedit page
app.get('/postEdit', (req, res)=>{
    // let dataContainer ={
    //     arrayToBeSent: userPost
    // }
    let tagsContainer={
        tags: allTags
    } 
    res.render('postEdit.ejs', tagsContainer);
})






// This line of code enables express to parse URL-encoded form data  GPT
app.use(express.urlencoded({ extended: true }));

let userPost = [];
let postIndex = 0;

// Vote Goes Here~~~~~~~~~~~~~~~~~~~~~~~~~~inspired by GPT
app.get('/vote', (req, res) => {
    const postId = req.query.postId;
    const voteOption = req.query.voteOption; // 'yes' or 'no'

    // Read and update the vote count 
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the posts file.');
        }

        const posts = JSON.parse(data);
        const post = posts.find(p => p.postNumber == postId);
        if (!post) {
            return res.status(404).send('Post not found.');
        }

        if (voteOption === 'yes') {
            post.voteYes += 1;
        } else if (voteOption === 'no') {
            post.voteNo += 1;
        }

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(posts, null, 2), err => {
            if (err) {
                return res.status(500).send('Error updating the posts file.');
            }
            res.send('Vote updated successfully.');
        });
    });
});



// Note here that if you use nodemon, the server will restart after each time the user uploads a post, which causes the index not to increase because of each restart
// postIndex will all be zeroed, use node server.js to solve this problem
app.post('/blogUpload', (req, res)=>{
    // postIndex++;
    const now = new Date();
    // if(req.body.blogTitle.length <10 || red.body.blogBody.length<10){
    //     return res.status(400).json({ error: 'Title and body must be at least 10 characters long.' });
    // }
    // message object that holds the data from the form
    const blog = {
        blogTitle: req.body.blogTitle,
        blogBody: req.body.blogBody,
        date: now.toLocaleDateString(),
        postNumber: postIndex,
        selectedArray: req.body.selectedTags,
        voteYes:0,
        voteNo:0
        //keep track of the poll 
    }
    postIndex++;

    //*********** GPT Inspired ***********
    fs.readFile(filePath, (err,data)=>{
        let blogs =[];
        // if fileRead successfully && file is not empty
        if (!err && data.length) {
            blogs = JSON.parse(data.toString());
        }
        // Add new blogs to the array. Add new blogs to the array
        blogs.push(blog);

        //JSON.stringify will print the object as string to the json file(where the filePath pointed to)
        fs.writeFile(filePath, JSON.stringify(blogs, null, 2), (err) => {
            //if fail:
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Unable to save blog post.');
            }
            res.redirect('/');
        });


    })
    userPost.unshift(blog);
    console.log(userPost); // 输出查看存储的数据

    // res.redirect('/');

})

//关于Detail Post*********************************************
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const filePath = path.join(__dirname, 'public', 'blogUpload', 'allBlogs.json');
    
    fs.readFile(filePath, (err,data)=>{
        if(err) {
            res.status(500).send('Error: Can not read the json file');
            return;
        }
        //read the json data
        const allPosts= JSON.parse(data);
        const post= allPosts.find(function(p){
            return p.postNumber === postId;
        })
        //if found matched post
        if (post){
            res.json(post);
        }else{
            res.status(404).send('Post not found :( ');
        }

    });


});


//reveal 
// Get poll data for a specific post    GPT inspired
app.get('/api/votes/:id', (req, res) => {
    const postId = req.params.id; // 从URL路径获取帖子ID
    const filePath = path.join(__dirname, 'public', 'blogUpload', 'allBlogs.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file.");
        }
        //read from json
        const posts = JSON.parse(data);
        const post = posts.find(p => p.postNumber == postId); 

        if (post) {
            const voteData = {
                voteYes: post.voteYes,
                voteNo: post.voteNo
            };
            res.json(voteData); 
        } else {
            res.status(404).send('Post not found');
        }
    });
});


app.post('/delete',(req,res)=>{
    const postId = parseInt(req.body.postId, 10);
    const index = data.findIndex(d=> d.postNumber === postId);
    if (index !== -1){
        data.splice(index, 1);
    }
    res.redirect('/posts');
})

app.get('/api/posts/tag/:tag', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'blogUpload', 'allBlogs.json');

    const tag = req.params.tag;
    console.log(tag);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading posts data.');
            return;
        }
        const posts = JSON.parse(data);
        const filteredPosts = posts.filter(post => post.selectedArray.includes(tag));
        res.json(filteredPosts);
    });
});


app.listen(8081, ()=> {
    console.log('server starts at port 8081')
})

