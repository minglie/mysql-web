var mysql  = require('mysql');
var path=require('path');
var M=require("ming_node")

var applicationConfig;


try{
    applicationConfig=M.getObjByFile(path.join(__dirname, "../../applicationConfig.json"));
}catch (e){
    applicationConfig={
        "myDbconfig":{
            "host"     : "127.0.0.1",
            "user"     : "root",
            "password" : "123456",
            "port"     : "3306",
            "database" : "aos_agri_decision"
        }
    }
}


var myDbconfig=applicationConfig.myDbconfig;


var Db = mysql.createConnection(myDbconfig);
Db.myDbconfig=myDbconfig;
Db.display_sql_enable=true;
Db.do_sql_enable=true;
Db.connect();

function doSql(sql){
    var promise = new Promise(function(reslove,reject){
        if(Db.display_sql_enable) M.log(sql+";")
        if(Db.do_sql_enable){
            Db.query(sql,
                function (err, result) {
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    reslove(result);
                });
        }
    })
    return promise;
}

Db.doSql=doSql;

module.exports=Db;

if(0)
    +async function(){
    k= await Db.getUpdateObjectSql("aos_sys_user",{id:7,user_name:'zs',user_birth:'2015-11-02',user_salary:21},{name:"zs",age:8,kk:"dfsasf"})
    console.log(JSON.stringify(k))
}();


