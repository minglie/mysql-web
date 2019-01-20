const maplist = (data) => {
    const databox = data.map((item) => {
        item.name1=item.name1+"_";
        return Object.assign({}, item, {
            key: item.id
        })
    });
    return databox;
};


const model={
    reducer:(defaultState = {
        tableTotal: 0,
        tableId: 0,
        tableCur: 1,
        tableSize: 10,
        Alldate: [],
        total: 0,
    },action)=>{
        switch(action.type) {
            case 'COM_ALLDATA' :
                const Alldate =maplist(action.dataAll);
                const total = action.total;
                return Object.assign({}, defaultState, {
                    Alldate: Alldate,
                    total: total
                });

        }
        return defaultState;
    },
    action:(dispatch)=> {
        return {
            Alldatas: (page) => {

                    M.IO.listByPage(page).then((d)=>{
                        d=d.data;
                        dispatch({
                            type: "COM_ALLDATA",
                            dataAll:d.rows,
                            total: d.total,
                        });

                    })
                }
            }
     }
};


const store= Redux.createStore(
    model.reducer
);
