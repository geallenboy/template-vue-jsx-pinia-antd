import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { RadarChart } from '@/components/chart';
import { _data1 } from './data';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartRadarDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });

    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json',
      );
      list1.data = data1;
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json',
      );
      list3.data = data3;
      const data4 = await fetchApi(
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json',
      );
      list4.data = data4;
    });
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础雷达图">
              <RadarChart
                {...{
                  xField: 'name',
                  yField: 'star',
                  appendPadding: [0, 10, 0, 10],
                  meta: {
                    star: {
                      alias: 'star 数量',
                      min: 0,
                      nice: true,
                      formatter: (v) => Number(v).toFixed(2),
                    },
                  },
                  xAxis: {
                    tickLine: null,
                  },
                  yAxis: {
                    label: false,
                    grid: {
                      alternateColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  },
                  // 开启辅助点
                  point: {
                    size: 2,
                  },
                  area: {},
                }}
                data={_data1.map((d) => ({ ...d, star: Math.sqrt(d.star) }))}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="基础雷达图">
              <RadarChart
                {...{
                  xField: 'item',
                  yField: 'score',
                  seriesField: 'user',
                  meta: {
                    score: {
                      alias: '分数',
                      min: 0,
                      max: 80,
                    },
                  },
                  xAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                      line: {
                        style: {
                          lineDash: null,
                        },
                      },
                    },
                  },
                  // 开启辅助点
                  point: {
                    size: 2,
                  },
                }}
                data={list1.data}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="基础雷达图(带底色)">
              <RadarChart
                {...{
                  xField: 'item',
                  yField: 'score',
                  seriesField: 'user',
                  meta: {
                    score: {
                      alias: '分数',
                      min: 0,
                      max: 80,
                    },
                  },
                  xAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                      line: {
                        style: {
                          lineDash: null,
                        },
                      },
                    },
                  },
                  yAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                      line: {
                        type: 'line',
                        style: {
                          lineDash: null,
                        },
                      },
                      alternateColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  },
                  // 开启辅助点
                  point: {
                    size: 2,
                  },
                }}
                data={list2.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="带贴图的水波图">
              <RadarChart
                {...{
                  xField: 'item',
                  yField: 'score',
                  seriesField: 'user',
                  meta: {
                    score: {
                      alias: '分数',
                      min: 0,
                      max: 80,
                    },
                  },
                  xAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                      line: {
                        style: {
                          lineDash: null,
                        },
                      },
                    },
                  },
                  // 开启面积
                  area: {},
                  // 开启辅助点
                  point: {
                    size: 2,
                  },
                }}
                data={list3.data}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
