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
  height:1020,
  width:1750,
});

chart.coordinate({ type: 'parallel' });

chart
  .line()
  .data({
    type: 'fetch',
    value: 'assets1/data/paralleldemo.json',
  })
  // 轴标签
  .encode('position', [  
    'economy (mpg)',
    'cylinders',
    'displacement (cc)',
    'power (hp)',
    'weight (lb)',
    '0-60 mph (s)',
    'year',
  ])
  // 颜色映射到weight(lb)
  .encode('color', 'weight (lb)')
  // 线的宽度和不透明度
  .style('strokeWidth', 2)
  .style('strokeOpacity', 0.5)
  // 设置颜色比例尺和调色板
  .scale('color', {
    palette: 'inferno',
    offset: (t) => 1 - t,
  })
  //设置图例 不能拖动？
  .legend({
    color: { length: 400, layout: { justifyContent: 'center' } },
    handle:true,
    slidable:true,
    labelFontSize:20,
    labelStroke:'#ffffff'
  })
  // 设置轴
  .axis('position', axis)
  .axis('position1', axis)
  .axis('position2', axis)
  .axis('position3', axis)
  .axis('position4', axis)
  .axis('position5', axis)
  .axis('position6', axis)
  .axis('position7', axis);


chart.interaction('tooltip', { series: false });

chart.render();