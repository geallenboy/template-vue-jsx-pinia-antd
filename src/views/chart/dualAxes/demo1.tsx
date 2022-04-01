import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { DualAxesChart } from '@/components/chart';
import {
  _data1,
  uvBillData,
  transformData,
  _data2,
  uvData,
  transformData2,
  columnData,
  lineData,
} from './data';

export default defineComponent({
  name: 'ChartDualAxesDemo1',
  setup() {
    const list1 = reactive({ data: _data1 });
    const list2 = reactive({ data: _data2 });
    const list3 = reactive({ data: _data1 });
    const list4 = reactive({ data: _data1 });

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="双折线图">
              {list1.data.length > 0 ? (
                <DualAxesChart
                  {...{
                    autoFit: true,
                    xField: 'year',
                    yField: ['value', 'count'],
                    geometryOptions: [
                      {
                        geometry: 'line',
                        color: '#5B8FF9',
                      },
                      {
                        geometry: 'line',
                        color: '#5AD8A6',
                      },
                    ],
                  }}
                  data={[list1.data, list1.data]}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="饼图-蜘蛛布局标签">
              {
                <DualAxesChart
                  {...{
                    xField: 'time',
                    yField: ['value', 'count'],
                    geometryOptions: [
                      {
                        geometry: 'line',
                        seriesField: 'type',
                        lineStyle: {
                          lineWidth: 3,
                          lineDash: [5, 5],
                        },
                        smooth: true,
                      },
                      {
                        geometry: 'line',
                        seriesField: 'name',
                        point: {},
                      },
                    ],
                  }}
                  data={[uvBillData, transformData]}
                />
              }
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="柱线混合图表">
              {list2.data.length > 0 ? (
                <DualAxesChart
                  {...{
                    autoFit: true,
                    xField: 'time',
                    yField: ['value', 'count'],
                    geometryOptions: [
                      {
                        geometry: 'column',
                      },
                      {
                        geometry: 'line',
                        lineStyle: {
                          lineWidth: 2,
                        },
                      },
                    ],
                  }}
                  data={[list2.data, list2.data]}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="柱线混合图表-显示多折线">
              {
                <DualAxesChart
                  {...{
                    xField: 'time',
                    yField: ['value', 'count'],
                    geometryOptions: [
                      {
                        geometry: 'column',
                        columnWidthRatio: 0.4,
                      },
                      {
                        geometry: 'line',
                        seriesField: 'name',
                      },
                    ],
                  }}
                  data={[uvData, transformData]}
                />
              }
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="堆叠柱线图表">
              <DualAxesChart
                {...{
                  autoFit: true,
                  xField: 'time',
                  yField: ['value', 'count'],
                  geometryOptions: [
                    {
                      geometry: 'column',
                      isStack: true,
                      seriesField: 'type',
                    },
                    {
                      geometry: 'line',
                    },
                  ],
                }}
                data={[uvBillData, transformData2]}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="堆叠柱线图表-显示多折线">
              {
                <DualAxesChart
                  {...{
                    xField: 'time',
                    yField: ['value', 'count'],
                    geometryOptions: [
                      {
                        geometry: 'column',
                        isStack: true,
                        seriesField: 'type',
                        columnWidthRatio: 0.4,
                      },
                      {
                        geometry: 'line',
                        seriesField: 'name',
                        lineStyle: ({ name }) => {
                          if (name === 'a') {
                            return {
                              lineDash: [1, 4],
                              opacity: 1,
                            };
                          }
                          return {
                            opacity: 0.5,
                          };
                        },
                      },
                    ],
                  }}
                  data={[uvBillData, transformData]}
                />
              }
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="分组柱线图表">
              <DualAxesChart
                {...{
                  autoFit: true,
                  xField: 'time',
                  yField: ['value', 'count'],
                  geometryOptions: [
                    {
                      geometry: 'column',
                      isGroup: true,
                      seriesField: 'type',
                    },
                    {
                      geometry: 'line',
                      lineStyle: {
                        lineWidth: 2,
                      },
                    },
                  ],
                }}
                data={[uvBillData, transformData2]}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="堆叠柱线图表-显示多折线">
              {
                <DualAxesChart
                  {...{
                    xField: 'time',
                    yField: ['value', 'count'],
                    geometryOptions: [
                      {
                        geometry: 'column',
                        isGroup: true,
                        seriesField: 'type',
                        columnWidthRatio: 0.4,
                      },
                      {
                        geometry: 'line',
                        seriesField: 'name',
                        lineStyle: ({ name }) => {
                          if (name === 'a') {
                            return {
                              lineDash: [1, 4],
                              opacity: 1,
                            };
                          }
                          return {
                            opacity: 0.5,
                          };
                        },
                      },
                    ],
                  }}
                  data={[uvBillData, transformData]}
                />
              }
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={24} class="pdr10">
            <Card title="堆叠分组柱状图-折线图">
              <DualAxesChart
                {...{
                  autoFit: true,
                  xField: 'month',
                  yField: ['value', 'value'],
                  geometryOptions: [
                    {
                      geometry: 'column',
                      isGroup: true,
                      isStack: true,
                      seriesField: 'type',
                      groupField: 'name',
                    },
                    {
                      geometry: 'line',
                      seriesField: 'name',
                      isStack: true,
                      smooth: true,
                    },
                  ],
                }}
                data={[columnData, lineData]}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
