import {
  defineComponent,
  HTMLAttributes,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  reactive,
  onBeforeUnmount,
  watch,
} from 'vue';
import { Plot as BasePlot } from '@antv/g2plot';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

interface Options {
  [x: string]: any;
}

export interface Plot<C extends Options> extends BasePlot<C> {
  new (container: HTMLElement, config: C): BasePlot<C>;
}

type PickedAttrs = 'class' | 'style';

type Data = Record<string, any>[] | Record<string, any>;

export interface BaseChartProps<C extends Options> extends Pick<HTMLAttributes, PickedAttrs> {
  chart: any;
  data: Data;
}

export interface BaseChartRawBindings<C extends Options> {
  plot: BasePlot<C>;
}
const BaseChart = defineComponent<BaseChartProps<any>, BaseChartRawBindings<any>>({
  name: 'BaseChart',
  inheritAttrs: false,

  setup(props, { attrs }) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const attrConfig = reactive<BaseChartProps<any>>(attrs as any);
    let plot = reactive<any>(null);

    watch(
      () => attrConfig.data,
      (data: Data, oldData: Data) => {
        if (plot) {
          if (isEmpty(oldData)) {
            plot.update({
              ...attrConfig,
              data: data,
            });
            plot.render();
          } else {
            plot.changeData(data);
          }
        }
      },
      { deep: true },
    );
    watch(
      () => attrConfig,
      (config: any, oldConfig: any) => {
        if (plot) {
          if (!isEqual(config, oldConfig)) {
            plot.update({
              ...config,
            });
            plot.render();
          } else {
          }
        }
      },
      { deep: true },
    );
    onMounted(() => {
      const { chart: Chart } = attrConfig;
      plot = new Chart(proxy?.$el as HTMLElement, {
        ...attrConfig,
      });
      plot.render();
    });
    onBeforeUnmount(() => {
      if (plot) {
        plot.destroy();
      }
    });

    return () => <div class={attrConfig.class} style={attrConfig.style} />;
  },
});

export default BaseChart;
