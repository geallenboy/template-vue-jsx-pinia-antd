import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { RadialBarChart } from '@/components/chart';
import { _data1, _data2 } from './data';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartRadarDemo1',
  setup() {
    const list1 = reactive({ data: [] });

    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json',
      );
      list1.data = data1;
    });
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="玉珏图">
              <RadialBarChart
                {...{
                  xField: 'name',
                  yField: 'star',
                  radius: 0.8,
                  innerRadius: 0.2,
                  tooltip: {
                    formatter: (datum) => {
                      return { name: 'star数', value: datum.star };
                    },
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="带圆角的玉珏图">
              <RadialBarChart
                {...{
                  xField: 'name',
                  yField: 'star',
                  maxAngle: 270, //最大旋转角度,
                  radius: 0.8,
                  innerRadius: 0.2,
                  barStyle: {
                    lineCap: 'round',
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="带自定义颜色的玉珏图">
              <RadialBarChart
                {...{
                  xField: 'name',
                  yField: 'star',
                  maxAngle: 270, //最大旋转角度,
                  radius: 0.8,
                  innerRadius: 0.2,
                  tooltip: {
                    formatter: (datum) => {
                      return { name: 'star数', value: datum.star };
                    },
                  },
                  colorField: 'star',
                  color: ({ star }) => {
                    if (star > 10000) {
                      return '#36c361';
                    } else if (star > 1000) {
                      return '#2194ff';
                    }
                    return '#ff4d4f';
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="分组玉珏图">
              <RadialBarChart
                {...{
                  xField: 'year',
                  yField: 'value',
                  colorField: 'type',
                  isGroup: true,
                  maxAngle: 270,
                }}
                data={list1.data}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="带柱子背景的玉珏图">
              <RadialBarChart
                {...{
                  xField: 'name',
                  yField: 'star',
                  maxAngle: 350, //最大旋转角度,
                  radius: 0.8,
                  innerRadius: 0.2,
                  tooltip: {
                    formatter: (datum) => {
                      return { name: 'star数', value: datum.star };
                    },
                  },
                  colorField: 'star',
                  color: ({ star }) => {
                    if (star > 10000) {
                      return '#6349ec';
                    } else if (star > 1000) {
                      return '#ff9300';
                    }
                    return '#ff93a7';
                  },
                  barBackground: {},
                  barStyle: { lineCap: 'round' },
                  annotations: [
                    {
                      type: 'html',
                      position: ['50%', '50%'],
                      html: (container, view) => {
                        const coord = view.getCoordinate();
                        const w = coord.polarRadius * coord.innerRadius * 1.15;
                        return `<div style="transform:translate(-50%,-46%)">
                       <img width="${
                         (w / 203) * 231
                       }" height="${w}" alt="" src="https://gw.alipayobjects.com/zos/antfincdn/zrh%24J08soH/AntV%252520LOGO%2525202.png">
                     </div>`;
                      },
                    },
                  ],
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="分组玉珏图">
              <RadialBarChart
                {...{
                  appendPadding: [50, 0, 50, 0],
                  xField: 'name',
                  yField: 'percent',
                  // maxAngle: 90, //最大旋转角度,
                  radius: 0.8,
                  innerRadius: 0.2,
                  xAxis: false,
                  theme: 'dark',
                  barBackground: { style: { fill: 'rgba(255,255,255,0.45)' } },
                  barStyle: { lineCap: 'round' },
                  minBarWidth: 16,
                  maxBarWidth: 16,
                  colorField: 'name',
                  color: ({ name }) => {
                    return _data2.find((d) => d.name === name).color;
                  },
                  annotations: _data2.map((d) => ({
                    type: 'html',
                    position: [d.name, 0],
                    html: `<div style="width:11px;height:11px;transform:translate(-50%, -50%)">
                  <img
                    style="width:11px;height:11px;display: block;"
                    src="${d.icon}"
                    alt=""
                  />
                </div>`,
                  })),
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
