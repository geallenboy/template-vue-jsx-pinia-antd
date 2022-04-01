import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { BulletChart } from '@/components/chart';
import { _data1, _data2, _data3 } from './data';

export default defineComponent({
  name: 'ChartBulletDemo1',
  setup() {
    const ticks = [0, 1 / 3, 2 / 3, 1];
    const color = ['#F4664A', '#FAAD14', '#30BF78'];

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="基础子弹图-水平方向">
              <BulletChart
                {...{
                  measureField: 'measures',
                  rangeField: 'ranges',
                  targetField: 'target',
                  xField: 'title',
                  color: {
                    range: '#f0efff',
                    measure: '#5B8FF9',
                    target: '#3D76DD',
                  },
                  xAxis: {
                    line: null,
                  },
                  yAxis: {
                    tickMethod: ({ max }) => {
                      const interval = Math.ceil(max / 5);
                      // 自定义刻度 ticks
                      return [0, interval, interval * 2, interval * 3, interval * 4, max];
                    },
                  },
                  // 自定义 legend
                  legend: {
                    custom: true,
                    position: 'bottom',
                    items: [
                      {
                        value: '实际值',
                        name: '实际值',
                        marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } },
                      },
                      {
                        value: '目标值',
                        name: '目标值',
                        marker: { symbol: 'line', style: { stroke: '#3D76DD', r: 5 } },
                      },
                    ],
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="基础子弹图-垂直方向">
              <BulletChart
                {...{
                  measureField: 'measures',
                  rangeField: 'ranges',
                  targetField: 'target',
                  xField: 'title',
                  color: {
                    range: '#f0efff',
                    measure: '#5B8FF9',
                    target: '#3D76DD',
                  },
                  xAxis: {
                    line: null,
                  },
                  yAxis: false,
                  layout: 'vertical',
                  label: {
                    measure: {
                      position: 'middle',
                      style: {
                        fill: '#fff',
                      },
                    },
                  },
                  // 自定义 legend
                  legend: {
                    custom: true,
                    position: 'bottom',
                    items: [
                      {
                        value: '实际值',
                        name: '实际值',
                        marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } },
                      },
                      {
                        value: '目标值',
                        name: '目标值',
                        marker: { symbol: 'line', style: { stroke: '#3D76DD', r: 5 } },
                      },
                    ],
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="堆叠子弹图">
              <BulletChart
                {...{
                  measureField: 'measures',
                  rangeField: 'ranges',
                  targetField: 'target',
                  xField: 'title',
                  color: {
                    range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
                    measure: ['#5B8FF9', '#61DDAA'],
                    target: '#39a3f4',
                  },
                  label: {
                    measure: {
                      position: 'middle',
                      style: {
                        fill: '#fff',
                      },
                    },
                  },
                  xAxis: {
                    line: null,
                  },
                  yAxis: false,
                  tooltip: {
                    showMarkers: false,
                    shared: true,
                  },
                  // 自定义 legend
                  legend: {
                    custom: true,
                    position: 'bottom',
                    items: [
                      {
                        value: '差',
                        name: '差',
                        marker: { symbol: 'square', style: { fill: '#FFbcb8', r: 5 } },
                      },
                      {
                        value: '良',
                        name: '良',
                        marker: { symbol: 'square', style: { fill: '#FFe0b0', r: 5 } },
                      },
                      {
                        value: '优',
                        name: '优',
                        marker: { symbol: 'square', style: { fill: '#bfeec8', r: 5 } },
                      },
                      {
                        value: '第一季度',
                        name: '第一季度',
                        marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } },
                      },
                      {
                        value: '第二季度',
                        name: '第二季度',
                        marker: { symbol: 'square', style: { fill: ' #61DDAA', r: 5 } },
                      },
                      {
                        value: '目标值',
                        name: '目标值',
                        marker: { symbol: 'line', style: { stroke: '#39a3f4', r: 5 } },
                      },
                    ],
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="分组子弹图">
              <BulletChart
                {...{
                  measureField: 'measures',
                  rangeField: 'ranges',
                  targetField: 'target',
                  xField: 'title',
                  color: {
                    range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
                    measure: '#5B8FF9',
                    target: '#39a3f4',
                  },
                  label: {
                    measure: {
                      position: 'middle',
                      style: {
                        fill: '#fff',
                      },
                    },
                  },
                  xAxis: {
                    line: null,
                  },
                  yAxis: false,
                  // 自定义 legend
                  legend: {
                    custom: true,
                    position: 'bottom',
                    items: [
                      {
                        value: '差',
                        name: '差',
                        marker: { symbol: 'square', style: { fill: '#FFbcb8', r: 5 } },
                      },
                      {
                        value: '良',
                        name: '良',
                        marker: { symbol: 'square', style: { fill: '#FFe0b0', r: 5 } },
                      },
                      {
                        value: '优',
                        name: '优',
                        marker: { symbol: 'square', style: { fill: '#bfeec8', r: 5 } },
                      },
                      {
                        value: '实际值',
                        name: '实际值',
                        marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } },
                      },
                      {
                        value: '目标值',
                        name: '目标值',
                        marker: { symbol: 'line', style: { stroke: '#39a3f4', r: 5 } },
                      },
                    ],
                  },
                }}
                data={_data3}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
