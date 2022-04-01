import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { BoxChart } from '@/components/chart';
import { _data1, _data2, _data3, _data4 } from './data';

export default defineComponent({
  name: 'ChartAreaDemo1',
  setup() {
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础箱型图">
              <BoxChart
                {...{
                  xField: 'x',
                  yField: ['low', 'q1', 'median', 'q3', 'high'],
                  boxStyle: {
                    stroke: '#545454',
                    fill: '#1890FF',
                    fillOpacity: 0.3,
                  },
                  animation: false,
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="分组箱型图">
              <BoxChart
                {...{
                  xField: 'type',
                  yField: '_bin',
                  groupField: 'Species',
                }}
                data={_data2}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="基础箱型图（有异常值）">
              <BoxChart
                {...{
                  xField: 'x',
                  yField: ['low', 'q1', 'median', 'q3', 'high'],
                  outliersField: 'outliers',
                  outliersStyle: {
                    fill: '#f6f',
                  },
                }}
                data={_data3}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="设置字段别名">
              <BoxChart
                {...{
                  xField: 'x',
                  yField: ['low', 'q1', 'median', 'q3', 'high'],
                  meta: {
                    low: {
                      alias: '最低值',
                    },
                    q1: {
                      alias: '下四分位数',
                    },
                    median: {
                      alias: '最低值',
                    },
                    q3: {
                      alias: '上四分位数',
                    },
                    high: {
                      alias: '最高值',
                    },
                  },
                  tooltip: {
                    fields: ['high', 'q3', 'median', 'q1', 'low'],
                  },
                  boxStyle: {
                    stroke: '#545454',
                    fill: '#1890FF',
                    fillOpacity: 0.3,
                  },
                  animation: false,
                }}
                data={_data4}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
