// const charttime = new G2.Chart({
//     container: 'times',
//     autoFit: true
//   });
  
//   charttime
//     .data({
//       type: 'fetch',
//       value: 'https://assets.antv.antgroup.com/g2/aapl2.json',
//       transform: [
//         {
//           type: 'map',
//           callback: (d) => ({
//             ...d,
//             Date: new Date(d.Date),
//           }),
//         },
//       ],
//     })
//     .scale('color', {
//       domain: [1, 0, -1],
//       range: ['#4daf4a', '#999999', '#e41a1c'],
//     });
  
//   charttime
//     .link()
//     .encode('x', 'Date')
//     .encode('y', ['Low', 'High'])
//     .encode('color', (d) => Math.sign(d.Close - d.Open)) // For LegendFilter.
//     .style('stroke', 'black')
//     .tooltip({
//       title: (d) => d.Date.toLocaleString(),
//       items: [
//         { field: 'Low', name: 'low' },
//         { field: 'High', name: 'high' },
//       ],
//     });
  
//   charttime
//     .link()
//     .encode('x', 'Date')
//     .encode('y', ['Open', 'Close'])
//     .encode('color', (d) => Math.sign(d.Close - d.Open))
//     .style('radius', 2)
//     .style('fillOpacity', 1)
//     .style('lineWidth', 4)
//     .style('lineCap', 'round')
//     .tooltip({
//       title: '',
//       items: [
//         { field: 'Open', name: 'open' },
//         { field: 'Close', name: 'close' },
//       ],
//     });
  
//   charttime.interaction('tooltip', { shared: true, groupName: false });
  
//   charttime.render();
const tableBody = document.getElementById('patients-data');

let patientsData; // 定义一个变量在全局存储病人数据

// 从JSON文件中获取病人数据
fetch('assets1/staticdata/information.json')
  .then(response => response.json())
  .then(data => {
    patientsData = data; // 将数据存储在全局变量中
  });

const dChart = (selectedPatient) => {
  fetch('assets1/staticdata/bloodglucose.json')
      .then(response => response.json())
      .then(data => {
          console.log(data);
          const selectedPatientData = data.filter(patient => patient.id === selectedPatient.ID);
const charttime = new G2.Chart({
    container: 'times',
    autoFit: true
  });


  charttime
    .data(selectedPatientData)
    .scale('color', {
      domain: [1, 0, -1],
      range: ['#4daf4a', '#999999', '#e41a1c'],
    });
  
  charttime
    .link()
    .encode('x', 'Date')
    .encode('y', ['low', 'high'])
    .encode('color', (d) => Math.sign(d.close - d.open)) // For LegendFilter.
    .style('stroke', 'white')
    .tooltip({
      title: (d) => d.Date.toLocaleString(),
      items: [
        { field: 'low', name: 'low' },
        { field: 'high', name: 'high' },
      ],
    });
  
  charttime
    .link()
    .encode('x', 'Date')
    .encode('y', ['open', 'close'])
    .encode('color', (d) => Math.sign(d.close - d.open))
    .style('radius', 10)
    .style('fillOpacity', 1)
    .style('lineWidth', 15)
    .style('lineCap', 'round')
    .tooltip({
      title: '',
      items: [
        { field: 'open', name: 'open' },
        { field: 'close', name: 'close' },
      ]
    })
    .legend({
      color: { itemMarkerSize: 20,itemLabelFontSize:20,itemLabelFill: '#ffffff'},
    })
  
  charttime
    .axis('x', {
      labelFill: '#ffffff',
      titleFill:'#ffffff',
      labelFontSize: 16,
      titleFontSize: 16,
    })
    .axis('y', {
      labelFill: '#ffffff',
      titleFill:'#ffffff',
      labelFontSize: 16,
      titleFontSize: 16,
    })


  
  charttime.interaction('tooltip', { 
    shared: true,
    css: {
      '.g2-tooltip': {
        background: '#eee',
        'border-radius': ' 0.25em !important',
      },
      '.g2-tooltip-title': {
        'font-size': '24px',
        'font-weight': 'bold',
        'padding-bottom': '0.25em',
      },
      '.g2-tooltip-list-item': {
        background: '#eee',
        padding: '0.25em',
        margin: '0.25em',
        'border-radius': '0.25em',
      },
      '.g2-tooltip-list-item-name-label': {
        'font-weight': 'bold',
        'font-size': '20px',
      },
      'g2-tooltip-list-item-marker': {
        'border-radius': '0.25em',
        width: '15px',
        height: '15px',
      },
      '.g2-tooltip-list-item-value': {
        'font-weight': 'bold',
        'font-size': '24px',
      },
    },
   });


   
  
  charttime.render();

      })
};


// 使用事件委托方式为表格添加点击事件监听器
tableBody.addEventListener('click', (event) => {
  const clickedRow = event.target.closest('tr');
  if (!clickedRow) return; // 点击的不是表格行

  const patientId = parseInt(clickedRow.children[0].textContent, 10);
  const selectedPatient = patientsData.find(patient => patient.ID === patientId);
  if (selectedPatient) {
      dChart(selectedPatient);
  }
});
