
const path = require("path")
const express = require("express")

// Adding cookie parser middleware
const cookieParser = require("cookie-parser")

const connectToMongoDB = require("./connect")

// model
const Articles = require('./models/article')
const Users = require('./models/user')

const userRoute = require('./routes/user')
const articleRoute = require('./routes/article')



// Adding cors for getting the req
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://main--spacedreamer.netlify.app');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


app.use(cors({ origin: true, credentials: true }));

//  connect mongodb
//connectToMongoDB("mongodb+srv://webconceit:Webconceit%40321@spacecluster.bs04zfu.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("Db connected")).catch((e) => console.log(e));
connectToMongoDB("mongodb+srv://spacedreamer2:Abhay%23123@cluster0.d7aws.mongodb.net/").then(() => console.log("DB connected")).catch((e) => console.log(e));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// const staticPath = path.join(__dirname, 'public')
console.log(__dirname)
// console.log(path.resolve(__dirname, "./public"))
// app.use(express.static(path.resolve(__dirname, "./public")));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/articleCoverImage', express.static(path.join(__dirname, 'public', 'articleCoverImage')));
// app.use(express.static(path.resolve("./public")));


app.get("/api", async (req, res) => {
    // const allArticle = await Articles.find({})
    // const allUsers = await Users.find({})
    // const allData = {allArticle, allUsers}
    // res.json(allArticle)
    res.status(200).json({message: "all good"})
})

app.use("/api/user", userRoute)
app.use("/api/article", articleRoute)



app.listen(port, () => {
    console.log(`server is running on ${port}`)
})



