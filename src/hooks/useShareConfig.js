import { ref } from 'vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';

export function useShareConfig() {
  const { statusHeight } = useSystemInfo();

  // 搜索框样式
  const searchHeight = ref('100rpx');
  const searchPaddingLeftRight = ref('18rpx');

  // 状态栏样式
  const statusBarStyle = ref({
    width: '100%',
    height: statusHeight + 'px',
    background: '#fff',
  });

  return {
    searchHeight,
    searchPaddingLeftRight,
    statusBarStyle,
    statusHeight,
  };
}
