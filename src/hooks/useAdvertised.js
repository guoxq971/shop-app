import { getAdvertisingApi } from '@/api/share/share';
import { randomTool } from '@/utils/commom';
import { ref } from 'vue';

export function useAdvertised() {
  // 广告
  const advertisedList = ref(
    Array.from({ length: 10 }, (item, index) => {
      return {
        detail: {},
        id: randomTool.uuid(),
        name: randomTool.word(),
        url: '',
        // url2: randomTool.image(),
        sort: index,
        index: index,
      };
    }),
  );

  function getAdvertising(data = {}) {
    const obj = Object.assign(
      {
        shopId: data.shopId || 1,
        sort: data.sort || 1,
      },
      data || {},
    );
    getAdvertisingApi(obj).then((res) => {
      // console.log('广告', res);
      for (let i = 0; i < res.data.length; i++) {
        const item = res.data[i];
        const d = advertisedList.value.find((e) => e.index === i);
        if (!d) continue;
        d.detail = item;
        d.url = item.img;
        d.name = item.name;
        d.id = item.id;
      }
      // console.log('广告 advertisedList.value', advertisedList.value);
    });
  }

  return {
    advertisedList,
    getAdvertising,
  };
}
