import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { LineChart } from '@/components/chart';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartLineDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });

    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
      );
      list1.data = data1;
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json',
      );
      list3.data = data3;
      const data4 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/nHVKXA8ClI/multiple-measures-line-data.json',
      );
      list4.data = data4;
    });
    const seriesKey = 'series';
    const valueKey = 'value';
    const processData = (data: any[], yFields: string[], meta: any) => {
      const result: any[] = [];
      data.forEach((d) => {
        yFields.forEach((yField) => {
          const name = meta?.[yField]?.alias || yField;
          result.push({ ...d, [seriesKey]: name, [valueKey]: d[yField] });
        });
      });
      return result;
    };
    const meta = {
      date: {
        alias: '销售日期',
      },
      price: {
        alias: '单价',
      },
      discount_price: {
        alias: '折扣单价',
      },
    };
    console.log(list1, 88888);
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础折线">
              <LineChart
                {...{
                  autoFit: true,
                  xField: 'Date',
                  yField: 'scales',
                  smooth: true,
                  xAxis: {
                    // type: 'timeCat',
                    tickCount: 5,
                  },
                }}
                data={list1.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="二氧化碳排放量来源">
              {list2.data.length > 0 ? (
                <LineChart
                  {...{
                    autoFit: true,
                    xField: 'year',
                    yField: 'value',
                    seriesField: 'category',
                    xAxis: {
                      type: 'time',
                    },
                    yAxis: {
                      label: {
                        // 数值格式化为千分位
                        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                      },
                    },
                  }}
                  data={list2.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
        </Row>
        <Row class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="折线趋势填充">
              {list3.data.length > 0 ? (
                <LineChart
                  {...{
                    autoFit: true,
                    xField: 'year',
                    yField: 'gdp',
                    seriesField: 'name',
                    yAxis: {
                      label: {
                        formatter: (v: string) => `${(Number(v) / 10e8).toFixed(1)} B`,
                      },
                    },
                    legend: {
                      position: 'top',
                    },
                    smooth: true,
                    // 配置折线趋势填充
                    area: {
                      style: {
                        fillOpacity: 0.55,
                      },
                    },
                    animation: {
                      appear: {
                        animation: 'wave-in',
                        duration: 3000,
                      },
                    },
                  }}
                  data={list3.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="多指标折线图">
              {list4.data.length > 0 ? (
                <LineChart
                  {...{
                    autoFit: true,
                    padding: 'auto',
                    xField: 'date',
                    yField: valueKey,
                    seriesField: seriesKey,
                    appendPadding: [0, 8, 0, 0],
                  }}
                  data={processData(list4.data, ['price', 'discount_price'], meta)}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
