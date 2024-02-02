<!--评论详情-->
<template>
  <view class="item">
    <Back />
    <template v-if="item">
      <view class="comment-image-wrap">
        <Swipe :autoplay="3000" lazy-render>
          <SwipeItem v-for="image in item.imgList" :key="image">
            <VanImage class="image-wrap" :src="$basePathImg + image" />
          </SwipeItem>
        </Swipe>
        <!--<VanImage :src="item.url"></VanImage>-->
      </view>
      <view class="item-body-wrap">
        <view class="line name">{{ item.name }}</view>
        <view class="line time">{{ item.time }}</view>
        <view class="line">
          <Rate class="rate" v-model="item.level" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />
        </view>
        <view class="line title">
          <TextEllipsis class="title" rows="10" :content="item.content" />
        </view>
      </view>
    </template>
  </view>
</template>

<script setup>
import { Rate, TextEllipsis, Image as VanImage, Swipe, SwipeItem } from 'vant';
import { ref } from 'vue';
import { randomTool } from '@/utils/commom';
import Back from '@/subPackages/share/components/back.vue';
import { onLoad } from '@dcloudio/uni-app';
import { getCommDetailApi } from '@/api/share/share';

const id = ref('');
onLoad((e) => {
  id.value = e.id;
  getDetail();
});

function getDetail() {
  getCommDetailApi({ prodCommId: id.value }).then((res) => {
    console.log('评论详情', res);
    const resp = res.data;
    const url = resp.imgList.length > 0 ? resp.imgList[0] : '';
    item.value = {
      id: id.value,
      name: resp.userName,
      url: url,
      imgList: resp.imgList,
      level: resp.score,
      content: resp.content,
      nowPrice: '',
      orgPrice: '',
      diffPrice: '',
      time: resp.recTime,
    };
  });
}

const item = ref(null);
// item.value = {
//     id: randomTool.uuid(),
//     name: randomTool.word(),
//     url: randomTool.image(),
//     level: randomTool.num(0, 5),
//     content: randomTool.title(30),
//     nowPrice: '',
//     orgPrice: '',
//     diffPrice: '',
//     time: randomTool.time(),
// }
</script>

<style scoped lang="scss">
.van-image {
  width: 100%;
  height: 100%;
}
:deep(.van-swipe) {
  width: 100%;
  height: 100%;
  .image-wrap {
    width: 100%;
    height: 100%;
  }
}
.item {
  //width: 49%;
  //border-radius: 8rpx;
  //border: 2rpx solid #e8e8e8;
  overflow: hidden;
  margin-bottom: 20rpx;

  .comment-image-wrap {
    margin-bottom: 18rpx;
    width: 100%;
    height: 450rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .item-body-wrap {
    padding: 6rpx 16rpx 18rpx 16rpx;
    .line {
      font-size: 20rpx;
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .name {
      font-size: 32rpx;
      font-weight: 600;
    }
    .time {
      font-size: 24rpx;
      color: #6f6f6f;
      letter-spacing: 1.2rpx;
    }
    .title {
      width: 100%;
      font-size: 26rpx;
      letter-spacing: 0.8rpx;
      line-height: 1.4;
    }
  }
}
</style>
