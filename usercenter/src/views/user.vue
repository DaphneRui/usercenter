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
        <el-button type="text" @click="quit" style="color: white; font-size: 16px">退出</el-button>
      </div>
    </div>
    <div class="user-left">
      <router-view></router-view>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>此操作将退出, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmQuit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "user",
  data(){
    return{
      dialogVisible : false
    }
  },
  created() {
  },
  computed: {
    ...mapState({
      "user": state => state.login.user
    }),
    routeName(){
      return this.$route.name 
    },
    
  },
  methods: {
    quit() {
      this.dialogVisible = true
    },
    confirmQuit(){ 
      localStorage.removeItem("userinfo")
      this.$message({
        type: 'success',
        message: '退出成功!'
      });
      this.$router.replace({
        name: "login"
      })
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
    z-index: 9999;
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
