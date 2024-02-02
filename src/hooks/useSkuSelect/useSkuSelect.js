import { ref } from 'vue';
import { mockData } from '@/hooks/useSkuSelect/data';

export function useSkuSelect() {
  const specList = ref([]);
  const skuList = ref([]);
  // 选择数据的对象 将已选的数据放在这个对象里面记录下来  用对象的好处在下面深拷贝处就能体验到了
  const selectSpec = ref({});
  const mData = ref({});

  // 测试
  // mData.value = mockData;
  // dataInit(mockData);

  // 解析数据(字符串转mockData结构)  properties : "color:red;size:S"
  function disposeData(list) {
    const obj = {
      specList: [],
      skuList: [],
    };
    // {color : {red: 'red', yellow: 'yellow'} ,size : {S: 'S', M: 'M'}}
    const o = {};
    for (let item of list) {
      // ['color:red', 'size:S']
      const propList = item.properties.split(';');
      for (let propItem of propList) {
        // ['color', 'red']
        const it = propItem.split(':');
        const label = it[0];
        const value = it[1];
        if (!o[label]) {
          o[label] = { [value]: value };
        } else {
          o[label][value] = value;
        }
      }
      // 组装数据
      obj.skuList.push({
        detail: item,
        id: item.skuId,
        specs: propList.map((it) => it.split(':')[1]),
      });
    }
    // 组装数据
    Object.keys(o).forEach((title) => obj.specList.push({ title, list: [] }));
    for (let oKey in o) {
      obj.specList.find((e) => e.title === oKey).list = Object.keys(o[oKey]);
    }

    mData.value = obj;

    return obj;
  }

  // 数据初始化
  function dataInit(mockData) {
    mData.value = mockData;

    skuList.value = mockData.skuList;

    // 初始化对象池
    mockData.specList.forEach((item) => {
      selectSpec.value[item.title] = '';
    });

    // 将规格数据处理成我们视图所需要的数据类型
    specList.value = mockData.specList.map((item) => ({
      title: item.title,
      list: item.list.map((its) => {
        return {
          name: its,
          //  判断是否可以选择
          //  这里相当于init 初始化数据  isAble() 核心判断逻辑
          able: isAble(item.title, its), // 注释的调试看逻辑代码 false
        };
      }),
    }));
  }

  // 核心判断逻辑
  // 判断规格是否可以被选择  核心函数 key当前的规格的title   value规格值
  function isAble(key, value) {
    // 深拷贝 避免被影响
    const copySelectSpec = JSON.parse(JSON.stringify(selectSpec.value));
    // 用对象的好处就在这了 直接赋值当前验证项
    copySelectSpec[key] = value;
    // 用数组的 some 方法 效率高 符合条件直接退出循环
    const flag = skuList.value.some((item) => {
      // 条件判断 核心逻辑判断
      let i = 0;
      // 判断当前所选商品在skuList列表中是否存在
      // 例如：所选{  '颜色':'','套餐':'套餐一','内存':'64G'}，值为''也算存在，循环skuList每一项，直到找到颜色'',套餐一，64G，那一项后停止循环
      // eslint-disable-next-line no-restricted-syntax
      for (const k in copySelectSpec) {
        if (copySelectSpec[k] !== '' && item.specs.includes(copySelectSpec[k])) {
          i++;
        } else if (copySelectSpec[k] === '') {
          i++;
        }
      }
      // 符合下面条件就退出了 不符合会一直循环知道循环结束没有符合的条件就 return false 了
      // console.log(i, mockData.specList.length); // 注释的调试看逻辑代码
      return i === mData.value.specList.length;
    });
    // console.log(flag);
    return flag;
  }

  // 点击事件
  function changeSpec(key, value, able) {
    if (!able) return;
    if (selectSpec.value[key] === value) {
      selectSpec.value[key] = '';
    } else {
      selectSpec.value[key] = value;
    }
    // forEach循环改变原数组
    specList.value.forEach((item) => {
      item.list.forEach((its) => {
        its.able = isAble(item.title, its.name);
        // console.log(its.name, its.able);
      });
    });
  }

  /**
   * 手动赋值selectSpec，触发changeSpec
   * @param {Object} selList
   * @returns
   */
  function setSelectSpec(selList) {
    // 传入的值与已有的selectSpec比较，相同的不处理，不同的触发changeSpec
    Object.keys(selList).forEach((key) => {
      const value = selList[key];
      if (value !== selectSpec.value[key]) {
        changeSpec(key, value, true);
      }
    });
  }

  /**
   * 根据已选择的获取sku信息
   * @returns
   */
  function getSkuInfo() {
    const selectSpecList = Object.values(selectSpec.value);
    const skuInfo = skuList.value.find((item) => {
      return item.specs.toString() === selectSpecList.toString();
    });
    return skuInfo;
  }

  return {
    setSelectSpec,
    disposeData,
    dataInit,
    changeSpec,
    getSkuInfo,
    specList,
    skuList,
    selectSpec,
    mData,
  };
}
