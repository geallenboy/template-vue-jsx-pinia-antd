import { defineComponent } from 'vue';
import { Button, Result } from 'ant-design-vue';

export default defineComponent({
  name: '404',
  setup() {},
  render() {
    return <Result status="404" title="404" subTitle="对不起, 页面不存在" />;
  },
});
