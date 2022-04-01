import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { ScatterChart } from '@/components/chart';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartScatterDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });
    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/aao6XnO5pW/IMDB.json',
      );
      list1.data = data1;
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/3e4db10a-9da1-4b44-80d8-c128f42764a8.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json',
      );
      list3.data = data3;
      const data4 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/f950b2f1-038b-47c2-afcc-63001bc8d07c.json',
      );
      const processData = data4.map((item: any) => {
        item['年平均工资'] = item['Average annual wage'] * 1;
        item['概率'] = item['probability'] * 1;
        item['就业人数'] = item['numbEmployed'] * 1;
        return item;
      });

      list4.data = processData;
    });
    const labels = ['航空公司飞行员、副驾驶和飞行工程师', '精力'];
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="散点图颜色映射">
              <ScatterChart
                {...{
                  appendPadding: 10,
                  xField: 'Revenue (Millions)',
                  yField: 'Rating',
                  shape: 'circle',
                  colorField: 'Genre',
                  size: 4,
                  yAxis: {
                    nice: true,
                    line: {
                      style: {
                        stroke: '#aaa',
                      },
                    },
                  },
                  xAxis: {
                    min: -100,
                    grid: {
                      line: {
                        style: {
                          stroke: '#eee',
                        },
                      },
                    },
                    line: {
                      style: {
                        stroke: '#aaa',
                      },
                    },
                  },
                }}
                data={list1.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="散点图图形标签">
              <ScatterChart
                {...{
                  appendPadding: 30,
                  xField: 'xG conceded',
                  yField: 'Shot conceded',
                  colorField: 'Result',
                  size: 5,
                  shape: 'circle',
                  pointStyle: {
                    fillOpacity: 1,
                  },
                  yAxis: {
                    nice: true,
                    line: {
                      style: {
                        stroke: '#aaa',
                      },
                    },
                  },
                  xAxis: {
                    grid: {
                      line: {
                        style: {
                          stroke: '#eee',
                        },
                      },
                    },
                    line: {
                      style: {
                        stroke: '#aaa',
                      },
                    },
                  },
                  label: {},
                }}
                data={list2.data}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="气泡图-四象限">
              <ScatterChart
                {...{
                  appendPadding: 30,
                  xField: 'change in female rate',
                  yField: 'change in male rate',
                  sizeField: 'pop',
                  colorField: 'continent',
                  color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
                  size: [4, 30],
                  shape: 'circle',
                  pointStyle: {
                    fillOpacity: 0.8,
                    stroke: '#bbb',
                  },
                  xAxis: {
                    min: -25,
                    max: 5,
                    grid: {
                      line: {
                        style: {
                          stroke: '#eee',
                        },
                      },
                    },
                    line: {
                      style: {
                        stroke: '#aaa',
                      },
                    },
                  },
                  yAxis: {
                    line: {
                      style: {
                        stroke: '#aaa',
                      },
                    },
                  },
                  quadrant: {
                    xBaseline: 0,
                    yBaseline: 0,
                    labels: [
                      {
                        content: 'Male decrease,\nfemale increase',
                      },
                      {
                        content: 'Female decrease,\nmale increase',
                      },
                      {
                        content: 'Female & male decrease',
                      },
                      {
                        content: 'Female &\n male increase',
                      },
                    ],
                  },
                }}
                data={list3.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="气泡图-右侧坐标轴">
              <ScatterChart
                {...{
                  appendPadding: 30,
                  xField: '概率',
                  yField: '年平均工资',
                  colorField: 'education',
                  size: [2, 16],
                  sizeField: 'numbEmployed',
                  shape: 'circle',
                  yAxis: {
                    nice: false,
                    min: -20000,
                    tickCount: 5,
                    position: 'right',
                    label: {
                      formatter: (value: number) => {
                        return Math.floor(value / 1000) + 'K';
                      },
                    },
                    grid: {
                      line: {
                        style: {
                          stroke: '#eee',
                        },
                      },
                    },
                    line: {
                      style: {
                        stroke: '#aaa',
                      },
                    },
                  },
                  tooltip: {
                    fields: ['概率', '年平均工资', '就业人数'],
                  },
                  legend: {
                    position: 'top',
                  },
                  xAxis: {
                    min: -0.04,
                    max: 1.04,
                    nice: false,
                    grid: {
                      line: {
                        style: {
                          stroke: '#eee',
                        },
                      },
                    },
                    line: false,
                    label: false,
                  },
                  label: {
                    formatter: (item: any) => {
                      return labels.includes(item['short occupation'])
                        ? item['short occupation']
                        : '';
                    },
                    offsetY: -10,
                  },
                  annotations: [
                    {
                      type: 'line',
                      start: [-0.04, 100000],
                      end: [1.04, 30000],
                      style: {
                        stroke: '#aaa',
                      },
                    },
                    {
                      type: 'text',
                      position: ['1.03', 'max'],
                      content: 'Average annual wage',
                      style: {
                        textAlign: 'right',
                        fontWeight: '500',
                        fill: 'rgb(92, 92, 92)',
                      },
                    },
                    {
                      type: 'text',
                      position: ['1.03', 'min'],
                      content: 'Most likely to \nbe automated ',
                      style: {
                        textAlign: 'right',
                        fontWeight: '500',
                        fill: 'rgb(92, 92, 92)',
                      },
                    },
                    {
                      type: 'text',
                      position: ['-0.03', 'min'],
                      content: 'Least likely to \nbe automated ',
                      style: {
                        textAlign: 'left',
                        fontWeight: '500',
                        fill: 'rgb(92, 92, 92)',
                      },
                    },
                  ],
                }}
                data={list4.data}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
