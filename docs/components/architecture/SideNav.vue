<template>
  <aside :class="{'show':isAsideShow}">
    <div class="brand">
      <div @click="toggleAside(false)" class="logo">
        <router-link to="/" exact>
          <logo :scale="0.666"/>
        </router-link>
      </div>
    </div>
    <div class="nav-container">
      <div class="nav-div">
        <ul class="nav nav-pills nav-stacked" role="tablist">
          <template v-for="item in asideItems">
            <template v-if="item.items">
              <li role="presentation" class="no-link">
                <a role="button"><b>{{item.label}}</b></a>
              </li>
              <template v-for="_item in item.items">
                <template v-if="_item.isGroup">
                  <li class="group-title text-muted">{{_item.name}}</li>
                  <li v-for="__item in _item.items" role="presentation" @click="toggleAside(false)">
                    <router-link :to="__item.path" role="button" class="sub-list">
                      {{__item.meta.label}}
                      <span class="label label-success" v-if="__item.meta.new">New</span>
                    </router-link>
                  </li>
                </template>
                <li v-else role="presentation" @click="toggleAside(false)">
                  <router-link :to="_item.path" role="button" class="sub-list">
                    {{_item.meta.label}}
                  </router-link>
                </li>
              </template>
            </template>
            <li v-else-if="item.href" role="presentation" @click="toggleAside(false)">
              <a :href="item.href" target="_blank">
                <b>{{item.label}}</b>
                <span class="glyphicon glyphicon-new-window"></span>
              </a>
            </li>
            <li v-else role="presentation" @click="toggleAside(false)">
              <router-link :to="item.path" role="button">{{item.label}}</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
  import {bus, events} from '../../bus'
  import Logo from './Logo.vue'
  import routes from '../../router/routes'
  import uniq from 'lodash/uniq'

  export default {
    components: {Logo},
    props: ['isAsideShow'],
    data () {
      const components = routes.filter(v => v.meta && v.meta.type === 'stock')
      const groups = uniq(components.map(v => v.meta.group))
        .map(v => {
          return {
            name: v,
            isGroup: true,
            items: components.filter(_v => _v.meta && _v.meta.group === v)
          }
        })
      return {
        asideItems: [
          {label: '介绍', items: routes.filter(v => v.meta && v.meta.type === 'summary')},
          {label: '股票', items: groups}
        ]
      }
    },
    methods: {
      toggleAside (show) {
        bus.$emit(events.TOGGLE_ASIDE, show)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/variables";

  aside {
    position: fixed;
    left: 0;
    top: 0;
    width: @side-nav-width;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    background: @aside-bg;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.24);

    .site-name {
      a {
        color: @site-color;

        &:hover, &:focus, &:active {
          color: @site-color;
          text-decoration: none;
        }
      }
    }

    .brand {
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .logo {
        height: 100px;
        width: 100%;
        position: relative;
        margin-bottom: 20px;

        a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

    .nav-container {
      position: relative;
      padding-bottom: 30px;

      .nav-div {
        position: relative;
      }

      .nav {

        .no-link + .group-title {
          margin-top: 0
        }

        li {
          margin: 0;

          &.group-title {
            margin-top: 15px;
            padding: 10px 15px 10px 30px;
            font-size: .9em;
            opacity: .8;
          }

          a {
            color: #333;
            transition: all .3s ease-in-out;
            text-align: left;
            text-transform: none;
            padding: 15px 15px;
            border: 0;

            &.sub-list {
              padding: 10px 15px 10px 30px;
            }

            &.router-link-active {
              background: @side-nav-item-active-bg;
              color: @highlight-color;
              box-shadow: -6px 0 0 @highlight-color inset;
              font-weight: bold;
            }

            &:hover {
              background: @side-nav-item-active-bg;
            }
          }

          &.no-link {
            a {
              cursor: default;
              background: transparent;
            }
          }
        }
      }
    }
  }

  @media (max-width: @screen-xs-max) {
    aside {
      left: -275px;
      z-index: 1002;
      transition: left .3s ease-in-out;

      &.show {
        left: 0;
      }
    }
  }
</style>
