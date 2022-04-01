import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { PieChart } from '@/components/chart';
import { measureTextWidth } from '@antv/g2plot';
import { _data1, _data2 } from './data';

export default defineComponent({
  name: 'ChartPieDemo1',
  setup() {
    const list1 = reactive({ data: _data1 });
    const list2 = reactive({ data: _data1 });
    const list3 = reactive({ data: _data1 });
    const list4 = reactive({ data: _data1 });

    const renderStatistic = (containerWidth: any, text: any, style: any) => {
      const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
      const R = containerWidth / 2;
      let scale = 1;
      if (containerWidth < textWidth) {
        scale = Math.min(
          Math.sqrt(
            Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
          ),
          1,
        );
      }
      const textStyleStr = `width:${containerWidth}px;`;
      return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
        scale < 1 ? 1 : 'inherit'
      };">${text}</div>`;
    };

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="饼图">
              {list1.data.length > 0 ? (
                <PieChart
                  {...{
                    autoFit: true,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 0.9,
                    appendPadding: 10,
                    label: {
                      type: 'inner',
                      offset: '-30%',
                      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
                      style: {
                        fontSize: 14,
                        textAlign: 'center',
                      },
                    },
                    interactions: [{ type: 'element-active' }],
                  }}
                  data={list1.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="饼图-蜘蛛布局标签">
              {list2.data.length > 0 ? (
                <PieChart
                  {...{
                    autoFit: true,
                    appendPadding: 10,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 0.75,
                    label: {
                      type: 'spider',
                      labelHeight: 28,
                      content: '{name}\n{percentage}',
                    },
                    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
                  }}
                  data={list2.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
        </Row>
        <Row class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="四分之一圆">
              {list3.data.length > 0 ? (
                <PieChart
                  {...{
                    autoFit: true,
                    appendPadding: 10,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 1,
                    // 设置圆弧起始角度
                    startAngle: Math.PI,
                    endAngle: Math.PI * 1.5,
                    label: {
                      type: 'inner',
                      offset: '-8%',
                      content: '{name}',
                      style: { fontSize: 18 },
                    },
                    interactions: [{ type: 'element-active' }],
                    pieStyle: {
                      lineWidth: 0,
                    },
                  }}
                  data={list3.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="环图统计指标卡">
              {list4.data.length > 0 ? (
                <PieChart
                  {...{
                    autoFit: true,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 1,
                    innerRadius: 0.64,
                    meta: {
                      value: {
                        formatter: (v) => `${v} ¥`,
                      },
                    },
                    label: {
                      type: 'inner',
                      offset: '-50%',
                      style: {
                        textAlign: 'center',
                      },
                      autoRotate: false,
                      content: '{value}',
                    },
                    statistic: {
                      title: {
                        offsetY: -4,
                        customHtml: (container: any, view: any, datum: any) => {
                          const { width, height } = container.getBoundingClientRect();
                          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                          const text = datum ? datum.type : '总计';
                          return renderStatistic(d, text, { fontSize: 28 });
                        },
                      },
                      content: {
                        offsetY: 4,
                        style: {
                          fontSize: '32px',
                        },
                        customHtml: (container: any, view: any, datum: any, data: any) => {
                          const { width } = container.getBoundingClientRect();

                          const text = datum
                            ? `¥ ${datum.value}`
                            : `¥ ${data.reduce((r: any, d: any) => r + d.value, 0)}`;
                          return renderStatistic(width, text, { fontSize: 32 });
                        },
                      },
                    },
                    // 添加 中心统计文本 交互
                    interactions: [
                      { type: 'element-selected' },
                      { type: 'element-active' },
                      { type: 'pie-statistic-active' },
                    ],
                  }}
                  data={list4.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
