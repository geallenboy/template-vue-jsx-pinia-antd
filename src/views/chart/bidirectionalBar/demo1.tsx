import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { BidirectionalBarChart } from '@/components/chart';
import { _data1 } from './data';

export default defineComponent({
  name: 'ChartAreaDemo1',
  setup() {
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础对称条形图">
              <BidirectionalBarChart
                {...{
                  xField: 'country',
                  xAxis: {
                    position: 'bottom',
                  },
                  interactions: [{ type: 'active-region' }],
                  yField: ['2016年耕地总面积', '2016年转基因种植面积'],
                  tooltip: {
                    shared: true,
                    showMarkers: false,
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="对称条形图（垂直方向）">
              <BidirectionalBarChart
                {...{
                  layout: 'vertical',
                  xField: 'country',
                  yField: ['2016年耕地总面积', '2016年转基因种植面积'],
                  yAxis: {
                    '2016年耕地总面积': {
                      nice: true,
                    },
                    '2016年转基因种植面积': {
                      min: 0,
                      max: 100,
                    },
                  },
                  tooltip: {
                    shared: true,
                    showMarkers: false,
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
