(function() {
    function initDataGrid(){
        $('#roleDataGrid').datagrid({
            title:"角色管理",
            url:"/listByPage",
            width:10000,
            rownumbers:true,//使能行号列
            toolbar:"#roleDataGridToolButton",//顶部显示的工具栏
            pagination:true,//显示分页工具栏
            pageSize:10,//在设置分页属性的时候初始化页面大小。
            pageList:[5,7,10],//在设置分页属性的时候 初始化页面大小选择列表。
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
                {field:'role_code',title:'角色编码',width:100},
                {field:'role_name',title:'角色名字',width:100},
                {field:'gmt_create',title:'创建时间',width:100}
            ]]
        });
    }
//初始化myDataGridEND

    //初始化添加对话框START
    function initAddDialog(){
        //添加对话框
        $('#addDialog').dialog({
            title: '添加角色',
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
            title: '修改角色',
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
        $("#roleDataGridToolButton [name='add']").click(
            function(){
                $('#addDialog').dialog("open");//打开添加对话框
            }
        );

        //DataGrid删除按钮
        $("#roleDataGridToolButton [name='remove']").click(function() {
            var row = $('#roleDataGrid').datagrid("getSelections");
            if (row.length == 0) {
                $.messager.alert('我的消息', '请先选择删除！', 'info');
            } else {
                $.messager.confirm('温馨提示', '确认删除选择的内容？', function(r) {
                    let ids=row.map(u=>u.id);
                    M.IO.delete({ids});
                    $('#roleDataGrid').datagrid('reload');// 重新载入数据
                });

            }
        });

        //DataGrid修改按钮
        $("#roleDataGridToolButton [name='update']").click(
            function(){
                var row=$('#roleDataGrid').datagrid("getSelections");
                if(row.length==1){
                    $("#updateDialog [name='role_id']").val(row[0].id);
                    $("#updateDialog [name='role_code']").val(row[0].role_code);
                    $("#updateDialog [name='role_name']").val(row[0].role_name);
                    $('#updateDialog').dialog("open");//打开添加对话框

                }else{//不是选择了一行
                    $.messager.alert('我的消息','请选择一行进行修改！','info');
                }
            }
        );


        //添加对话框上的添加按钮
        $("#addDialogButtons [name='add']").click(
            function(){
                var role_name=$("#addForm [name='role_name']").val();
                var role_code=$("#addForm [name='role_code']").val();

                M.IO.add(
                    {

                        role_code,
                        role_name
                    }
                );
                $('#roleDataGrid').datagrid('reload');// 重新载入数据
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




                var role_name=$("#updateForm [name='role_name']").val();
                var role_code=$("#updateForm [name='role_code']").val();
                var id=$("#updateForm [name='role_id']").val();


                M.IO.update(
                    {
                        id,
                        role_code,
                        role_name
                    }
                );
                $('#roleDataGrid').datagrid('reload');// 重新载入数据
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
        initDataGrid();//初始化DataGrid
        initAddDialog();//初始化添加对话框
        initUpdateDialog();//初始化修改对话框
    })

})();
