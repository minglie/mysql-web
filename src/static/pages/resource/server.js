

app.post("/listByPage",function (req,res) {
  const sql=` 
    select * from resource  limit  ${(req.params.page-1)*req.params.rows},${req.params.rows};  
    select count(1) c from resource;
  `;
  M.doSql(sql,(d)=>{
      rows=d.data[0];
      total=d.data[1][0].c;
      res.send({rows,total});
  })

});



app.post("/add",function (req,res) {
    const {parent_id,keyword,name}=req.params;

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

    M.doSql(sql,(d)=>{
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

    M.doSql(sql,(d)=>{
        r=d.data[0];
        res.send(r);
    })
});



//存储过程遍历数组
app.get("/delete",function (req,res) {

    let sql=`    
 DECLARE cur_id varchar(200);
 SET @array_content="${req.params.ids}";  
 SET @i=1;  
 
 SET @count = CHAR_LENGTH(@array_content)-CHAR_LENGTH(REPLACE(@array_content,',','')) + 1; 
 WHILE @i <= @count  
 DO  	
 SELECT  SUBSTRING_INDEX(SUBSTRING_INDEX(@array_content,',',@i),',',-1) into cur_id;
 SET @i=@i+1; 
 DELETE from resource 
		WHERE id in(
	 SELECT id from(
		 SELECT t2.id from resource t2 WHERE longcode like  CONCAT((SELECT longcode from resource t1 WHERE t1.id=cur_id),'%')
	 )t3
);
 END WHILE; 
    `;

    M.doSql(sql,(d)=>{
        r=d.data[0];
        res.send(r);
    })
});






app.get("/getChildsById",function (req,res) {

    Context.resource.getChildsById(55).then(d=>res.send(d))

});




app.get("/getConfigTree",async function (req,res) {

    r=await  Context.resource.getConfigTree();
    res.send(r);

});












