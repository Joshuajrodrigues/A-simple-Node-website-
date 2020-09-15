var http = require ('http')
var fs = require('fs')
var url = require('url')

http.createServer((req,res)=>{

    var fileUrl = url.parse(req.url, true)
    var filePath =  "." + fileUrl.pathname +".html"
    
    console.log(filePath);
    if (filePath === './.html'){
        fs.readFile('index.html',(err,data)=>{
            res.write(data)
            res.end()
        })

    }else{
        fs.readFile(filePath, (err,data)=>{
            if(err){
                fs.readFile('404.html',(err,data)=>{
                    if (err) throw err;
                    res.writeHead(404,{'Content-type':'text/html'})
                    res.write(data)
                    return res.end()
                })
                return
            }
            res.writeHead(200,{'Content-Type':'text/html'})
            return res.end(data)
        })

    }
    


    }).listen(3000)