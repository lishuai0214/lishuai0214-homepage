<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        width: 60px;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
        position: fixed;
        color: #007bf7;
        bottom: 50px;
        opacity: 0.3;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .markdown-body {
      box-sizing: border-box;
      width: 980px;
      margin: 0 auto 0 auto;
      padding: 30px;
      font-size: 16px;
      background: #ffffff;
    }

    @media (max-width: 767px) {
      .markdown-body {
        padding: 15px;
      }
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{height: `${pageHeight}px`}">
            <Sider ref="side1" :collapsed-width="78" v-model="isCollapsed" style="overflow: auto;" v-show="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses" @on-select="onmenuselect">
                    <Submenu name="daoshililun">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            道氏理论
                        </template>
                        <MenuItem v-for="(menu, index) in mymenus.daoshililun.content" :name="mymenus.daoshililun.number + '-' + (index + 1)" :key="index">{{menu}}</MenuItem>     
                    </Submenu>
                    <Submenu name="yadanglilun">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            亚当理论
                        </template>
                        <MenuItem v-for="(menu, index) in mymenus.yadanglilun.content" :name="mymenus.yadanglilun.number + '-' + (index + 1)" :key="index">{{menu}}</MenuItem>          
                    </Submenu>
                    <Submenu name="gushiqingyubiao">
                        <template slot="title">
                            <Icon type="earth"></Icon>
                            股市晴雨表
                        </template>
                        <MenuItem v-for="(menu, index) in mymenus.gushiqingyubiao.content" :name="mymenus.gushiqingyubiao.number + '-' + (index + 1)" :key="index">{{menu}}</MenuItem>
                    </Submenu>
                    <Submenu name="chalimangge">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            查理·芒格
                        </template>
                        <MenuItem v-for="(menu, index) in mymenus.chalimangge.content" :name="mymenus.chalimangge.number + '-' + (index + 1)" :key="index">{{menu}}</MenuItem>
                    </Submenu>
                    <Submenu name="others">
                        <template slot="title">
                            <Icon type="ios-color-filter"></Icon>
                            其他文章
                        </template>
                        <MenuItem v-for="(menu, index) in mymenus.others.content" :name="mymenus.others.number + '-' + (index + 1)" :key="index">{{menu}}</MenuItem>
                    </Submenu>
                    <Submenu name="chaogudezhihui">
                        <template slot="title">
                            <Icon type="help-buoy"></Icon>
                            炒股的智慧
                        </template>
                        <MenuItem v-for="(menu, index) in mymenus.chaogudezhihui.content" :name="mymenus.chaogudezhihui.number + '-' + (index + 1)" :key="index">{{menu}}</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
              <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0', padding: 0, width: '0px'}" type="navicon-round" size="24"></Icon>
              <div  @click="oncontentclick" v-html="markdown2html" v-highlight class="markdown-body" :style="{width: `${windowwidth}px`}"></div>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import axios from 'axios'
    import marked from 'marked'
    export default {
        data () {
            return {
                isCollapsed: false,
                pageHeight: 900,
                markdown2html: null,
                windowwidth: 0,
                isCollapsed: true,
                mymenus:{
                    daoshililun: {
                        number: 1,
                        content : [
                        '1、道氏理论-技术分析的鼻祖',
                        '2、道氏理论的形成过程',
                        '3、道氏理论的三个假设五个定理',
                        '4、定理1：道氏理论的三种趋势',
                        '5、定理2：主要走势(空头或多头市场)',
                        '6、定理3：主要的空头市场',
                        '7、定理4：主要的多头市场',
                        '8、定理5：次级折返走势',
                        '9、道氏理论基本观点：一 浪潮、波浪及涟漪',
                        '10、道氏理论基本观点：二 基本趋势的几个阶段',
                        '11、道氏理论基本观点：三 相互验证的原则',
                        '12、道氏理论的缺陷',
                        '13、道氏理论总结',
                        ]
                    },
                    yadanglilun: {
                        number: 2,
                        content : [
                        '1、亚当理论-序',
                        '2、第一章：亚当理论为何',
                        '3、第二章：神话故事',
                        '4、第三章：要在市场中成功，我们应该',
                        '5、第四章：从事操作不需要懂得太多',
                        '6、第五章：市场中什么事情最重要',
                        '7、第六章：是与应该',
                        '8、第七章：避免武断',
                        '9、第八章：操作系统',
                        '10、第九章：市场中什么最重要',
                        '11、第十章：何谓趋势',
                        '12、第十一章：一再重复的最基本形式是什么样子',
                        '13、第十二章：准确的重复会产生什么情形',
                        '14、第十三章：什么事会造成最完美的对称',
                        '15、第十四章：预判第二映像',
                        '16、第十五章：用简单的方法画出第二映像图',
                        '17、第十六章：预测包含什么？',
                        '18、第十七章：哪种市场才适合操作',
                        '19、第十八章：回想选择市场的问题',
                        '20、第十九章：头部和底部在哪里？',
                        '21、第二十章：有关市场的重要声明',
                        '22、第二十一章：坐赚大钱',
                        '23、第二十二章：停损出场怎么办？',
                        '4、第二十三章：纪律',
                        '25、第二十四章：回顾亚当理论',
                        '26、第二十五章：何时进场操作',
                        '27、第二十六章：实例棉花',
                        '28、第二十七章：第一个例子的总结',
                        '29、第二十八章：操作十大守则',
                        '30、第二十九章：十大守则详解',
                        '31、第三十章：实例――柯达公司',
                        '32、第三十一章：实例――咖啡豆',
                        '33、第三十二章：心像化',
                        '34、第三十三章：好玩的商品操作者',
                        '35、亚当理论结语'
                        ]
                    },
                    gushiqingyubiao:{
                        number: 3,
                        content: [
                            '1、《股市晴雨表》序言',
                            '2、第1章 周期与股市记录',
                            '3、第2章 电影中的华尔街',
                            '4、第3章 查尔斯·H·道及其理论',
                            '5、第4章 道氏理论：应用于投机',
                            '6、第5章 市场大势',
                            '7、第6章 预测的特有功能',
                            '8、第7章 操纵行为和专业性交易',
                            '9、第8章 市场的结构',
                            '10、第9章 晴雨表中的“水分”',
                            '11、第10章 “海面飘来一朵小云彩，就像一只男人的手”——1906年',
                            '12、第11章 严格的周期性',
                            '13、第12章 预测牛市——1908～09年',
                            '14、第13章 次级运动的本质和功能',
                            '14、第13章 次级运动的本质和功能',
                            '15、第14章 1909年及历史的某些缺陷',
                            '17、第16章 规则的一个例外情况',
                            '18、第17章 最好的证明——1917年',
                            '19、第18章 管制为铁路公司带来了什么',
                            '20、第19章 研究市场操纵行为——1900—01年',
                            '21、第20章 一些结论——1910—14年',
                            '22、第21章 把事实纳入理论——1922—25年',
                            '23、第22章 对投机者的一些建议'
                        ]
                    },
                    chalimangge:{
                        number: 4,
                        content: [
                            '1、查理·芒格：用一生实践的23条铁律',
                            '2、查理芒格：22条误判心理，告诉你偏见是如何产生的？',
                            '3、查理.芒格:人类的25个心理误判',
                            '4、芒格最著名的演讲：第十一讲：人类误判心理学'
                        ]
                    },
                    others:{
                        number: 5,
                        content: [
                            '1、格雷厄姆的失败[转自网络]',
                            '2、格雷厄姆价值投资原则',
                            '3、<<如果>  路德阿德.纪伯伦'
                        ]
                    },
                    chaogudezhihui:{
                        number: 6,
                        content: [
                            '1、前言',
                            '2、引子·三则故事',
                            '3、炒股与人性',
                            '4、炒股与赌博的区别',
                            '5、一般股民炒股为何失败',
                            '6、股票分析的基本知识',
                            '7、基本面分析的基本知识',
                            '8、股票技术分析的基本知识',
                            '9、股票的正常运动和周期运动',
                            '10、股票技术分析之我见',
                            '11、炒股成功的要素',
                            '12、炒股成功的基本要诀',
                            '13、资金管理-怎样在股市下注',
                            '14、成功投资者所具有的共性',
                            '15、 何时买股票何时卖股票',
                            '16、华尔街的家训',
                            '17、大师论炒股',
                            '18、从有招到无招---怎样在心理上建设自己',
                            '19、抓住大机会',
                            '20、学习炒股的四个阶段',
                            '21、回答关于本书的几个问题',
                            '22、附录 金钱的反思',
                            '23、炒股的智慧读后感'
                        ]
                    }
                }
            }
        },
        mounted(){
            this.setpageHeight()
            this.windowwidth = document.body.clientWidth
            let pathArray = this.$route.path.split('/')
            if(pathArray.length > 3){
                this.getMarkdownfile(`/mddocs/stocks/${pathArray[2]}/${pathArray[3]}.md`)
            }else{
                this.getMarkdownfile(`/mddocs/stocks/others/3.md`)
            }
        },
        computed: {
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? '' : 'collapsed-menu'
                ]
            },
            rotateIcon () {
                return [
                    'menu-icon',
                    'layout-header-bar',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            }
        },
        methods: {
          oncontentclick(){
            if (this.isCollapsed) {
              this.isCollapsed = !this.isCollapsed
            }
          },
          collapsedSider(){
            this.isCollapsed = !this.isCollapsed
          },
          onmenuselect(data){
            console.log(data)
            const num = data.split("-")
            switch (num[0]) {
              case "1":
                window.location.href = `/#/stock/daoshililun/${num[1]}`
                this.getMarkdownfile(`/mddocs/stocks/daoshililun/${num[1]}.md`)
                break;
              case "2":
                window.location.href = `/#/stock/yadanglilun/${num[1]}`
                this.getMarkdownfile(`/mddocs/stocks/yadanglilun/${num[1]}.md`)
                break;
              case "3":
                window.location.href = `/#/stock/gushiqingyubiao/${num[1]}`
                this.getMarkdownfile(`/mddocs/stocks/gushiqingyubiao/${num[1]}.md`)
                break;
              case "4":
                window.location.href = `/#/stock/chalimangge/${num[1]}`
                this.getMarkdownfile(`/mddocs/stocks/chalimangge/${num[1]}.md`)
                break;
              case "5":
                window.location.href = `/#/stock/others/${num[1]}`
                this.getMarkdownfile(`/mddocs/stocks/others/${num[1]}.md`)
                break;
              case "6":
                window.location.href = `/#/stock/chaogudezhihui/${num[1]}`
                this.getMarkdownfile(`/mddocs/stocks/chaogudezhihui/${num[1]}.md`)
                break;
              default:
                break;
            }
          },
          setpageHeight () {
            let self = this
            this.pageHeight = window.innerHeight - 2
            window.onresize = () => {
                return (() => {
                    self.pageHeight = window.innerHeight - 2
                    self.windowwidth = document.body.clientWidth
                })()
            }
          },
          getMarkdownfile(url){
            let self = this
            self.markdown2html = null
            //const converter = new showdown.Converter()
            axios.get(url)
              .then(function (response) {
                //self.markdown2html = converter.makeHtml(response.data)
                self.markdown2html = marked(response.data)
              })
              .catch(function (error) {
                console.log(error);
              });
          }
      }
  }
</script>
