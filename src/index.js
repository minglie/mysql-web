var M=require("ming_node");
M.log_file_enable=false; //不用打印日志到文件
var Db=require("./modules/ming_mysql");

var app=M.server();
app.listen(8888);

Db.display_sql_enable=false;

prefixSql=`
DROP PROCEDURE IF EXISTS p;    
CREATE PROCEDURE p()
BEGIN
    `;


SuffixSql=`
 END;
call p
 `;



app.get("/",async function (req,res) {
    app.redirect("/index.html",req,res);
});



app.post("/doSql",async function (req,res) {
   console.log(req.params);
   try{
       var rows= await Db.doSql(prefixSql+req.params.sql+SuffixSql);
       var r=rows.slice(2);
       console.log(JSON.stringify(r))
       res.send(M.result(r));
   }catch (e){
       res.send(M.result(e,false));
   }
})
