import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { AreaChart } from '@/components/chart';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartAreaDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });

    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json',
      );
      list1.data = data1;
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
      );
      list3.data = data3;
      const data4 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json',
      );
      list4.data = data4;
    });

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础面积图">
              <AreaChart
                {...{
                  autoFit: true,
                  xField: 'timePeriod',
                  yField: 'value',
                  xAxis: {
                    range: [0, 1],
                  },
                }}
                data={list1.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="渐变色面积图">
              <AreaChart
                {...{
                  autoFit: true,
                  xField: 'Date',
                  yField: 'scales',
                  xAxis: {
                    range: [0, 1],
                    tickCount: 5,
                  },
                  areaStyle: () => {
                    return {
                      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
                    };
                  },
                }}
                data={list2.data}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="带缩略轴面积图">
              <AreaChart
                {...{
                  autoFit: true,
                  xField: 'Date',
                  yField: 'scales',
                  xAxis: {
                    tickCount: 5,
                  },
                  animation: false,
                  slider: {
                    start: 0.1,
                    end: 0.9,
                    trendCfg: {
                      isArea: true,
                    },
                  },
                }}
                data={list3.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="堆叠面积图">
              <AreaChart
                {...{
                  autoFit: true,
                  xField: 'date',
                  yField: 'value',
                  seriesField: 'country',
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
