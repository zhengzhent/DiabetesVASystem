/**
 * A recreation of this demo: https://observablehq.com/@d3/parallel-coordinates
 */
// import { Chart } from '@antv/g2';

const axis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  labelStroke: '#ffffff',
  labelFill:'#ffffff',
  labelStrokeWidth: 2,
  labelFontSize: 25,
  labelStrokeLineJoin: 'bevel',
  titleStroke: '#ffffff',
  titleFill:'#ffffff',
  titleFontSize: 20,
  titleStrokeWidth: 2,
  titleStrokeLineJoin: 'bevel',
  titleTransform: 'translate(-50%, 0) rotate(-90)',
  lineStroke: 'White',
  tickStroke: 'White',
  lineStrokeWidth: 2,
};

const chart = new G2.Chart({
container: 'parallel-container',
autoFit: true,

});

chart.coordinate({ type: 'parallel' });

chart
.line()
.data({
  type: 'fetch',
  value: 'assets1/staticdata/parallel.json',
})
.scale('color', { palette: 'inferno' })
// // 轴标签Demo
// .encode('position', [  
//   'economy (mpg)',
//   'cylinders',
//   'displacement (cc)',
//   'power (hp)',
//   'weight (lb)',
//   '0-60 mph (s)',
//   'year',
// ])
// 轴标签
.encode('position', [
  'RBC(1012/L)',
  'CREA(umol/L)',  
  'Age',
  'LDL--C',
  'WBC(×109/L)',
  'PPBP-2h(mmol/L)',
  'PPInsulin-2h(pmol/l)',
])
// 颜色映射到weight(lb)
.encode('series', 'Class')
.encode('color', 'Class')
.style('shape', 'smooth')
// 线的宽度和不透明度
.style('strokeWidth', 2)
.style('strokeOpacity', 0.3)
// 设置颜色比例尺和调色板
//设置图例 不能拖动？
// 设置轴
.axis('position', axis)
.axis('position1', axis)
.axis('position2', axis)
.axis('position3', axis)
.axis('position4', axis)
.axis('position5', axis)
.axis('position6', axis)
.axis('position7', axis)
.legend({
  color: { itemMarkerSize: 20,itemLabelFontSize:20,itemLabelFill: '#ffffff',layout: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },},
});

chart.interaction('tooltip', { series: false,
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
  },});

chart.render();