<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Encuestas
        </q-toolbar-title>

        <div>
          <div class="q-pa-md">
            
            <q-avatar class="cursor">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Settings</div>
                      <q-list dense style="min-width: 100px">
                        <q-item clickable v-close-popup>
                          <q-item-section>Perfil</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                          <q-item-section>Configuración</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                          <q-item-section>Ayuda</q-item-section>
                        </q-item>
                      </q-list>
                  </div>

                  <q-separator vertical inset class="q-mx-lg" />

                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>

                    <div class="text-subtitle1 q-mt-md q-mb-xs">{{ tipoUsuario }}</div>
                    <div class="text-subtitle1">{{ nombreUsuario }}</div>

                    <q-btn
                      color="primary"
                      label="Salir"
                      push
                      size="sm"
                      v-close-popup
                      @click="close"
                    />
                  </div>
                </div>
              </q-menu>
            </q-avatar>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header>
          Menú
        </q-item-label>

        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Inicio
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="tipoUsuario === 'ADMINISTRADOR'" clickable to="/encuestas">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Encuestas
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="tipoUsuario === 'ADMINISTRADOR'" clickable to="/general">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Telcel
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="tipoUsuario === 'ADMINISTRADOR'" clickable>
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Administrar Roles
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="tipoUsuario === 'ADMINISTRADOR'" clickable>
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Administrar Formularios / preguntas
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="tipoUsuario != 'ADMINISTRADOR'" clickable to="/encuestasAsignadas">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Encuestas
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    name: 'MainLayout',
    data: () => {
      return {
        leftDrawerOpen: false,
        nombreUsuario: '',
        usuarioLS: null,
        tipoUsuario: ''
      }
    },
    created(){
      this.usuarioLS = JSON.parse(localStorage.getItem('usuario'));
      this.tipoUsuario = this.usuarioLS.rol;
      this.nombreUsuario = this.usuarioLS.nombre + ' ' + this.usuarioLS.apellidos;
      console.log('*_*: ', this.nombreUsuario);
    },
    methods: {
      close(){
        localStorage.clear();
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style lang="sass">
  .cursor
    cursor: pointer
  
</style>