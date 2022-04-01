import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { StockChart } from '@/components/chart';

import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartStockDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });
    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json',
      );
      list1.data = data1;
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/ZWgtj7pC%261/stock.json',
      );
      list3.data = data3;
    });

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础蜡烛图">
              <StockChart
                {...{
                  xField: 'trade_date',
                  yField: ['open', 'close', 'high', 'low'],
                }}
                data={list1.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="设置字段别名">
              <StockChart
                {...{
                  xField: 'trade_date',
                  yField: ['open', 'close', 'high', 'low'],
                  meta: {
                    vol: { alias: '成交量' },
                    open: { alias: '开盘价' },
                    close: { alias: '收盘价' },
                    high: { alias: '最高价' },
                    low: { alias: '最低价' },
                  },
                }}
                data={list2.data}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="带缩略轴的股票图">
              <StockChart
                {...{
                  appendPadding: [0, 10, 0, 0],
                  xField: 'trade_date',
                  yField: ['open', 'close', 'high', 'low'],
                  slider: {},
                }}
                data={list3.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="超大数据量的股票图">
              <StockChart
                {...{
                  xField: 'date',
                  yField: ['open', 'close', 'high', 'low'],
                  slider: {
                    start: 0.85,
                    end: 0.86,
                  },
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
