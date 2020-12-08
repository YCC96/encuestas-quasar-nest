<template>
    <div class="fondo">
        <div class="column justify-center items-center" style="height: 10vh">
            <div class="col-4">
                <div class="q-pa-md row items-start q-gutter-md">
                    <q-card class="cardLogin">
                    <img src="../assets/img/fondoEncuesta1.png" alt="Imagen encuesta">

                    <q-card-section>
                        <div class="text-h4" style="text-align:center">Iniciar Sesión</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="q-pa-md" style="width:100%">
                            <q-form
                                @submit="IniciarSecion"
                                class="q-gutter-md">
                                <q-input dense
                                    v-model="correo"
                                    label="Correo *"
                                    hint=""
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type something']">
                                    <template v-slot:prepend>
                                        <q-icon name="email" />
                                    </template>
                                </q-input>
                                <q-input dense
                                    type="password"
                                    v-model="pass"
                                    label="Contraseña *"
                                    lazy-rules
                                    >
                                    <!--

                                    :rules="[
                                    val => val !== null && val !== '' || 'Please type your age',
                                    val => val > 0 && val < 100 || 'Please type a real age']"
                                    -->
                                        <template v-slot:prepend>
                                            <q-icon name="lock" />
                                        </template>
                                    </q-input>
                                <div style="text-align: center">
                                    <!--
                                    <q-btn push class="full-width" label="Iniciar" type="submit" color="primary" :disable="false"/>

                                    -->
                                    <q-btn
                                        push
                                        class="full-width"
                                        :loading="loading1"
                                        :percentage="percentage1"
                                        color="primary"
                                        @click="startComputing(1)"
                                        :disable="disableButton"
                                        type="submit"
                                        >
                                        Iniciar
                                        <template v-slot:loading>
                                            <q-spinner-gears class="on-left" />
                                            Iniciando...
                                        </template>
                                    </q-btn>
                                </div>
                            </q-form>
                        </div>
                    </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { stringify } from 'querystring';
    import * as GlobalService from '../utils/GlobalService';

    export default {
        data: () => {
            return {
                correo: 'yordycruz96@gmail.com',
                pass: 'welcome1',
                disableButton: false,

                loading1: false,
                percentage1: 0,
            }
        },
        methods: {
            IniciarSecion(){
                var data = {
                    correo: this.correo,
                    password: this.pass
                }
                GlobalService._consultaLogin(data).then(resp => {
                    if (resp.data.existe) {
                    console.log('*_* respuesta: ', JSON.stringify(resp.data));
                        localStorage.setItem('usuario', JSON.stringify(resp.data));
                        this.$router.push({ name: "inicio" });
                        
                    }
                }).catch(error => {

                });
            },
            startComputing (id) {
                this[`loading${id}`] = true
                this[`percentage${id}`] = 0
                this[`interval${id}`] = setInterval(() => {
                    this[`percentage${id}`] += Math.floor(Math.random() * 8 + 10)
                    if (this[`percentage${id}`] >= 100) {
                    clearInterval(this[`interval${id}`])
                    this[`loading${id}`] = false
                    }
                }, 500)
            }
        }
    }
</script>


<style lang="sass" scoped>
    .img
        height: 100%
    .cardLogin
        width: 100%
        max-width: 500px
    .fondo
        width: 100vw
        height: 100vh
        //background: $cyan-6

        //background: $cyan-3

        //background: $light-blue-8
        //background: $light-blue-13
        //background: $light-blue-5
        //background-image: url(../assets/img/redesn.jpg)
        background-image: url(../assets/img/redes1.jpg)
    .fondoform
        width: 70%
        height: 50%
        background: $blue-1
</style>