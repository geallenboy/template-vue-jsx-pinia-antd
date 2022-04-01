import { defineComponent } from 'vue';
import { Button, Result } from 'ant-design-vue';

export default defineComponent({
  name: 'Success',
  setup() {},
  render() {
    return <Result status="success" title="success" subTitle="操作成功" />;
  },
});
