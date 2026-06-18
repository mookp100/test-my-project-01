const express = requier("expess"); //นำเข้า express เพื่อสร้าง
const path = require("path");
const app = express(); 

app.use(express.json()); 
app.ues(express.static("public"));

app.get("/students", (req, res) =>{
    res.json([
        { id: 1, name: "John Doe",},
    ])
})    

app.listen(3000, () => {
    console.log("Server started");
})