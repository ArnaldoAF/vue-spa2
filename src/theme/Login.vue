<template>
  <div class="content">
      <h2>Login</h2>

      <div v-if="isLogado">
          <p>Name: {{profile.firstName}}</p>
          <p>Favorite Sandwich: {{profile.favoriteSandwich}}</p>
          <button v-on:click="logout()" class="button is-primary">
              LogOut
          </button>
      </div>
      <div v-else>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label  class="label">LO-GIN</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input v-model="username" type="text" class="input" placeholder="SOU NOME">
                </div>
            </div>
        </div>
      </div>

      <div class="field is-horizontal">
          <div class="field-label is-normal">
              <label class="label">SENHA</label>
          </div>
          <div class="field-body">
              <div class="field">
                  <div class="control">
                      <input v-model="password" type="password" class="input" placeholder="SENHA">
                  </div>
              </div>
          </div>
      </div>

      <div class="field is-horizontal">
          <div class="field-label">
            <!---->
          </div>
          <div class="field-body">
              <div class="field">
                  <div class="control">
                      <button v-on:click="login()" class="button is-primary">LOGIN</button>
                  </div>
              </div>
          </div>
      </div>

      </div>
      
      
  </div>
</template>
<script>
    import appService from '../app.service.js'

    export default {
      data () {
        return {
          username: '',
          password: '',
          isLogado: false,
          profile: {}
        }
      },
      watch: {
        isLogado: function (val) {
          if (val) {
            appService.getProfile()
              .then(profile => {
                this.profile = profile
              })
          } else {
            this.profile = {}
          }
        }
      },
      methods: {
        login () {
          appService.login({username: this.username, password: this.password})
            .then((data) => {
              window.localStorage.setItem('token', data.token)
              window.localStorage.setItem('tokenExpiration', data.expiration)
              this.isLogado = true
              this.password = ''
              this.username = ''
            })
            .catch(() => window.alert('Não pode logar!'))
        },
        logout () {
          window.localStorage.setItem('token', null)
          window.localStorage.setItem('tokenExpiration', null)
          this.isLogado = false
        }
      },
      created () {
        let expiration = window.localStorage.getItem('tokenExpiration')
        var unixTimeStamp = new Date().getTime() / 1000
        if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
          this.isLogado = true
        }
      }
}
</script>