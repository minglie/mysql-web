//20181202
(function(window, undefined) {
    var M={};
    var App = {
        reqMap:new Map(),
        resMap: new Map(),

        // 缓存ajax方法
        ajax: $.ajax,
        _get:{},
        _post:{},
        _begin:function(){},
        _end:function(){},

        begin(callback){
            App._begin=callback;
        },
        end(callback){
            App._end=callback;
        },
        /**
         * 注册get方法
         */
        get(string,callback){
            //在M.IO上注册一个方法
            M.IO.reg(string.replace("/",""),"get");
            string=M.formatUrl(string);
            App._get[string]=callback;
        },
        /**
         * 注册post方法
         */
        post(string,callback){
            M.IO.reg(string.replace("/",""),"post");
            string=M.formatUrl(string);
            App._post[string]=callback;
        },
        doget(pureUrl,options) {
            req={};
            res={};
            req.params= App.reqMap.get("get:"+pureUrl);
            req.method="get";
            req.pureUrl=pureUrl;
            if(Object.keys(req.params).length){
                req.url=pureUrl.substr(0,pureUrl.length-1)+"?"+M.urlStringify(req.params);
            }else {
                req.url=pureUrl;
            }
            res.send=function (d) {
                this.resMap.set("get:"+pureUrl,d);
                data = App.resMap.get(options.type+":"+pureUrl);
                App._end(data);
                options.success(data);
            }.bind(this);
            App._begin(req);
            App._get[pureUrl](req,res);
        },
        dopost(pureUrl,options){
            req={};
            res={};
            req.params= App.reqMap.get("post:"+pureUrl);
            req.method="post";
            req.pureUrl=pureUrl;
            req.url=pureUrl;
            res.send=function (d) {
                this.resMap.set("post:"+pureUrl,d);
                data = App.resMap.get(options.type+":"+pureUrl);
                App._end(data);
                options.success(data);
            }.bind(this);
            App._begin(req,res);
            App._post[pureUrl](req,res);
        }
    };







    /**
     * ----------------------其他工具函数START--------------------------------------------
     */
    M.sleep=function(numberMillis){
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    };

    /**
     * ----------------------服务器端START--------------------------------------------
     */
    M.get=function (url,param) {
         let u;
         M.ajax({
            url:url,
            async:false,
            type:'get',
            data:param,
            dataType:'json',
            success:function(data){
                u=data;
            }
        });
        return u;
    };


    M.post=function (url,param) {
        let u;
        M.ajax({
            url:url,
            async:false,
            type:'post',
            data:param,
            dataType:'json',
            success:function(data){
                u=data;
            }
        });
        return u;
    };



    M.result=function(data,success){
        var r={};
        if(success==false){
            r.code=3003;
            r.message="操作失败";
            r.success=success;
        }else{
            r.code=3002;
            r.message="操作成功";
            r.success=true;
        }
        try {
            var obj=JSON.parse(data);
            if(typeof obj == 'object' && obj ){
                r.data=obj;
            }else{
                r.data=data;
            }
        } catch(e) {
            r.data=data;
        }
        return r;
    };

    M.urlStringify=function (obj) {
        if (obj !== null && typeof obj === 'object') {
            var keys = Object.keys(obj);
            var len = keys.length;
            var flast = len - 1;
            var fields = '';
            for (var i = 0; i < len; ++i) {
                var k = keys[i];
                var v = obj[k];
                var ks =k+"=";
                fields += ks + v;
                if (i < flast)
                    fields += "&";
            }
            return fields;
        }
        return '';
    };

    M.urlParse=function(url){
        url=url.substr(url.indexOf("?")+1);
        var t, n, r, i = url, s = {};
        t = i.split("&"),
            r = null,
            n = null;
        for (var o in t) {
            var u = t[o].indexOf("=");
            u !== -1 && (r = t[o].substr(0, u),
                n = t[o].substr(u + 1),
                s[r] = n)
        }
        return s
    };

    /**
     * 去掉参数加让斜杠
     */
    M.formatUrl=function (url) {
        if(url.indexOf("?")>0){
            url=url.substr(0,url.indexOf("?"));
        }else {
            url=url;
        }
        if(!url.endsWith('/')){
            url=url+'/';
        }
        if(!url.startsWith('/')){
            url='/'+url;
        }
        return url;
    };

    M.getObjByFile=function(file){
        data=localStorage.getItem(file);
        var obj;
        if(data) obj=JSON.parse(data.toString());
        return obj;
    };
    M.writeObjToFile=function(file,obj){
        localStorage.setItem(file,JSON.stringify(obj))
    };

    M.addObjToFile=function(file,obj){
        try {
            var d=M.getObjByFile(file);
            M.writeObjToFile(file,[...d,obj]);
        }catch (e) {
            M.writeObjToFile(file,[obj]);
        }
    };
    M.deleteObjByIdFile=function(file,id){
        var d=M.getObjByFile(file);
        for(var i=0;i<d.length;i++){
            if(d[i].id==id){
                d.splice(i,1);
                break;
            }
        }
        M.writeObjToFile(file,d);
    };

    M.updateObjByIdFile=function(file,obj){
        var d=M.getObjByFile(file);
        for(var i=0;i<d.length;i++){
            if(d[i].id==obj.id){
                d.splice(i,1,obj);
                break;
            }
        }
        M.writeObjToFile(file,d);
    };

    //获取地址栏数据
    M.getParameter=function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    //说话函数
    M.speak=function (speakStr) {
        var myAudio = document.createElement("AUDIO");
        myAudio.src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=9&text="+speakStr;
        myAudio.type="audio/mpeg";
        myAudio.play();
    };

    /**
     *改写ajax方法
     */
    M.ajax = function(options) {
        d=M.urlParse(options.url);
        options.data=Object.assign(d,options.data);
        App.ajax({
            url: options.url,
            beforeSend(XHR) {
                let pureUrl=M.formatUrl(options.url);
                //往reqMap里加数据
                App.reqMap.set(options.type+":"+pureUrl,options.data);

                    if(options.type=="get"){
                        App.doget(pureUrl,options);
                    }else{
                        App.dopost(pureUrl,options);
                    }


                return false;
            },
            success(data) {

                options.success(data)
            }
        })
    };



    //服务方法注册
    M.IO={}
    M.IO.reg=function (methed,type) {
        M.IO[methed]=(param)=>{
            return new Promise(
                function(reslove) {
                    M.ajax({
                        url:"/"+methed,
                        data:param,
                        type:type,
                        success:function(data){
                            reslove(data)
                        }
                    });
                }
            )
        }
    }




    M.Db=function(dbname) {
        var Db={};
        Db.display_sql_enable=false;

        Db=openDatabase(dbname, '1.0', '', 2 * 1024 * 1024);

        Db.getInsertObjSql=function(tableName,obj){
            var fields="(";
            var values="(";
            for(let field in obj){
                fields+=field+",";
                values+=`'${obj[field]}'`+",";
            }
            fields=fields.substr(0,fields.lastIndexOf(","));
            values=values.substr(0,values.lastIndexOf(","));
            fields+=")";
            values+=")";
            let sql = "insert into "+tableName+fields+" values "+values;
            return sql;
        };

        Db.getDeleteObjSql=function(tableName,obj){
            var fields=[];
            for(let field in obj){
                fields.push(field);
            }
            let sql=`delete from ${tableName} where ${fields.map(u=> u+"='"+obj[u]+"'")}`;
            sql=sql.replace(/,/g," and ");
            return sql;
        };

        Db.getUpdateObjSql=function(tableName,obj,caseObj){
            var fields=[];
            for(let field in obj){
                if(field !="id")
                    fields.push(field);
            }
            let sql="";
            if(!caseObj){
                sql=`update ${tableName} set ${fields.map(u =>u + "='" + obj[u]+ "'")} where id=${obj.id}`;
            }else{
                var caseObjfields=[];
                for(let caseObjfield in caseObj){
                    caseObjfields.push(caseObjfield)
                }
                sql=`update ${tableName} set ${fields.map(u =>u + "='" + obj[u]+ "'")} where ${caseObjfields.map(u=> u+"='"+caseObj[u]+"'").join(" and ")}`;
            }

            return sql;
        };


        Db.getSelectObjSql=function(tableName,obj){
            var fields=[];
            for(let field in obj){
                fields.push(field);
            }
            let sql = `select * from ${tableName} where ${fields.map(u=> u+"='"+obj[u]+"'")}`;
            sql=sql.replace(/,/g," and ");
            return sql;
        };


        Db.doSql=function (sql) {
            if(Db.display_sql_enable) console.log(sql+";");
            var promise = new Promise(function(reslove,reject){
                   Db.transaction(function (context) {
                        context.executeSql(sql, [], function (context, results) {
                            reslove(results);
                        });
                    }, function (error) {
                        console.error(error.message);
                    }, function () {

                    });

            });
            return promise;
        };
        return Db;
    };

    window.app=App;
    window.M=M;


    $.ajax=M.ajax;



})(window);