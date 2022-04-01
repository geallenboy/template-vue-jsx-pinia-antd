import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { ColumnChart } from '@/components/chart';
import { fetchApi } from '../fetch';
import { _data1, _data2, _data3, _data4 } from './data';

export default defineComponent({
  name: 'ChartColumnDemo1',
  setup() {
    const list1 = reactive({ data: _data1 });
    const list2 = reactive({ data: [] });
    const list3 = reactive({ data: [] });
    const list4 = reactive({ data: [] });
    const list5 = reactive({ data: _data2 });
    const list6 = reactive({ data: [] });
    const list7 = reactive({ data: _data3 });
    const list8 = reactive({ data: _data4 });
    onMounted(async () => {
      const data2 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json',
      );
      list2.data = data2;
      const data3 = await fetchApi(
        'https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json',
      );
      list3.data = data3;
      const data4 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json',
      );
      list4.data = data4;
      const data6 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/cK%24sTxSsah/stack-group-column.json',
      );
      list6.data = data6;
    });

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础柱状图">
              {list1.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    xField: 'type',
                    yField: 'sales',
                    label: {
                      // 可手动配置 label 数据标签位置
                      position: 'middle', // 'top', 'bottom', 'middle',
                      // 配置样式
                      style: {
                        fill: '#FFFFFF',
                        opacity: 0.6,
                      },
                    },
                    xAxis: {
                      label: {
                        autoHide: true,
                        autoRotate: false,
                      },
                    },
                    meta: {
                      type: {
                        alias: '类别',
                      },
                      sales: {
                        alias: '销售额',
                      },
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
            <Card title="带缩略轴柱状图">
              {list2.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    xField: '城市',
                    yField: '销售额',
                    xAxis: {
                      label: {
                        autoRotate: false,
                      },
                    },
                    slider: {
                      start: 0.1,
                      end: 0.2,
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
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="带滚动条柱状图">
              {list3.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    xField: '城市',
                    yField: '销售额',
                    xAxis: {
                      label: {
                        autoRotate: false,
                      },
                    },
                    scrollbar: {
                      type: 'horizontal',
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
            <Card title="堆叠柱状图">
              {list4.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    isStack: true,
                    xField: 'year',
                    yField: 'value',
                    seriesField: 'type',
                    label: {
                      // 可手动配置 label 数据标签位置
                      position: 'middle', // 'top', 'bottom', 'middle'
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
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="分组柱状图">
              {list5.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    isGroup: true,
                    xField: '月份',
                    yField: '月均降雨量',
                    seriesField: 'name',
                    /** 设置颜色 */
                    //color: ['#1ca9e6', '#f88c24'],
                    /** 设置间距 */
                    // marginRatio: 0.1,
                    label: {
                      // 可手动配置 label 数据标签位置
                      position: 'middle', // 'top', 'middle', 'bottom'
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
                  data={list5.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="堆叠柱状图">
              {list6.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    xField: 'month',
                    yField: 'value',
                    isGroup: true,
                    isStack: true,
                    seriesField: 'type',
                    groupField: 'name',
                  }}
                  data={list6.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="百分比柱状图">
              {list7.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    xField: 'year',
                    yField: 'value',
                    seriesField: 'country',
                    isPercent: true,
                    isStack: true,
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
                  data={list7.data}
                />
              ) : (
                '暂无数据'
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="堆叠柱状图">
              {list8.data.length > 0 ? (
                <ColumnChart
                  {...{
                    autoFit: true,
                    xField: 'type',
                    yField: 'values',
                    isRange: true,
                    label: {
                      position: 'middle',
                      layout: [{ type: 'adjust-color' }],
                    },
                  }}
                  data={list8.data}
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
