<template>
  <notifications
    group="custom-template"
    :width="300"
    :max="3"
    position="top center"
  >
    <template slot="body" slot-scope="props">
      <div class="custom-template">
        <div class="custom-template-content">
          <div class="custom-template-title">
            {{ props.item.title }}
          </div>
        </div>
        <div class="custom-template-close" @click="props.close">
          <font-awesome-icon :icon="['fas', 'times']" />
        </div>
      </div>
    </template>
  </notifications>
</template>

<style lang="scss" scoped>
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  &,
  & > div {
    box-sizing: border-box;
  }
  background: #e44d55;
  border: 2px solid #e44d55;

  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;

    .custom-template-title {
      font-size: 15px;
      color: #fff;
    }
  }
}
</style>
