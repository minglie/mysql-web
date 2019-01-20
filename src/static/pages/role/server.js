



app.get("/getConfigTree",async function (req,res) {

    r=await Context.resource.getConfigTree();
    res.send(r);

});




app.post("/listByPage",function (req,res) {
  const sql=` 
    select * from role  limit  ${(req.params.page-1)*req.params.rows},${req.params.rows};  
    select count(1) c from role;
  `;
  Context.doSql(sql,(d)=>{
      rows=d.data[0];
      total=d.data[1][0].c;
      res.send({rows,total});
  })

});





app.post("/add",function (req,res) {
    sql=M.Db().getInsertObjSql("role",req.params)+";"

    Context.doSql(sql,(d)=>{
        r=d.data[0];
        res.send(r);
    })
});



app.post("/update",function (req,res) {

    sql=M.Db().getUpdateObjSql("role",req.params,{id:req.params.id})+";"

    Context.doSql(sql,(d)=>{
        r=d.data[0];
        res.send(r);
    })
});



app.get("/delete",function (req,res) {

    let sql=`      
        delete from role where id in (${req.params.ids});
    `;

    Context.doSql(sql,(d)=>{
        r=d.data[0];
        res.send(r);
    })
});