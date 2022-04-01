import { Card, Col, Row } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { RoseChart } from '@/components/chart';
import { _data1, PATTERN_MAP, _data2 } from './data';
import { fetchApi } from '../fetch';

export default defineComponent({
  name: 'ChartRoseDemo1',
  setup() {
    const list1 = reactive({ data: [] });

    onMounted(async () => {
      const data1 = await fetchApi(
        'https://gw.alipayobjects.com/os/antfincdn/XcLAPaQeeP/rose-data.json',
      );
      list1.data = data1;
    });

    return () => (
      <>
        <Row justify="space-between">
          <Col span={12} class="pdr10">
            <Card title="玫瑰图">
              <RoseChart
                {...{
                  xField: 'type',
                  yField: 'value',
                  seriesField: 'type',
                  radius: 0.9,
                  legend: {
                    position: 'bottom',
                  },
                }}
                data={_data1}
              />
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="带有贴图图案的玫瑰图">
              <RoseChart
                {...{
                  xField: 'type',
                  yField: 'value',
                  seriesField: 'type',
                  radius: 0.9,
                  legend: false,
                  pattern: ({ type }) => {
                    return PATTERN_MAP[type] || { type: 'line' };
                  },
                  styleSheet: {
                    brandColor: '#215B77',
                    paletteQualitative10: [
                      '#215B77',
                      '#1B9CD0',
                      '#61C9FF',
                      '#ABDFFF',
                      '#EFF3DE',
                      '#FFDE94',
                      '#FFC741',
                      '#D09C10',
                      '#795B16',
                    ],
                    paletteQualitative20: [
                      '#215B77',
                      '#227BA2',
                      '#1B9CD0',
                      '#22BAED',
                      '#61C9FF',
                      '#8AD4FF',
                      '#ABDFFF',
                      '#C9E9FF',
                      '#EFF3DE',
                      '#FFE9B8',
                      '#FFDE94',
                      '#FFD470',
                      '#FFC741',
                      '#EDB40A',
                      '#D09C10',
                      '#A37B16',
                      '#795B16',
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
            <Card title="分组玫瑰图">
              {list1.data.length > 0 ? (
                <RoseChart
                  {...{
                    xField: 'type',
                    yField: 'value',
                    isGroup: true,
                    // 当 isGroup 为 true 时，该值为必填
                    seriesField: 'user',
                    radius: 0.9,
                    label: {
                      offset: -15,
                    },
                    interactions: [
                      {
                        type: 'element-active',
                      },
                    ],
                  }}
                  data={list1.data}
                />
              ) : (
                ''
              )}
            </Card>
          </Col>
          <Col span={12} class="pdr10">
            <Card title="堆叠玫瑰图">
              <RoseChart
                {...{
                  xField: 'type',
                  yField: 'value',
                  isStack: true,
                  // 当 isStack 为 true 时，该值为必填
                  seriesField: 'user',
                  radius: 0.9,
                  label: {
                    offset: -15,
                  },
                  interactions: [
                    {
                      type: 'element-active',
                    },
                  ],
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
