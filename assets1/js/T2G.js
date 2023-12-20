
const chart = new G2.Chart({
    container: 'T2Gcompare',
    autoFit: true,
  });
  
  chart.coordinate({ type: 'polar', innerRadius: 0.25,  startAngle: -Math.PI / 2, // 起始弧度 
    endAngle: Math.PI * 4 / 3 });
  
  const data=
  [{'feature': 'RBC', 'importance': 0.12185077125, 'symbol': 'level1'},
  {'feature': 'CREA', 'importance': 0.2522231075, 'symbol': 'level1'},
  {'feature': 'Age', 'importance': 0.196324708, 'symbol': 'level1'},
  {'feature': 'LDL--C', 'importance': 0.2448421825, 'symbol': 'level1'},
  {'feature': 'WBC', 'importance': 0.10037459289999999, 'symbol': 'level1'},
  {'feature': '2H PG', 'importance': 0.19290611800000002, 'symbol': 'level1'},
  {'feature': '2H PI', 'importance': 0.14440483571428572, 'symbol': 'level1'},
  {'feature': 'FCp', 'importance': 0.16360839333333335, 'symbol': 'level1'},
  {'feature': '2H pCp', 'importance': 0.11525795000000001, 'symbol': 'level1'},
  {'feature': 'TC', 'importance': 0.20116094, 'symbol': 'level1'},
  {'feature': 'Neuter cell',
   'importance': 0.13379730428571432,
   'symbol': 'level1'},
  {'feature': 'TG', 'importance': 0.08748299818181816, 'symbol': 'level1'},
  {'feature': 'Fundus examination',
   'importance': 0.13860488285714287,
   'symbol': 'level1'},
  {'feature': 'BG recording', 'importance': 0.0969011116, 'symbol': 'level1'},
  {'feature': 'foot examination',
   'importance': 0.25047657500000003,
   'symbol': 'level1'},
   {'feature': 'RBC', 'importance': 0.12246317925, 'symbol': 'level2'},
 {'feature': 'CREA', 'importance': 0.28205691749999995, 'symbol': 'level2'},
 {'feature': 'Age', 'importance': 0.21889587800000002, 'symbol': 'level2'},
 {'feature': 'LDL--C', 'importance': 0.2859851125, 'symbol': 'level2'},
 {'feature': 'WBC', 'importance': 0.0973040212, 'symbol': 'level2'},
 {'feature': '2H PG', 'importance': 0.196900552, 'symbol': 'level2'},
 {'feature': '2H PI', 'importance': 0.14274418, 'symbol': 'level2'},
 {'feature': 'FCp', 'importance': 0.17892126666666666, 'symbol': 'level2'},
 {'feature': '2H pCp', 'importance': 0.09505199277777779, 'symbol': 'level2'},
 {'feature': 'TC', 'importance': 0.20101603199999998, 'symbol': 'level2'},
 {'feature': 'Neuter cell',
  'importance': 0.13807842214285715,
  'symbol': 'level2'},
 {'feature': 'TG', 'importance': 0.08804610009090909, 'symbol': 'level2'},
 {'feature': 'Fundus examination',
  'importance': 0.14461833571428576,
  'symbol': 'level2'},
 {'feature': 'BG recording', 'importance': 0.0935760227, 'symbol': 'level2'},
 {'feature': 'foot examination', 'importance': 0.2198543, 'symbol': 'level2'},
 {'feature': 'RBC', 'importance': 0.14677984824999998, 'symbol': 'level3'},
 {'feature': 'CREA', 'importance': 0.2863505625, 'symbol': 'level3'},
 {'feature': 'Age', 'importance': 0.23580247000000001, 'symbol': 'level3'},
 {'feature': 'LDL--C', 'importance': 0.25781748499999996, 'symbol': 'level3'},
 {'feature': 'WBC', 'importance': 0.0918279263, 'symbol': 'level3'},
 {'feature': '2H PG', 'importance': 0.22152977, 'symbol': 'level3'},
 {'feature': '2H PI', 'importance': 0.14664448785714287, 'symbol': 'level3'},
 {'feature': 'FCp', 'importance': 0.17188382499999996, 'symbol': 'level3'},
 {'feature': '2H pCp', 'importance': 0.10841443122222222, 'symbol': 'level3'},
 {'feature': 'TC', 'importance': 0.219632758, 'symbol': 'level3'},
 {'feature': 'Neuter cell',
  'importance': 0.13478257714285716,
  'symbol': 'level3'},
 {'feature': 'TG', 'importance': 0.09891078181818182, 'symbol': 'level3'},
 {'feature': 'Fundus examination',
  'importance': 0.13585822714285714,
  'symbol': 'level3'},
 {'feature': 'BG recording',
  'importance': 0.09111823420000001,
  'symbol': 'level3'},
 {'feature': 'foot examination', 'importance': 0.24237937, 'symbol': 'level3'}]
  chart
    .area()
    .data(data)
    .scale('y', { nice: true })
    .scale('color', { palette: 'tableau10' })
    .encode('x', 'feature')
    .encode('y', 'importance')
    .encode('shape', 'smooth')
    .encode('color', 'symbol')
    .encode('series', 'symbol')
    .style('lineWidth', 2)
    .style('fillOpacity', 0.3)
    .style('lineJoin', 'round')
    .style('strokeOpacity', 0)
    .legend({
        color: { itemMarkerSize: 20,itemLabelFontSize:20,itemLabelFill: '#ffffff'},
      })
    .axis('x', {
        labelFill: '#ffffff',
        titleFill:'#ffffff',
        labelFontSize: 16,
        titleFontSize: 16,
  })
    .axis('y',{title:false,labelFill: '#ffffff',
    titleFill:'#ffffff',
    labelFontSize: 16,
    titleFontSize: 16,})
chart.interaction('tooltip', { 
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
  chart.render();