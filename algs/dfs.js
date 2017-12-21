
(function (window, undefined) {
    
    const test_data = [{
        '<class>': 'msgroup',
        name: 'msgroup',
        frame: {
            x: 1,
            y: 1
        },
        layers: [{
            '<class>': 'msgroup',
            name: 'msgroup',
            frame: {
                x: 11,
                y: 11,
            },
            layers: [{
                frame: {
                    x: 12,
                    y: 12
                },
                '<class>': 'ms',
                name: 'ms'
            },
            {
                frame: {
                    x: 12,
                    y: 12
                },
                '<class>': 'ms',
                name: 'ms'
            },
            {
                frame: {
                    x: 12,
                    y: 12
                },
                '<class>': 'ms',
                name: 'ms'
            }]
        }]
    }]

    var treeNodes = [
       {
            id: 1,
            name: '1',
            children: [
                 {
                      id: 11,
                      name: '11',
                      children: [
                           {
                                id: 111,
                                name: '111',
                                children:[]
                           },
                           {
                                id: 112,
                                name: '112'
                           }
                      ]
                 },
                 {
                      id: 12,
                      name: '12',
                      children: []
                 }
            ],
            users: []
       },
       {
            id: 2,
            name: '2',
            children: [
                {
                    id: 22,
                    name: '22',
                    children: []
                }
            ]
       }
    ];

    //递归实现
    var parseTreeJson = function(treeNodes){
      if (!treeNodes || !treeNodes.length) return;

       for (var i = 0, len = treeNodes.length; i < len; i++) {

            var childs = treeNodes[i].children;

            console.log(treeNodes[i].id);

            if(childs && childs.length > 0){
                 parseTreeJson(childs);
            }
       }
    };

    console.log('------------- 递归实现 ------------------');
    // parseTreeJson(treeNodes);


    const dfs = (data) => {
        if(!data || !data.length) return
        
        let stack = []
        
        data.forEach(v => {
            stack.push(v)
        })

        //    Now the stack is copy data

        let _page

        while(stack.length) {
            // 获得最外层的object
            _page = stack.shift()

            // 匹配到时获取它的值，但后面还是要遍历，这样就可以直接获得最底层需要的元素
            if(_page['<class>'] != 'msgroup') {
                console.log(_page.frame)           
            }
            if(_page.layers && _page.layers.length) {
                stack = _page.layers.concat(stack)
            }
        }
    }

    console.log('------------- 非递归深度优先实现 ------------------');
    
    dfs(test_data)
})(global);