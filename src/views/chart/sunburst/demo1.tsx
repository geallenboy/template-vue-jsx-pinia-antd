import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { SunburstChart } from '@/components/chart';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartSunburstDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });
    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/ryp44nvUYZ/coffee.json',
      );
      list1.data = data1;
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
      );
      list3.data = data3;
      const data4 = await fetchApi(
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
      );
      list4.data = data4;
    });

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础旭日图">
              <SunburstChart
                {...{
                  innerRadius: 0.3,
                  interactions: [{ type: 'element-active' }],
                }}
                data={list1.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="自定义 hierarchy field">
              <SunburstChart
                {...{
                  innerRadius: 0.3,
                  interactions: [{ type: 'element-active' }],
                  hierarchyConfig: {
                    field: 'sum',
                  },
                  drilldown: {
                    breadCrumb: {
                      rootText: '起始',
                    },
                  },
                }}
                data={list2.data}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="设置标签布局">
              <SunburstChart
                {...{
                  innerRadius: 0.2,
                  radius: 1,
                  interactions: [{ type: 'element-active' }],
                  hierarchyConfig: {
                    field: 'sum',
                  },
                  label: {
                    // label layout: limit label in shape, which means the labels out of shape will be hide
                    layout: [{ type: 'limit-in-shape' }],
                  },
                }}
                data={list3.data}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="配置激活展示的层级数">
              <SunburstChart
                {...{
                  innerRadius: 0.3,
                  interactions: [{ type: 'element-active' }],
                  hierarchyConfig: {
                    field: 'sum',
                    // 配置展示的层级数
                    activeDepth: 1,
                  },
                  drilldown: {
                    breadCrumb: {
                      rootText: '起始',
                    },
                  },
                  label: {
                    autoRotate: false,
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
