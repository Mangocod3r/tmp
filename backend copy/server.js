require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

const postSchema = mongoose.Schema({
  img: String,
  p1: String,
  p2: String,
  p3: String,
  sub: String,
  text: String,
  title: String,
  header: String,
  description: String,
  overview: String,
  start: String,
  end: String,
  name: String,
});

const Post = mongoose.model("Post", postSchema);

const postSchema1 = mongoose.Schema({
  img: String,
  title: String,
  sub: String,
});

const Post1 = mongoose.model("Post1", postSchema1);

const stuidea = mongoose.Schema({
  title:String,
  my_idea:String,
  name:String,
});

const stu = mongoose.model("stu_idea", stuidea);


app.get("/", (req, res) => {
  res.send("express is here");
});

app.post("/create", (req, res) => {
  const newPost = new Post({
    img: req.body.img,
    p1: req.body.p1,
    p2: req.body.p2,
    p3: req.body.p3,
    sub: req.body.sub,
    text: req.body.text,
    title: req.body.title,
    header:req.body.header,
    description: req.body.description,
    overview: req.body.overview,
    start: req.body.start,
    end: req.body.end,
    name:req.body.name,
  });



  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.post("/stu_km", (req, res) => {
  console.log("hey in stu km");
  const newPost = new stu({
    title: req.body.title,
    my_idea: req.body.my_idea,
    name: req.body.name,
    // description: eq.body.description,
    // my_idea:req.body.my_idea,
    // myidea:req.body.myidea,

  });

  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.post("/create_main", (req, res) => {
  const newPost = new Post1({
    img: req.body.img,
    title: req.body.title,
    sub: req.body.sub,
  });

  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get(`/posts/:title`, (req, res) => {
  // const {title} = useParams()
  Post.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});
app.get("/posts", (req, res) => {
  // const {title} = useParams()
  Post.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get("/posts_main", (req, res) => {
  Post1.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get("/stu_id", (req, res) => {
  stu.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get("/stu_ideas", (req, res) => {
  stu.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.post("/create", (req, res) => {
  const newPost = new Post({
    img: req.body.img,
    p1: req.body.p1,
    p2: req.body.p2,
    p3: req.body.p3,
    sub: req.body.sub,
    text: req.body.text,
    title: req.body.title,
    description: req.body.description,
    overview: req.body.overview,
    start: req.body.start,
    end: req.body.end,
    name:req.body.name,
  });



  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

