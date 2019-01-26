
const Context={}




{
    Context.resource={};
    Context.resource.convertEasyUITree=function(resList,resultRes,ids) {
        if(resList){
            for (let i=0;i<resList.length;i++){
                if(1){
                    var r={};

                    r.parent_id=resList[i].parent_id;
                    r.keyword=resList[i].keyword;
                    r.name=resList[i].name;
                    r.id=resList[i].id;
                    r.text=resList[i].id+"  "+resList[i].name;
                    r.checked=false;
                    r.state=null;
                    if(ids.indexOf(resList[i].id)>=0)r.checked=true;
                    else   r.checked=false;
                    resultRes.push(r);
                    r.children=[];
                    Context.resource.convertEasyUITree(resList[i].childrens,r.children,ids)
                }
            }
        }
    };

    Context.resource.getChildsById=function(id){
        let sql=`      
          select * from resource where parent_id = ${id};
        `;
        var promise = new Promise(function(reslove,reject){
            M.doSql(sql,(d)=>{
                reslove(d.data[0]);
            })

        });
        return promise;
    }


    Context.resource.getChilds=async function(resource) {
        let resourceList =await Context.resource.getChildsById(resource.id);
        resource.childrens=resourceList;
        if(resourceList.length>0){
            for (let i=0;i<resourceList.length;i++){
                await Context.resource.getChilds(resourceList[i]);
            }
        }
    };

    Context.resource.getConfigTree=async function (){
        resourceList=await Context.resource.getChildsById(-1);
        if(resourceList.length>0){
            for (let i=0;i<resourceList.length;i++){
                await Context.resource.getChilds(resourceList[i]);
            }

        }
        return resourceList;
    };
}






app.begin(function (req) {
    console.log("==>",req.params)
})


app.end(function (d) {

   console.log("<==",d)
})





