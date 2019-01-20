function convertEasyUITree(resList,resultRes,ids) {
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
                convertEasyUITree(resList[i].childrens,r.children,ids)
            }
        }
    }
}





(function() {

    function init(){
        $('#resourceDataGrid').datagrid({
            title:"资源管理",
            url:"/listByPage",
            width:10000,
            rownumbers:true,//使能行号列
            toolbar:"#resourceDataGridToolButton",//顶部显示的工具栏
            pagination:true,//显示分页工具栏
            pageSize:10,//在设置分页属性的时候初始化页面大小。
            pageList:[5,7,10,50],//在设置分页属性的时候 初始化页面大小选择列表。
            //行样式
            rowStyler:function(rowIndex,rowData){
                if(rowData.id%2==0){
                    return "background-color:pink";
                }
            },
            //列
            columns:[[
                {checkbox:true},
                {field:'id',title:'id',width:100},
                {field:'parent_id',title:'父id',width:100},
                {field:'keyword',title:'关键字',width:100},
                {field:'name',title:'资源名字',width:100},
                {field:'gmt_create',title:'创建时间',width:100}
            ]]
        });

    }


    function resourceTreeInit() {
        M.IO.getConfigTree().then((d)=>{
                let r=[];
                convertEasyUITree(d,r,[0]);
               // console.log(d,r)
                $('#resourceTree').tree({
                    data:r,
                    checkbox: true,
                    onlyLeafCheck: false,//仅叶子节点可以被选中
                    cascadeCheck : false,//false取消关联, true可以关联
                    onContextMenu:function(e, node){
                        e.preventDefault();
                        var id = node.id;
                        var rightbuttonobj =  $('#rightclickdiv');
                        rightbuttonobj.menu('show', {
                            left: e.pageX,
                            top: e.pageY
                        });
                        rightbuttonobj.menu({
                            onClick:function(item){
                                console.log(node)
                                if( item.name == '001' ){
                                    $("#addDialog [name='parent_id']").val(node.id);
                                    $('#addDialog').dialog("open");//打开添加对话框
                                }else if( item.name == '002' ){
                                    $("#updateDialog [name='res_id']").val(node.id);
                                    $("#updateDialog [name='keyword']").val(node.keyword);
                                    $("#updateDialog [name='parent_id']").val(node.parent_id);
                                    $("#updateDialog [name='name']").val(node.name);
                                    $('#updateDialog').dialog("open");//打开添加对话框

                                }else if(item.name == '003' ){
                                    M.IO.delete({ids:[node.id]});
                                    $('#resourceDataGrid').datagrid('reload');// 重新载入数据
                                    resourceTreeInit();

                                }
                            }
                        });


                    }
                });
            }
        );
    }










//初始化myDataGridEND

    //初始化添加对话框START
    function initAddDialog(){
        //添加对话框
        $('#addDialog').dialog({
            title: '添加资源',
            width: 300,
            height: 200,
            closed: true,
            cache: false,
            modal: true  ,
            buttons:"#addDialogButtons"
        });
    }
//初始化添加对话框END



//初始化修改对话框START
    function initUpdateDialog(){
        //修改对话框
        $('#updateDialog').dialog({
            title: '修改资源',
            width: 300,
            height: 200,
            closed: true,
            cache: false,
            modal: true  ,
            buttons:"#updateDialogButtons"
        });

    }
//初始化修改对话框END


//事件绑定START
    $(function(){
        //DataGrid添加按钮
        $("#resourceDataGridToolButton [name='add']").click(
            function(){

                var row=$('#resourceDataGrid').datagrid("getSelections");
                console.log(row)
                if(row.length>0){
                    $("#addDialog [name='parent_id']").val(row[0].id);
                }else{
                    $("#addDialog [name='parent_id']").val(-1);
                }

                $('#addDialog').dialog("open");//打开添加对话框
            }
        );

        //DataGrid删除按钮
        $("#resourceDataGridToolButton [name='remove']").click(function() {
            var row = $('#resourceDataGrid').datagrid("getSelections");
            if (row.length == 0) {
                $.messager.alert('我的消息', '请先选择删除！', 'info');
            } else {
                $.messager.confirm('温馨提示', '确认删除选择的内容？', function(r) {
                    let ids=row.map(u=>u.id);
                    M.IO.delete({ids});
                    $('#resourceDataGrid').datagrid('reload');// 重新载入数据
                    resourceTreeInit();
                });

            }
        });

        //DataGrid修改按钮
        $("#resourceDataGridToolButton [name='update']").click(
            function(){
                var row=$('#resourceDataGrid').datagrid("getSelections");
                if(row.length==1){
                    $("#updateDialog [name='res_id']").val(row[0].id);
                    $("#updateDialog [name='keyword']").val(row[0].keyword);
                    $("#updateDialog [name='parent_id']").val(row[0].parent_id);
                    $("#updateDialog [name='name']").val(row[0].name);
                    $('#updateDialog').dialog("open");//打开添加对话框

                }else{//不是选择了一行
                    $.messager.alert('我的消息','请选择一行进行修改！','info');
                }
            }
        );


        //添加对话框上的添加按钮
        $("#addDialogButtons [name='add']").click(
            function(){
                var name=$("#addForm [name='name']").val();
                var keyword=$("#addForm [name='keyword']").val();
                parent_id=$("#addForm [name='parent_id']").val();
                M.IO.add(
                    {
                        parent_id,
                        keyword,
                        name
                    }
                ).then((d)=>{
                    if(d.success==false){
                        $.messager.alert('我的消息',d.data,'info');
                    }
                });
                $('#resourceDataGrid').datagrid('reload');// 重新载入数据
                resourceTreeInit();
                $('#addDialog').dialog("close");//关闭添加对话框
            }
        );

        //添加对话框上的取消按钮
        $("#addDialogButtons [name='cancel']").click(
            function(){
                $('#addDialog').dialog("close");//关闭添加对话框
            }
        );

        //更改对话框上的 更改按钮
        $("#updateDialogButtons [name='update']").click(
            function(){
                var id=$("#updateForm [name='res_id']").val();
                var name=$("#updateForm [name='name']").val();
                var keyword=$("#updateForm [name='keyword']").val();

                M.IO.update(
                    {
                        id,
                        keyword,
                        name
                    }
                );
                $('#resourceDataGrid').datagrid('reload');// 重新载入数据
                resourceTreeInit();
                $('#updateDialog').dialog("close");//关闭添加对话框
            }
        );

        //更改对话框上的取消按钮
        $("#updateDialogButtons [name='cancel']").click(
            function(){
                $('#updateDialog').dialog("close");
            }
        );




    })
//事件绑定END

    //页面初始化
    $(function(){
        init();//初始化DataGrid
        resourceTreeInit();
        initAddDialog();//初始化添加对话框
        initUpdateDialog();//初始化修改对话框
    })

})();
