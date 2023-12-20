/**
 * A recreation of this demo: https://observablehq.com/@d3/parallel-coordinates
 */
// import { Chart } from '@antv/g2';

const axis = {
    zIndex: 1,
    titlePosition: 'right',
    line: true,
    label:{
      offset:200,
      opacity:1
    },
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

const classaxis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  label:{
    offset:20
  },
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
  ticks:[1,2,3]
};
const chart = new G2.Chart({
  container: 'parallel-container',
  // autoFit: true,
  height:1030,
  width:1770,
});

chart.coordinate({ type: 'parallel' });

chart
  .line()
  .data({
    type: 'fetch',
    value: 'assets1/data/parallelCoordinates_Data.json',
  })
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
    'Age',
    'LDL--C',
    'WBC(×109/L)',
    'PPBP-2h(mmol/L)',
    'PPInsulin-2h(pmol/l)',
    'Class',
  ])
  // 颜色映射到weight(lb)
  .encode('color', 'Class')
  // 线的宽度和不透明度
  .style('strokeWidth', 5)
  .style('strokeOpacity', 0.6)
  // 设置颜色比例尺和调色板
  .scale('color', {
    // palette: 'inferno',
    palette: 'plasma',
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
  // .axis('position', axis)
  // .axis('position1', axis)
  // .axis('position2', axis)
  // .axis('position3', axis)
  // .axis('position4', axis)
  // .axis('position5', axis)
  // .axis('position6', axis)
  // .axis('position7', axis);

  .axis('position', axis)
  .axis('position1', axis)
  .axis('position2', axis)
  .axis('position3', axis)
  .axis('position4', axis)
  .axis('position5', axis)
  .axis('position6', classaxis)
  .axis('position7', axis);


chart.interaction('tooltip', { series: false});

chart.render();