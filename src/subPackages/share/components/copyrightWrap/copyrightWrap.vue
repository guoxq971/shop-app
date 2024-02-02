<!--底部 = 注册 & logo & 版权-->
<template>
  <view class="copyright-wrap">
    <view class="copyright-title">SIGN UP & SAVE</view>

    <!--登陆/注册-->
    <view class="sign-wrap">
      <view class="sign-wrap-bd">
        <view class="xxx">xxxxxxxxxxx</view>
        <Field class="ipt" type="text" placeholder="Enter your email address..." />
        <view class="btn-wrap">
          <VanButton class="btn">SIGN UP</VanButton>
        </view>
      </view>
    </view>

    <!--网站优势-->
    <view class="advantage">
      <view class="advantage-bd">
        <bm-box v-for="item in 4" width="50%">
          <view class="item-box">
            <view class="box">网站优势{{ item }}</view>
          </view>
        </bm-box>
      </view>
    </view>

    <!--logo-->
    <view class="logo-wrap">
      <view class="logo">logo</view>
    </view>

    <!--折叠面板-->
    <view class="collapse-wrap">
      <Collapse v-model="activeCollapse">
        <CollapseItem v-for="item in collapseList" :key="item.id" :title="item.title" :name="item.id">
          <view v-html="item.content"></view>
        </CollapseItem>
        <!--        <CollapseItem title="CONTACT & INFO" name="1">-->
        <!--          <text>CONTACT & INFO</text>-->
        <!--        </CollapseItem>-->
        <!--        <CollapseItem title="TERMS & POLICIES" name="2">-->
        <!--          <text>TERMS & POLICIES</text>-->
        <!--        </CollapseItem>-->
        <!--        <CollapseItem title="SAY CONNECTED WITH US" name="3">-->
        <!--          <text>SAY CONNECTED WITH US</text>-->
        <!--        </CollapseItem>-->
      </Collapse>
    </view>

    <!--多个链接-->
    <view class="link-wrap">
      <view class="link-wrap-bd">
        <bm-box width="20%" class="link">
          <view class="link-item">twitter</view>
        </bm-box>
        <bm-box width="20%" class="link">
          <view class="link-item">face</view>
        </bm-box>
        <bm-box width="20%" class="link">
          <view class="link-item">ins</view>
        </bm-box>
        <bm-box width="20%" class="link">
          <view class="link-item">xxx</view>
        </bm-box>
        <bm-box width="20%" class="link">
          <view class="link-item">xxx</view>
        </bm-box>
      </view>
    </view>

    <!--版权-->
    <view class="copyright-wrap-bottom">
      <view class="chunk"></view>
      <view class="text">2023 xxxxxx. All Right Reserved Powered by xxx</view>
    </view>
    <view class="copyright-wrap-chunk-wrap">
      <view class="chunk">paypal</view>
      <view class="chunk">Klarna</view>
      <view class="chunk">stripe</view>
    </view>
  </view>
</template>

<script setup>
import { Collapse, CollapseItem, Field, Button as VanButton } from 'vant';
import bmBox from '@/components/bm/box/box.vue';
import { ref } from 'vue';
import { getConfigurationApi } from '@/api/share/share';
import { onShow } from '@dcloudio/uni-app';
import { randomTool } from '@/utils/commom';
onShow(() => {
  getCopyright();
});
// 版权
const activeCollapse = ref([]);

const collapseList = ref(
  Array.from({ length: 0 }, () => {
    return {
      id: randomTool.uuid(),
      title: 'title',
      content: '<h1>content</h1>',
    };
  }),
);
// 获取折叠面板信息
function getCopyright() {
  getConfigurationApi().then((res) => {
    // console.log('网站管理内容', res);
    collapseList.value = res.data.map((e) => {
      return {
        detail: e,
        id: randomTool.uuid(),
        title: e.keyName,
        content: e.configurationValue,
      };
    });
  });
}
</script>

<style scoped lang="scss">
// 版权
.copyright-wrap {
  border-top: 2rpx solid #bbb;

  .copyright-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88rpx;
    font-weight: bold;
  }

  // 登录/注册
  .sign-wrap {
    border-bottom: 2rpx solid #bbb;
    padding: 20rpx 0 32rpx 0;
    .sign-wrap-bd {
      padding: 0 18rpx;

      .xxx {
        color: #888;
        margin-bottom: 12rpx;
      }
      .ipt {
        margin-bottom: 12rpx;
      }
      .btn-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        .btn {
          width: 100%;
          height: 70rpx;
          border: 2rpx solid #4f4949;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  // 网站优势
  .advantage {
    border-bottom: 2rpx solid #bbb;
    padding: 20rpx 0 32rpx 0;
    .advantage-bd {
      display: flex;
      flex-wrap: wrap;
      padding: 0 40rpx;
      .item-box {
        padding: 8rpx;
        width: 100%;
        height: 100%;
        .box {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2rpx solid #bbb;
        }
      }
    }
  }

  // logo
  .logo-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 47px;
    margin-top: 10px;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #bbb;
      width: 45%;
      height: 37px;
    }
  }

  // 折叠面板
  .collapse-wrap {
    padding: 0 20rpx;
    margin-top: 30rpx;
  }

  // 多个链接
  .link-wrap {
    margin-top: 60rpx;
    padding: 0 40rpx;
    .link-wrap-bd {
      gap: 20rpx;
      display: flex;
      justify-content: center;
      border-bottom: 2rpx solid #bbb;
      padding: 0 66rpx 54rpx 66rpx;
    }
    .link-item {
      width: 100%;
      height: 100%;
      font-size: 26rpx;
      border-radius: 6rpx;
      border: 2rpx solid #bbb;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  // 版权
  .copyright-wrap-bottom {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    padding: 30rpx 0;
    .chunk {
      width: 36rpx;
      height: 36rpx;
      background: #bbb;
    }
    .text {
      font-size: 24rpx;
      font-weight: bold;
      margin-left: 14rpx;
      display: flex;
      align-items: center;
    }
  }
  .copyright-wrap-chunk-wrap {
    display: flex;
    justify-content: center;
    gap: 20rpx;
    margin-bottom: 26rpx;
    .chunk {
      background: #f2f2f2;
      width: 188rpx;
      height: 60rpx;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
