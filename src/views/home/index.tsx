import { homeCardtab } from '@/api/home';
import { Button, Col, Row, Tabs } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { LineChart } from '@/components/chart';
import { CardTab } from './modules';
import './style.less';

const { TabPane } = Tabs;
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 11 },
];

export default defineComponent({
  setup() {
    const cardTabList = reactive({
      list: [],
    });
    onMounted(async () => {
      const data = await homeCardtab();
      if (data.code === 200) {
        cardTabList.list = data.data;
      }
    });
    const callback = (key: any) => {
      console.log(key);
    };
    const operations = <Button>Extra Action</Button>;
    return () => (
      <div class={'home'}>
        <Row>
          {cardTabList.list?.map((ds: any) => {
            return (
              <Col span={6} class="pd10">
                <CardTab data={ds} />
              </Col>
            );
          })}
        </Row>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="销售额" key="1">
            <LineChart
              {...{
                height: 350,
                autoFit: true,
                xField: 'year',
                yField: 'value',
                smooth: true,
                meta: {
                  value: {
                    max: 15,
                  },
                },
              }}
              data={data}
            />
          </TabPane>
          <TabPane tab="访问量" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    );
  },
});
