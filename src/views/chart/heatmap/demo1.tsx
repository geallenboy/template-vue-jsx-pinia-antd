import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { HeatmapChart } from '@/components/chart';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartDualAxesDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });

    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json',
      );
      list1.data = data1;
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json',
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
          <Col span={24} class="pdr10">
            <Card title="热力图">
              <HeatmapChart
                {...{
                  height: 500,
                  autoFit: true,

                  xField: 'Month of Year',
                  yField: 'District',
                  colorField: 'AQHI',
                  color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
                  meta: {
                    'Month of Year': {
                      type: 'cat',
                    },
                  },
                }}
                data={list1.data}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={24} class="pdr10">
            <HeatmapChart
              {...{
                xField: 'name',
                yField: 'country',
                colorField: 'value',
                shape: 'circle',
                sizeRatio: 0.5,
                color: ['#0d5fbb', '#7eadfc', '#fd8b6f', '#aa3523'],
                label: {
                  style: {
                    fill: '#fff',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)',
                  },
                },
              }}
              data={list2.data}
            />
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="仪表盘(多色)">
              <HeatmapChart
                {...{
                  xField: 'name',
                  yField: 'country',
                  colorField: 'value',
                  sizeField: 'value',
                  shape: 'square',
                  color: ['#dddddd', '#9ec8e0', '#5fa4cd', '#2e7ab6', '#114d90'],
                  label: {
                    style: {
                      fill: '#fff',
                      shadowBlur: 2,
                      shadowColor: 'rgba(0, 0, 0, .45)',
                    },
                  },
                }}
                data={list3.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="仪表盘(渐变色)">
              <HeatmapChart
                {...{
                  type: 'density',
                  xField: 'g',
                  yField: 'l',
                  colorField: 'tmp',
                  color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
                  legend: {
                    position: 'bottom',
                  },
                  annotations: [
                    {
                      type: 'image',
                      start: ['min', 'max'],
                      end: ['max', 'min'],
                      src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
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
