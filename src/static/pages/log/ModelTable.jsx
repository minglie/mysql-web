const {Table, Button, message} =antd;


class ModelTable extends React.Component {
    constructor(props) {
        super(props);
        console.log(props,"谁说的");
        this.columns = [
                {
                        title: 'id',
                        dataIndex: 'id',
                        key: 'id',
                        render: text => <a href="#"> { text } </a>
                },
                {
                    title: 'name',
                    dataIndex: 'name',
                    key: 'age',
                },
         ];
        window.m_this=this;

        this.m_props= model.action(store.dispatch);
        this.state={
            Alldate:[],
            total: 0,
        };

        store.subscribe(()=>{this.setState(store.getState())});
    }
    componentDidMount() {
            let current=1;
            let pageSize=10;
            this.m_props.Alldatas(
            {
                startPage: current,
                limit: pageSize
            }
        );
    };
    onChange(current, pageSize) {
            m_this.m_props.Alldatas(
            {
                startPage: current,
                limit: pageSize
            }
        );
    }

    render() {

            return (
                <div>
                       <Button>添加</Button>

                       <Table dataSource={this.state.Alldate} columns={this.columns} pagination={false} />
                        <br/>
                        <antd.Pagination
                        showSizeChanger showQuickJumper
                        defaultCurrent={1}
                        total={this.state.total}
                        onChange={this.onChange}
                        pageSizeOptions={["5","10","20"]}
                        />
                </div>
            )
    }

}

