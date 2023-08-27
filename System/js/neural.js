var nodes = [
    { id: 1, label: '输入层\n特征1' },
    { id: 2, label: '输入层\n特征2' },
    { id: 3, label: '隐藏层\n神经元1' },
    { id: 4, label: '隐藏层\n神经元2' },
    { id: 5, label: '输出层\n结果' },
  ];
  
  var edges = [
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];
  
  // 创建一个数据对象
  var data = {
    nodes: nodes,
    edges: edges,
  };
  
  // 设置网络的选项
  var options = {
    nodes: {
      shape: 'box',
      font: {
        size: 14,
      },
    },
    edges: {
      arrows: 'to',
    },
  };
  
  // 初始化网络
  var container = document.getElementById('neural');
  var network = new vis.Network(container, data, options);