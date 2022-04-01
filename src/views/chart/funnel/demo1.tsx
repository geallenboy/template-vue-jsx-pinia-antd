import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { FunnelChart } from '@/components/chart';
import { _data1, _data2 } from './data';

export default defineComponent({
  name: 'ChartTreemapDemo1',
  setup() {
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础漏斗图">
              <FunnelChart
                {...{
                  xField: 'stage',
                  yField: 'number',
                  legend: false,
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="对比漏斗图">
              <FunnelChart
                {...{
                  xField: 'stage',
                  yField: 'number',
                  compareField: 'company',
                  meta: {
                    stage: {
                      alias: '行为',
                    },
                    pv: {
                      alias: '人数',
                      formatter: (v) => `${v}次`,
                    },
                  },
                  tooltip: {
                    fields: ['stage', 'number', 'company'],
                    formatter: (v) => ({
                      name: `${v.company}的${v.stage}`,
                      value: v.number,
                    }),
                  },
                  legend: false,
                }}
                data={_data2}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={24} class="pdr10">
            <Card title="分面漏斗图">
              <FunnelChart
                {...{
                  xField: 'stage',
                  yField: 'number',
                  seriesField: 'company',
                  meta: {
                    stage: {
                      alias: '行为',
                    },
                    pv: {
                      alias: '人数',
                      formatter: (v) => `${v}次`,
                    },
                  },
                  legend: false,
                }}
                data={_data2}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
