import { defineComponent } from 'vue';
import { usePublicStore } from '@/store/modules/public';

export default defineComponent({
  name: 'AssemblyDemo1',
  setup() {
    const userInfo = usePublicStore().getUserInfo;
    console.log(userInfo, 888);
    return () => (
      <div>
        demo1
        <p>{userInfo.data.name}</p>
      </div>
    );
  },
});
