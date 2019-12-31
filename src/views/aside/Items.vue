<template>
  <li>
    <div @click="handleToggle" :class="liClass">{{model.menuName}}</div>
    <transition name="slide">
      <ul v-show="open">
        <items v-for="(item,index) in model.childTree" :model="item" :key="index"></items>
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'items',
  props: ['model'],
  data () {
    return {
      open: false
    };
  },
  methods: {
    handleToggle () {
      this.open = !this.open;
    }
  },
  computed: {
    liClass () {
      // eslint-disable-next-line no-unused-vars
      let _this = this;
      let option = `level_${this.model.level}`;
      let res = {};
      res[option] = true;
      return res;
    }
  }

};
</script>

<style lang="less" scope>
@base: #285b91;
ul {
   li {
    box-sizing: border-box;
    display: block;
    padding-left: 10px;
    width: 100%;
    max-height: 38px;
    line-height: 38px;
    font-size: 1em;
    color: #111;
    border-left: 3px solid rgb(241, 241, 241);
    cursor: pointer;
    border-bottom: 1px dashed rgb(201, 201, 203);
    }
    li:hover {
      color: rgb(50, 92, 147);
      border-left: 3px solid @base;
    }
    .active {
      border-left: 3px solid @base;
      background-color: rgb(214, 210, 210);
    }
    .active::after{
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 12px;
      border: 8px solid transparent;
      border-width: 14px 10px;
      border-right-color: rgb(50, 92, 147);
    }
    .level_2 {
      text-indent: 1.5em;
    }
    .level_3 {
      text-indent: 4em;
    }
    .level_4 {
      text-indent: 6em;
    }
  }

  .slide-enter-active,.slide-leave-active {
    transition: all 0.2s;
  }
  .slide-enter,.slide-leave-to {
    transform: translateX(-20px);
  }
</style>
