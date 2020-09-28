<template>
  <div class="shop">
    <div class="theme"><h3>商城</h3></div>
    <div class="score">
        <h3>当前积分</h3>
        <h1 v-if="isRecord === false">{{ user.integration }}</h1>
        <h1 v-else>{{ form.integration }}</h1>
    </div>
    <div class="shop">
        <h3>商品列表</h3>
        <div class="shop-card">
          <div class="shopInfo" v-for="(item,index) in list" :key="'item._id'+index">
            <img :src="item.image" alt="" class="image">
            <p>{{ item.name }}</p>
            <div class="to-record">
              <p class="icon"><img src="../assets/record.png" alt="">{{ item.price }}积分</p>
              <el-button @click="record(item)">兑换</el-button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "shop",
  data(){
    return{
      list: [],
      form: {},
      isRecord: false
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapState({
      "user": state => state.login.user
    }),
  },
  methods: {
    async getList(){
      const data = await this.yGet("/shop/shopList")
      if(data){
        console.log("data",data)
        this.list = data
      }
    },
    async getUser(){
      let id = localStorage.getItem('userid')
      const data = await this.yGet('/user/userinfo',
      {
        params:{id}
      })
      console.log('user data',data)
      if(data){
        this.form = data
       
      }
    },
    async recordShop(item){
      let params = {
        id : item._id
      }
      const data = await this.yPut("/shop/exchange",params)
      if(data){
        console.log("data",data)
        this.getUser()
        this.isRecord = true
      }
    },
    record(item) {
      this.$confirm('此操作将兑换商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '兑换成功!'
        });
        this.recordShop(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消兑换'
        });          
      });
    }

  },
};
</script>

<style scope lang="scss">
.shop{
  width: 1190px;
  padding-top: 80px;
  .theme{
    height: 60px;
    width: 100%;
    box-shadow: 0 2px 4px #eee;
    display: flex;
    align-items: center;
    padding-left: 50px;
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    background-color: white;
  }
  .score{
    margin: 20px 50px;
    background-image: url("../assets/jifen-background.png");
    height: 200px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    h1{
        font-size: 40px;
    }
  }
  .shop{
    margin-top: 40px;
    padding: 0 50px;
    .shop-card{
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: space-between;
      .shopInfo{
        width: 252px;
        height: 400px;
        box-shadow: 0 3px 10px #818080;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 30px;
        .image{
          width: 100%;
          height: 252px;
        }
        .to-record{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .icon{
            margin-top: 10px;
            color: #6365bb;
            display: flex;
            align-items: center;
            img{
              width: 20px;
              margin-right: 5px;
            }
          }
          button{
            width: 60px;
            height: 25px;
            border-radius: 5px;
            border: 0;
            outline: none;
            cursor: pointer;
            background-color: #6365bb;
            color: white;
            padding: 0;
          }
        }
      }
    }
  }
} 
</style>
