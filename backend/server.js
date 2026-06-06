require("dotenv").config();
const app = require('./src/app');
const connectToDb = require("./src/config/database");
const {resume , selfDescription , jobDescription} = require("./src/services/temp")
const genereateInterviewReport = require("./src/services/ai.service")

connectToDb();

genereateInterviewReport({resume , selfDescription , jobDescription})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

