import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { BarChart } from '@/components/chart';
import { _data1, _data2, _data3, _data4, _data5, _data6 } from './data';

export default defineComponent({
  name: 'ChartBarDemo1',
  setup() {
    const list1 = reactive({ data: _data1 });
    const list2 = reactive({ data: _data2 });
    const list3 = reactive({ data: _data3 });
    const list4 = reactive({ data: _data4 });
    const list5 = reactive({ data: _data5 });
    const list6 = reactive({ data: _data6 });

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础条形图">
              {list1.data.length > 0 ? (
                <BarChart
                  {...{
                    autoFit: true,
                    xField: 'value',
                    yField: 'year',
                    seriesField: 'year',
                    legend: {
                      position: 'top-left',
                    },
                  }}
                  data={list1.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="指定条形图最小最大宽度">
              {list2.data.length > 0 ? (
                <BarChart
                  {...{
                    autoFit: true,
                    xField: 'sales',
                    yField: 'type',
                    meta: {
                      type: {
                        alias: '类别',
                      },
                      sales: {
                        alias: '销售额',
                      },
                    },
                    minBarWidth: 20,
                    maxBarWidth: 20,
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
            <Card title="堆叠条形图">
              {list3.data.length > 0 ? (
                <BarChart
                  {...{
                    autoFit: true,
                    isStack: true,
                    xField: 'value',
                    yField: 'year',
                    seriesField: 'type',
                    label: {
                      // 可手动配置 label 数据标签位置
                      position: 'middle', // 'left', 'middle', 'right'
                      // 可配置附加的布局方法
                      layout: [
                        // 柱形图数据标签位置自动调整
                        { type: 'interval-adjust-position' },
                        // 数据标签防遮挡
                        { type: 'interval-hide-overlap' },
                        // 数据标签文颜色自动调整
                        { type: 'adjust-color' },
                      ],
                    },
                  }}
                  data={list3.data.reverse()}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="多指标折线图">
              {list4.data.length > 0 ? (
                <BarChart
                  {...{
                    autoFit: true,
                    isGroup: true,
                    xField: 'value',
                    yField: 'label',
                    /** 自定义颜色 */
                    // color: ['#1383ab', '#c52125'],
                    seriesField: 'type',
                    marginRatio: 0,
                    label: {
                      // 可手动配置 label 数据标签位置
                      position: 'middle', // 'left', 'middle', 'right'
                      // 可配置附加的布局方法
                      layout: [
                        // 柱形图数据标签位置自动调整
                        { type: 'interval-adjust-position' },
                        // 数据标签防遮挡
                        { type: 'interval-hide-overlap' },
                        // 数据标签文颜色自动调整
                        { type: 'adjust-color' },
                      ],
                    },
                  }}
                  data={list4.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
        </Row>
        <Row class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="堆叠条形图">
              {list5.data.length > 0 ? (
                <BarChart
                  {...{
                    autoFit: true,
                    xField: 'value',
                    yField: 'year',
                    seriesField: 'country',
                    isPercent: true,
                    isStack: true,
                    /** 自定义颜色 */
                    // color: ['#2582a1', '#f88c24', '#c52125', '#87f4d0'],
                    label: {
                      position: 'middle',
                      content: (item) => {
                        return item.value.toFixed(2);
                      },
                      style: {
                        fill: '#fff',
                      },
                    },
                  }}
                  data={list5.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="多指标折线图">
              {list6.data.length > 0 ? (
                <BarChart
                  {...{
                    autoFit: true,
                    xField: 'values',
                    yField: 'type',
                    isRange: true,
                    label: {
                      position: 'middle',
                      layout: [{ type: 'adjust-color' }],
                    },
                  }}
                  data={list6.data}
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
