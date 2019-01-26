




app.get("/login",function (req,res) {
    const {username,password}=req.params;
    const sql=`
      select count(1) c from employee where username='${username}' and password='${password}'; 
    `
    M.doSql(sql,(u)=>{
        if(u.data[0][0].c==1){
            res.send(M.result('登陆成功'));
        }else{
            res.send(M.result("登陆失败",false));
        }
    })
})






