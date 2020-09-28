<template>
  <div class="login">
    <div class="login-left">
      <img src="../assets/auth.png" alt="">
    </div>
    <div class="login-right">
      <h1>欢迎登录</h1>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item class="login-input" prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入您的用户名" />
        </el-form-item>
        <el-form-item class="login-input" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入您的密码" />
        </el-form-item>
        <div class="to-regist">
          <p>还没有账户？</p>
          <p style="color: #6964d1; cursor: pointer;" @click="toRegist">新用户注册</p>
        </div>
        <el-form-item class="to-login">
          <el-button @click="checkData">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "login",
  data(){
    return{
      form: {},
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur',
            // validator(rule, value, callback) {
            //   if (value!=this.form.password) {
            //       callback(new Error("密码错误,请重新输入"));
            //   } else {
            //       callback();
            //   }
            // }
          }
        ],
      }      
    }
  },
  methods: {
    ...mapActions([
      'setUser'
    ]),
    toRegist(){
      this.$router.push({
        name: "regist"
      })
    },
    checkData(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false;
        }
      })
    },
    async login(){
      const data = await this.yPost('/user/login',this.loginForm)
      console.log('login data',data, this.$store)
      if(data){
        const userid = data.user._id
        localStorage.setItem('userid',userid)
        this.setUser(data.user);
        this.$router.push({
          name: "user"
        })
      }else{
        this.$message({
          type: 'info',
          message: '用户名或密码错误,请重新输入!'
        });
      }
    }    
  },

};
</script>

<style scope lang="scss">
.login{
  width: 1200px;
  height: 678px;
  margin: 70px auto 0;
  box-shadow: 1px 2px 15px #e8e8e8;
  display: flex;
  .login-left{
    width: 600px;
    height: 678px;
    img{
      width: 100%;
      height: 678px;
    }
  }
  .login-right{
    width: 600px;
    height: 678px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
      font-size: 36px;
      font-weight: 500;
      color: #202020;
      text-align: center;
      line-height: 50px;
    }
    .login-input{
      width: 320px;
      height: 44px;
      text-align: center;
      margin: 40px auto 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      input{
        width: 320px;
        height: 44px;
        background: transparent;
        outline: none;
        border: 0;
        padding: 0 24px;
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        outline: none;
      }
    }
    .to-regist{
      font-size: 16px;
      font-weight: 500;
      color: #3f3f3f;
      line-height: 36px;
      text-align: center;
      padding-top: 20px;
      display: flex;
      justify-content: center;
    }
    .to-login{
      padding-top: 20px;
      text-align: center;
      button{
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #fff;
        border-color: #6964d1;
        width: 320px;
        height: 44px;
        background-color: #6964d1;
        border-radius: 4px;
        border: 0;
        outline: none;
        cursor: pointer;
      }
    }
  }
}  
</style>
