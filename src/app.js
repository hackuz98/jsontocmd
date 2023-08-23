import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import bodyParser from 'body-parser'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Config middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    try {
        res.render("index", {json: "",converted: ""})
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
})

app.post("/", (req, res)=>{
    try {
        const { json } = req.body;
        const parsedJSON = JSON.parse(json)
        const output = JSON.stringify(parsedJSON, null, 2).replace(/"/g, '\\"')
        res.render("index", {json, converted: '"'+ output +'"'})
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})


//404 Error
app.use((req, res) => {
    res.status(404).send("Not Foud :C")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
