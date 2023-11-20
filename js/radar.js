function createChartA() {const data = [
    { item: 'hypertension', issuffer: 0},
    { item: 'Cerebrovascular disease', issuffer: 0},
    { item: 'Cardiovascular disease', issuffer: 0},
    { item: 'retinopathy', issuffer: 0},
    { item: 'Diabetic nephropathy', issuffer: 0},
    { item: 'Peripheral neuropathy', issuffer: 0},
    { item: 'Diabetic ketosis', issuffer: 0},
    { item: 'Diabetic foot', issuffer: 0},
    { item: 'Skin infection', issuffer: 0},
  ];
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['issuffer'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });

  const chart = new G2.Chart({
    container: 'exceptions',
    autoFit: true,
    height: 400,
  });
  chart.data(dv.rows);
  chart.scale('score', {
    min: -1,
    max: 1,
  });
  chart.coordinate('polar', {
    radius: 0.8,
  });
  chart.tooltip({
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      line: {
        style: {
          lineDash: [4, 4],
          stroke: '#333'
        }
      }
    }
  });
  chart.axis('item', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  });
  chart.axis('score', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
        },
      },
    },
  });

  chart
    .line()
    .position('item*score')
    .color('user')
    .size(2);
  chart
    .point()
    .position('item*score')
    .color('user')
    .shape('circle')
    .size(4)
    .style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1,
    });
  chart
    .area()
    .position('item*score')
    .color('user');
  chart.render();
}

function createChartB() {const data = [
    { item: 'Fasting blood glucose', Actualvalue: 18.4,Expectedvalue:6.1},
    { item: 'Glycosylated hemoglobin', Actualvalue: 15.5,Expectedvalue:7},
    { item: 'TC', Actualvalue: 5.1,Expectedvalue:5.98},
    { item: 'TG', Actualvalue: 1.21,Expectedvalue:1.70},
    { item: 'LDL-C', Actualvalue: 3.05,Expectedvalue:3.37},
    { item: 'HDL-C', Actualvalue: 1.65,Expectedvalue:1.55},
  ];
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['Actualvalue','Expectedvalue'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });

  const chart = new G2.Chart({
    container: 'exceptions',
    autoFit: true,
    height: 400,
  });
  chart.data(dv.rows);
  chart.scale('score', {
    min: 0,
    max: 20,
  });
  chart.coordinate('polar', {
    radius: 0.8,
  });
  chart.tooltip({
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      line: {
        style: {
          lineDash: [4, 4],
          stroke: '#333'
        }
      }
    }
  });
  chart.axis('item', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  });
  chart.axis('score', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
        },
      },
    },
  });

  chart
    .line()
    .position('item*score')
    .color('user')
    .size(2);
  chart
    .point()
    .position('item*score')
    .color('user')
    .shape('circle')
    .size(4)
    .style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1,
    });
  chart
    .area()
    .position('item*score')
    .color('user');
  chart.render();
}

function createChartC() {const data = [
    { item: 'asymptomatic', issuffer: 1},
    { item: 'Adverse drug reaction', issuffer: 0},
    { item: 'Hypoglycemic reaction', issuffer: 0},
  ];
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['issuffer'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });

  const chart = new G2.Chart({
    container: 'exceptions',
    autoFit: true,
    height: 400,
  });
  chart.data(dv.rows);
  chart.scale('score', {
    min: -1,
    max: 1,
  });
  chart.coordinate('polar', {
    radius: 0.8,
  });
  chart.tooltip({
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      line: {
        style: {
          lineDash: [4, 4],
          stroke: '#333'
        }
      }
    }
  });
  chart.axis('item', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  });
  chart.axis('score', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
        },
      },
    },
  });

  chart
    .line()
    .position('item*score')
    .color('user')
    .size(2);
  chart
    .point()
    .position('item*score')
    .color('user')
    .shape('circle')
    .size(4)
    .style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1,
    });
  chart
    .area()
    .position('item*score')
    .color('user');
  chart.render();
}

document.addEventListener('DOMContentLoaded', function () {
    // 为select元素添加事件监听器
    const selectElement = document.getElementById('chart-options');
    selectElement.addEventListener('change', function () {
        // 获取选择的值
        const selectedValue = selectElement.value;

        // 清空现有图表容器
        const chartContainer = document.getElementById('exceptions');
        chartContainer.innerHTML = '';

        // 根据选择的值调用相应的图表生成函数
        if (selectedValue === 'option1') {
            createChartA();
        } else if (selectedValue === 'option2') {
            createChartB();
        } else if (selectedValue === 'option3') {
            createChartC();
        }
    });

    // 页面加载时基于默认选择的选项创建初始图表
    createChartA();
});