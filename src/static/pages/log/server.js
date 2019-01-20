app.post("/listByPage",function (req,res) {

    const sql=` 
    select * from log  limit  ${(req.params.startPage-1)*req.params.limit},${req.params.limit};  
    select count(1) c from log;
  `;
    Context.doSql(sql,(d)=>{
        rows=d.data[0];
        total=d.data[1][0].c;
        res.send(M.result({rows,total}));
    })

});

