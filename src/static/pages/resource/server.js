

app.post("/listByPage",function (req,res) {
  const sql=` 
    select * from resource  limit  ${(req.params.page-1)*req.params.rows},${req.params.rows};  
    select count(1) c from resource;
  `;
  Context.doSql(sql,(d)=>{
      rows=d.data[0];
      total=d.data[1][0].c;
      res.send({rows,total});
  })

});



app.post("/add",function (req,res) {
    const {parent_id,keyword,name}=req.params;
    // sql=`
    //
    //      insert into resource(parent_id,keyword,name,longcode)
    //      (
    //             SELECT * from
    //             (
    //                         SELECT  '${parent_id}','${keyword}' keyword,'${name}' name,CONCAT(
    //                         (
    //                            SELECT IFNULL((SELECT longcode from resource WHERE id='${parent_id}'),'')),
    //                            '/',
    //                           (SELECT LPAD(right(IFNULL(max(longcode),0),6)+1,6,0) from  resource WHERE parent_id='${parent_id}')
    //                         )
    //             )t1
    //             where
    //             t1.name
    //             not in
    //             (
    //                 SELECT NAME from resource  where parent_id=${parent_id}
    //             )
    //             and
    //             t1.keyword
    //             not in
    //             (
    //                 SELECT keyword from resource
    //             )
    //             limit 1
    //          )
    //     ;
    // `;

    sql=`      
          
         insert into resource(parent_id,keyword,name,longcode) 
         (       
                SELECT * from
                (
                            SELECT  '${parent_id}','${keyword}' keyword,'${name}' name,CONCAT(
                            (
                               SELECT IFNULL((SELECT longcode from resource WHERE id='${parent_id}'),'')),
                               '/',
                              (SELECT LPAD(right(IFNULL(max(longcode),0),6)+1,6,0) from  resource WHERE parent_id='${parent_id}')
                            )
                )t1
                where
                t1.name 
                not in
                (
                    SELECT NAME from resource  where parent_id=${parent_id}
                )          
                limit 1 
             )    
        ;     
    `;

    Context.doSql(sql,(d)=>{
        r=d.data[0];
        if(r.affectedRows==0){
            res.send(M.result("名字或关键已存在",false));
        }else{
            res.send(M.result("添加成功"));
        }
    })
});




app.post("/update",function (req,res) {

    sql=M.Db().getUpdateObjSql("resource",req.params,{id:req.params.id})+";"

    Context.doSql(sql,(d)=>{
        r=d.data[0];
        res.send(r);
    })
});




app.get("/delete",function (req,res) {

    let sql=`      
        delete from resource where id in (${req.params.ids});
    `;

    Context.doSql(sql,(d)=>{
        r=d.data[0];
        res.send(r);
    })
});




function  getChildsById(id) {
    let sql=`      
        select * from resource where parent_id = ${id};
    `;
    var promise = new Promise(function(reslove,reject){
        Context.doSql(sql,(d)=>{
            reslove(d.data[0]);
        })

    });
    return promise;
}


async function getChilds(resource) {
    let resourceList =await getChildsById(resource.id);
    resource.childrens=resourceList;
    if(resourceList.length>0){
        for (let i=0;i<resourceList.length;i++){
            await getChilds(resourceList[i]);
        }
    }
}




async function getConfigTree(){
    resourceList=await getChildsById(-1);
    if(resourceList.length>0){
        for (let i=0;i<resourceList.length;i++){
           await getChilds(resourceList[i]);
        }

    }
    return resourceList;
}





app.get("/getChildsById",function (req,res) {

    let sql=`      
        delete from resource where id in (${req.params.ids});
    `;
    getChildsById(55).then(d=>res.send(d))

});




app.get("/getConfigTree",async function (req,res) {

    r=await getConfigTree();
    res.send(r);

});












