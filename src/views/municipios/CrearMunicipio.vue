<template>

    <v-container>

        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Crear municipio</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardar()">
                  <v-text-field
                     v-model="municipio.nombre"
                     label="Nombre"
                     outlined
                     required
                     ></v-text-field>

        <span>Seleccione un departamento: </span> <br>
             <select v-model="municipio.departamento_id" id="select1" required>  
                <option  v-for="departamento in departamentos" :value="departamento.id" :key="departamento.id">
                 {{departamento.nombre}}
            </option>
        </select>


                <v-card-actions>
                    <v-btn color="blue-grey" to="/municipios" class="mr-4">Cancelar</v-btn>
                    <v-btn color="indigo" type="submit" class="mr-4">Guardar</v-btn>
                </v-card-actions>

            </form>

            </v-col>
        </v-row>

    </v-container>
     
</template>

<script>
let url_store='http://localhost:8000/api/municipio/add';
let url_depart = 'http://localhost:8000/api/municipio/cargar_departamentos';

import axios from 'axios';

import Vue from 'vue';
import VueSwal from 'vue-swal';

Vue.use(VueSwal)

export default {
    name: 'CrearMunicipio',
    mounted(){
        this.obtenerDepartamentos();
    },
    data(){
        return{
            departamentos:[],
            municipio:{
                nombre:'',
                deparmento_id:'',
            },            
        }
        
    },
    methods:{
        obtenerDepartamentos(){
            this.axios.get(url_depart)
            .then(response=>{
                console.log(response);
                this.departamentos = response.data.departamentos;
            })
            .catch((error)=>{
                console.log(error);
            })
        },
    
        guardar(){
            let router = this.$router;
            let params = this.municipio;
            axios.post(url_store, params)
            .then(response=>{


            //Validacion 
             if(response.status == 200){
                 console.log("status 200");

             this.$swal({
                icon: 'success',
                title: 'Municipio registrado',
                text: "Guardado en la base de datos",
                showConfirmButton: false,
                timer: 1500
             })

                 router.push('/municipios');

             }

            })  

       .catch((error)=>{
              // console.log(error.response.data.errors.nombre);
                   if(error.response.data.errors.nombre == 'El nombre del municipio ya se encuentra registrado'){
                  console.log("status 422");
                  this.$swal({
                icon: 'warning',
                title: 'Municipio duplicado',
                text: "El nombre del municipio ya se encuentra registrado!",
                showConfirmButton: false,
                timer: 3500
             })
             };

            })


    }
    

    }
    
}
</script>


<style>

#select1{
display: block;
  font-size: 16px;
  font-family: 'Verdana', sans-serif;
  font-weight: 400;
  color: #444;
  line-height: 1.3;
  padding: .4em 1.4em .3em .8em;
  width: 100%;
  max-width: 100%; 
  box-sizing: border-box;
 margin: 20px auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.03);
  border-radius: .3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#f7f7f7 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
</style>