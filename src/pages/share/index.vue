<!--首页-->
<template>
  <view class="share-layout">
    <!--顶部导航栏-->
    <bmNavbar />
    <view class="body-wrap">
      <!--广告-->
      <view class="advertised" style="height: 100rpx">广告1</view>

      <!--分类-->
      <view class="category-wrap">
        <view class="title">Shop Your Favorite League</view>
        <view class="list">
          <view class="item-container" v-for="item in categoryList" :key="item.id">
            <image class="item-head" :src="item.url"></image>
            <view class="item-name">{{ item.name }}</view>
          </view>
        </view>
      </view>

      <!--广告-->
      <view class="advertised" style="height: 700rpx">广告2</view>

      <!--热门商品-->
      <view class="hot-commodity-wrap">
        <view class="hot-title">
          <view class="title-left">On Sales</view>
          <view class="title-right">VIEW ALL</view>
        </view>
        <view class="list">
          <view class="item" v-for="item in hotList" :key="item.id">
            <view class="image-wrap">
              <image :src="item.url"></image>
            </view>
            <view class="line now-price">现价格</view>
            <view class="line org-price">原价格</view>
            <view class="line diff-num">差值</view>
            <view class="line title">标题</view>
            <view class="label-wrap">
              <view class="label-item">
                <view class="label-icon"></view>
                <view class="label-name">
                  <view class="name-content">Most Popular</view>
                </view>
              </view>
              <view class="label-item">
                <view class="label-icon"></view>
                <view class="label-name">
                  <view class="name-content">Jersey Assurance</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--广告-->
      <view class="advertised" style="height: 250rpx">广告3</view>

      <!--分类2-->
      <view class="category-wrap2">
        <view>
          <view class="scroll-list">
            <view class="scroll-list__line" v-for="(item, index) in menuArr" :key="index">
              <view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1" :class="[index1 === item.length - 1 && 'scroll-list__line__item--no-margin-right']">
                <image class="scroll-list__line__item__image" :src="item1.icon"></image>
                <view class="scroll-list__line__item__text">{{ item1.name }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--广告-->
      <view class="advertised" style="height: 550rpx">广告4</view>
      <view class="advertised" style="height: 220rpx">广告5</view>
      <view class="advertised" style="height: 220rpx">广告6</view>
      <view class="advertised" style="height: 220rpx">广告7</view>
      <view class="advertised" style="height: 700rpx">广告8</view>

      <!--评论-->
      <view class="comment-wrap">
        <view class="comment-title">
          <view class="title-left">☆☆☆☆☆ 437,466 Reviews</view>
          <view class="title-right">move</view>
        </view>
        <view class="list">
          <view class="item" v-for="item in hotList" :key="item.id">
            <view class="image-wrap">
              <image :src="item.url"></image>
            </view>
            <view class="line now-price">卖家名</view>
            <view class="line org-price">时间</view>
            <view class="line diff-num">评星</view>
            <view class="line title">描述</view>
          </view>
        </view>

        <!--更多-->
        <view class="more">
          <view class="more-btn">Show more reviews</view>
        </view>
      </view>

      <!--底部 = 注册 & logo & 版权-->
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
            <CollapseItem title="CONTACT & INFO" name="1">
              <text>CONTACT & INFO</text>
            </CollapseItem>
            <CollapseItem title="TERMS & POLICIES" name="2">
              <text>TERMS & POLICIES</text>
            </CollapseItem>
            <CollapseItem title="SAY CONNECTED WITH US" name="3">
              <text>SAY CONNECTED WITH US</text>
            </CollapseItem>
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
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { Button as VanButton, Field, Collapse, CollapseItem } from 'vant';
import { randomWord, randomImage, uuid } from '@/utils/commom';
import bmBox from '@/components/bm/box/box.vue';
import bmNavbar from '@/subPackages/share/navbar.vue';

// 分类
const categoryList = ref([
  { id: uuid(), name: 'NFL', url: randomImage() },
  { id: uuid(), name: 'NCAA', url: randomImage() },
  { id: uuid(), name: 'MLB', url: randomImage() },
  { id: uuid(), name: 'NBA', url: randomImage() },
  { id: uuid(), name: 'NHL', url: randomImage() },
  { id: uuid(), name: 'MLS', url: randomImage() },
  { id: uuid(), name: 'Soccer', url: randomImage() },
  { id: uuid(), name: 'NASCAR', url: randomImage() },
  { id: uuid(), name: 'WWE', url: randomImage() },
  { id: uuid(), name: 'WNBA', url: randomImage() },
  { id: uuid(), name: 'Golf', url: randomImage() },
  { id: uuid(), name: 'F1', url: randomImage() },
]);

// 热门商品
const hotList = ref([
  { id: uuid(), name: 'NFL', url: randomImage() },
  { id: uuid(), name: 'NCAA', url: randomImage() },
  { id: uuid(), name: 'MLB', url: randomImage() },
  { id: uuid(), name: 'NBA', url: randomImage() },
  { id: uuid(), name: 'NHL', url: randomImage() },
]);

// 分类2
const menuArr = ref([
  [
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
  ],
  [
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
  ],
]);

// 版权
const activeCollapse = ref([]);
</script>

<style lang="scss">
$searchPaddingLeftRight: 18rpx;

.share-layout {
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .body-wrap {
    flex: 1;

    // 广告
    .advertised {
      background: #f2f2f2;
      border-top: 1rpx solid #bbb;
      border-bottom: 1rpx solid #bbb;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
    }

    // 分类
    .category-wrap {
      padding: 0 60rpx;

      .title {
        margin: 18rpx 0;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 34rpx;
        font-family: 'monica-ext-font_YIBBBFG', serif;
      }

      .list {
        display: flex;
        flex-wrap: wrap;

        .item-container {
          margin-bottom: 50rpx;
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .item-head {
            border: 2rpx solid #bbb;
            border-radius: 50%;
            width: 130rpx;
            height: 130rpx;
          }
          .item-name {
            margin-top: 4rpx;
            font-size: 24rpx;
            text-align: center;
          }
        }
      }
    }

    // 热门商品
    .hot-commodity-wrap {
      padding: 10rpx $searchPaddingLeftRight;

      .hot-title {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0;
        font-weight: bold;
        margin-bottom: 10rpx;
        .title-left {
        }
        .title-right {
          text-decoration: underline;
        }
      }
      .list {
        display: flex;
        overflow: auto;
        $itemWidth: 420rpx;
        .item {
          min-width: $itemWidth;
          margin-right: 20rpx;
          //background: pink;
          border-radius: 4px;
          overflow: hidden;
          &:last-child {
            margin-right: 0;
          }

          .image-wrap {
            margin-bottom: 24rpx;
            width: $itemWidth;
            height: calc($itemWidth + 50rpx);
            border: 2rpx solid #f2f2f2;
            border-radius: 8rpx;
            overflow: hidden;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .line {
            height: 44rpx;
            font-size: 20rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f2f2f2;
          }
          .now-price {
            margin-bottom: 6rpx;
          }
          .org-price {
            margin-bottom: 6rpx;
          }
          .diff-num {
          }
          .title {
            margin-top: 20rpx;
            height: 90rpx;
          }

          .label-wrap {
            margin-top: 20rpx;
            .label-item {
              display: flex;
              margin-bottom: 8rpx;
              .label-icon {
                min-width: 50rpx;
                min-height: 50rpx;
                background: #f2f2f2;
                margin-right: 16rpx;
              }
              .label-name {
                flex: 1;
                display: flex;
                align-items: center;
                .name-content {
                  font-size: 26rpx;
                  width: 240rpx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }

    // 分类2
    .category-wrap2 {
      margin-top: 40rpx;
      padding: 0 30rpx;
      .scroll-list {
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding-bottom: 46rpx;
        // 行
        .scroll-list__line {
          display: flex;
          margin-top: 20rpx;
          // 列 item
          .scroll-list__line__item {
            margin-right: 30rpx;
            .scroll-list__line__item__image {
              width: 200rpx;
              height: 200rpx;
              border-radius: 50%;
              border: 2rpx solid #f2f2f2;
            }
            .scroll-list__line__item__text {
              margin-top: 10rpx;
              color: #606266ff;
              font-size: 24rpx;
              text-align: center;
            }
          }
        }
      }
    }

    // 评论
    .comment-wrap {
      padding: 10rpx $searchPaddingLeftRight;

      .comment-title {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0;
        margin-bottom: 10rpx;
        .title-left {
        }
        .title-right {
          font-weight: bold;
          text-decoration: underline;
        }
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: auto;
        .item {
          width: 49%;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20rpx;

          .image-wrap {
            margin-bottom: 18rpx;
            width: 100%;
            height: 450rpx;
            border: 2rpx solid #f2f2f2;
            border-radius: 8rpx;
            overflow: hidden;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .line {
            height: 44rpx;
            font-size: 20rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f2f2f2;
          }
          .now-price {
            margin-bottom: 6rpx;
          }
          .org-price {
            margin-bottom: 6rpx;
          }
          .diff-num {
          }
          .title {
            margin-top: 18rpx;
            height: 90rpx;
          }
        }
      }

      .more {
        margin-top: 26rpx;
        margin-bottom: 10rpx;
        display: flex;
        justify-content: center;
        .more-btn {
          border: 2rpx solid #bbbbbb;
          padding: 8rpx 30rpx;
          border-radius: 6rpx;
        }
      }
    }

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
          padding: 0 $searchPaddingLeftRight;

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
  }
}
</style>
