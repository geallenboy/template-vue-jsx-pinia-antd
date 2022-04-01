import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { TreemapChart } from '@/components/chart';
import { _data1 } from './data';
import { fetchApi } from '../fetch';
import './style.less';

export default defineComponent({
  name: 'ChartTreemapDemo1',
  setup() {
    const list1 = reactive({ data: [] });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });

    onMounted(async () => {
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/mobile.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/k5SYI%24mOo1/treemap.json',
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
          <Col span={12} class="pdr10">
            <Card title="基础矩形树图">
              <TreemapChart
                {...{
                  colorField: 'name',
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="嵌套矩形树图">
              <TreemapChart
                {...{
                  colorField: 'brand',
                  // 为矩形树图增加缩放,拖拽交互
                  interactions: [
                    {
                      type: 'view-zoom',
                    },
                    {
                      type: 'drag-move',
                    },
                  ],
                  tooltip: {
                    follow: true,
                    enterable: true,
                    offset: 5,
                    customContent: (value, items) => {
                      if (!items || items.length <= 0) return;
                      const { data: itemData } = items[0];
                      const parent = itemData.path[1];
                      const root = itemData.path[itemData.path.length - 1];
                      return (
                        `<div class='container'>` +
                        `<div class='title'>${itemData.name}</div>` +
                        `<div class='tooltip-item'><span>销量</span><span>${itemData.value}</span></div>` +
                        `<div class='tooltip-item'><span>品牌</span><span>${itemData.brand}</span></div>` +
                        `<div class='tooltip-item'><span>品牌占比</span><span>${(
                          (itemData.value / parent.value) *
                          100
                        ).toFixed(2)}%</span></div>` +
                        `<div class='tooltip-item'><span>市场占比</span><span>${(
                          (itemData.value / root.value) *
                          100
                        ).toFixed(2)}%</span></div>` +
                        `</div>`
                      );
                    },
                  },
                }}
                data={{
                  name: 'root',
                  children: list2.data,
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={24} class="pdr10">
            <Card title="下钻交互">
              <TreemapChart
                {...{
                  colorField: 'name',
                  legend: {
                    position: 'top-left',
                  },
                  tooltip: {
                    formatter: (v) => {
                      const root = v.path[v.path.length - 1];
                      return {
                        name: v.name,
                        value: `${v.value}(总占比${((v.value / root.value) * 100).toFixed(2)}%)`,
                      };
                    },
                  },
                  // use `drilldown: { enabled: true }` to
                  // replace `interactions: [{ type: 'treemap-drill-down' }]`
                  interactions: [{ type: 'treemap-drill-down' }],
                  // drilldown: {
                  //   enabled: true,
                  //   breadCrumb: {
                  //     rootText: '初始',
                  //   },
                  // },
                  // 开启动画
                  animation: {},
                }}
                data={list3.data}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
