import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { LiquidChart } from '@/components/chart';

export default defineComponent({
  name: 'ChartDualAxesDemo1',
  setup() {
    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="水波图">
              <LiquidChart
                {...{
                  percent: 0.25,
                  outline: {
                    border: 4,
                    distance: 8,
                  },
                  wave: {
                    length: 128,
                  },
                }}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="矩形水波图">
              <LiquidChart
                {...{
                  percent: 0.25,
                  shape: 'rect',
                  outline: {
                    border: 2,
                    distance: 4,
                  },
                  wave: {
                    length: 128,
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row justify="space-between" class={'mt10'}>
          <Col span={12} class="pdr10">
            <Card title="形状自定义的水波图">
              <LiquidChart
                {...{
                  percent: 0.25,
                  shape: function (x, y, width, height) {
                    const r = width / 4;
                    const dx = x - width / 2;
                    const dy = y - height / 2;
                    return [
                      ['M', dx, dy + r * 2],
                      ['A', r, r, 0, 0, 1, x, dy + r],
                      ['A', r, r, 0, 0, 1, dx + width, dy + r * 2],
                      ['L', x, dy + height],
                      ['L', dx, dy + r * 2],
                      ['Z'],
                    ];
                  },
                  outline: {
                    border: 4,
                    distance: 8,
                  },
                  wave: {
                    length: 128,
                  },
                }}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="带贴图的水波图">
              <LiquidChart
                {...{
                  percent: 0.65,
                  shape: 'diamond',
                  outline: {
                    border: 4,
                    distance: 8,
                  },
                  wave: {
                    length: 128,
                  },
                  pattern: { type: 'line' },
                }}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  },
});
