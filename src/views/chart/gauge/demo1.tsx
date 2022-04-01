import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { GaugeChart } from '@/components/chart';

export default defineComponent({
  name: 'ChartDualAxesDemo1',
  setup() {
    const ticks = [0, 1 / 3, 2 / 3, 1];
    const color = ['#F4664A', '#FAAD14', '#30BF78'];

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="仪表盘">
              <GaugeChart
                {...{
                  percent: 0.75,
                  range: {
                    color: '#30BF78',
                  },
                  indicator: {
                    pointer: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                    pin: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                  },
                  axis: {
                    label: {
                      formatter(v) {
                        return Number(v) * 100;
                      },
                    },
                    subTickLine: {
                      count: 3,
                    },
                  },
                  statistic: {
                    content: {
                      formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
                      style: {
                        color: 'rgba(0,0,0,0.65)',
                        fontSize: 48,
                      },
                    },
                  },
                  gaugeStyle: {
                    lineCap: 'round',
                  },
                }}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="仪表盘(单色渐变)">
              <GaugeChart
                {...{
                  percent: 0.75,
                  range: {
                    color: 'l(0) 0:#B8E1FF 1:#3D76DD',
                  },
                  startAngle: Math.PI,
                  endAngle: 2 * Math.PI,

                  statistic: {
                    title: {
                      offsetY: -36,
                      style: {
                        fontSize: '36px',
                        color: '#4B535E',
                      },
                      formatter: () => '70%',
                    },
                    content: {
                      style: {
                        fontSize: '24px',
                        lineHeight: '44px',
                        color: '#4B535E',
                      },
                      formatter: () => '加载进度',
                    },
                  },
                  gaugeStyle: {
                    lineCap: 'round',
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="仪表盘(多色)">
              <GaugeChart
                {...{
                  percent: 0.75,
                  range: {
                    ticks: [0, 1 / 3, 2 / 3, 1],
                    color: ['#F4664A', '#FAAD14', '#30BF78'],
                  },
                  indicator: {
                    pointer: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                    pin: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                  },
                  statistic: {
                    content: {
                      style: {
                        fontSize: '36px',
                        lineHeight: '36px',
                      },
                    },
                  },
                }}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="仪表盘(渐变色)">
              <GaugeChart
                {...{
                  percent: 0.5,
                  range: {
                    ticks: [0, 1],
                    color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
                  },
                  indicator: {
                    pointer: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                    pin: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                  },
                  statistic: {
                    title: {
                      formatter: ({ percent }) => {
                        if (percent < ticks[1]) {
                          return '差';
                        }
                        if (percent < ticks[2]) {
                          return '中';
                        }
                        return '优';
                      },
                      style: ({ percent }) => {
                        return {
                          fontSize: '36px',
                          lineHeight: 1,
                          color:
                            percent < ticks[1]
                              ? color[0]
                              : percent < ticks[2]
                              ? color[1]
                              : color[2],
                        };
                      },
                    },
                    content: {
                      offsetY: 36,
                      style: {
                        fontSize: '24px',
                        color: '#4B535E',
                      },
                      formatter: () => '系统表现',
                    },
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
