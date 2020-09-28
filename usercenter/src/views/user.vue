<template>
  <div class="user">
    <div class="user-right">
      <img :src="user.avatar" alt="" class="avater">
      <p>{{ user.nickname }}</p>
      <router-link to="message">
          <div class="user-container" :style="{backgroundColor: routeName == 'message' ? '#3e3f85' : '' }">
            个人中心
          </div>
      </router-link>
      <router-link to="shop">
          <div class="user-container" :style="{backgroundColor: routeName == 'shop' ? '#3e3f85' : '' }">
            积分商城
          </div>
      </router-link>
      <div class="user-container">
        <el-button type="text" @click="open" style="color: white; font-size: 16px">退出</el-button>
      </div>
    </div>
    <div class="user-left">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "user",
  data(){
    return{

    }
  },
  created() {

  },
  computed: {
    routeName(){
      return this.$route.name
    },
    ...mapState({
      "user": state => state.login.user
    }),
  },
  methods: {
    open() {
      this.$confirm('此操作将退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        localStorage.removeItem("userid")
        this.$router.replace({
          name: "login"
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });          
      });
    }

  }
};
</script>

<style scope lang="scss">
.user{
  margin: 0 auto;
  width: 1440px;
  display: flex;
  .user-right{
    width: 250px;
    background-color: #151c3b;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    color: white;
    overflow: hidden;
    .avater{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top: 150px;
      margin-bottom: 20px;
    }
    p{
      margin-bottom: 40px;
    }
    a{
      text-decoration: none;
      height: 50px;
      width: 100%;
    }
    .user-container{
      color: white;
      height: 60px;
      width: 100%;
      display: flex; 
      align-items: center;
      justify-content: center;
      cursor: pointer; 
      overflow: hidden;
    }
    .user-container:hover{
      background-color: #3e3f85;
    } 
  } 
  .user-left{
    display: flex;
    position: absolute;
    left: 250px;
    padding: 20px 0;
  }
}
</style>
