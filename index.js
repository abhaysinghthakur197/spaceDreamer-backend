
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
const PORT = process.evn.PORT || 8000;

app.use(cors({ origin: true, credentials: true }));

//  connect mongodb
connectToMongoDB("mongodb://127.0.0.1:27017/SpaceDreamer-app").then(() => console.log("Db connected")).catch((e) => console.log(e));

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
        const allArticle = await Articles.find({})
        // const allUsers = await Users.find({})
        // const allData = {allArticle, allUsers}
    res.status(200).json(allArticle)
})

app.use("/api/user", userRoute)
app.use("/api/article", articleRoute)



app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})