import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { WaterfallChart } from '@/components/chart';
import { _data1, _data2 } from './data';

export default defineComponent({
  name: 'ChartWaterfallDemo1',
  setup() {
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础瀑布图 - 每月收支情况">
              <WaterfallChart
                {...{
                  xField: 'type',
                  yField: 'money',
                  appendPadding: [15, 0, 0, 0],
                  meta: {
                    type: {
                      alias: '类别',
                    },
                    money: {
                      alias: '收支',
                      formatter: (v) => `${v} 元`,
                    },
                  },
                  label: {
                    style: { fontSize: 10, fill: 'rgba(0,0,0,0.65)' },
                    layout: [{ type: 'interval-adjust-position' }],
                  },
                  total: {
                    label: '总支出',
                    style: {
                      fill: '#96a6a6',
                    },
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="变化瀑布图 - 销售量一年的变化情况">
              <WaterfallChart
                {...{
                  padding: 'auto',
                  appendPadding: [20, 0, 0, 0],
                  xField: 'month',
                  yField: 'value',
                  meta: {
                    month: {
                      alias: '月份',
                    },
                    value: {
                      alias: '销售量',
                      formatter: (v) => `${v / 10000000} 亿`,
                    },
                  },
                  /** 展示总计 */
                  total: {
                    label: '2020',
                  },
                  color: ({ month, value }) => {
                    if (month === '2019' || month === '2020') {
                      return '#96a6a6';
                    }
                    return value > 0 ? '#f4664a' : '#30bf78';
                  },
                  legend: {
                    custom: true,
                    items: [
                      {
                        name: 'Increase',
                        value: 'increase',
                        marker: { symbol: 'square', style: { r: 5, fill: '#f4664a' } },
                      },
                      {
                        name: 'Decrease',
                        value: 'decrease',
                        marker: { symbol: 'square', style: { r: 5, fill: '#30bf78' } },
                      },
                      {
                        name: 'Total',
                        value: 'total',
                        marker: { symbol: 'square', style: { r: 5, fill: '#96a6a6' } },
                      },
                    ],
                  },
                  label: {
                    style: {
                      fontSize: 10,
                    },
                    layout: [{ type: 'interval-adjust-position' }],
                    background: {
                      style: {
                        fill: '#f6f6f6',
                        stroke: '#e6e6e6',
                        strokeOpacity: 0.65,
                        radius: 2,
                      },
                      padding: 1.5,
                    },
                  },
                  waterfallStyle: () => {
                    return {
                      fillOpacity: 0.85,
                    };
                  },
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
