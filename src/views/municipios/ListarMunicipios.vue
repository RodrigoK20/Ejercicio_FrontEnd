<template>
  <v-container id="ListarMunicipios" fluid tag="section">
   
      <v-btn to="/municipios/crear" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn>

    <base-material-card icon="mdi-clipboard-text"  title="Lista de Municipios" class="px-5 py-3" id="lista">
      <v-simple-table fixed-header class="elevation-3" id="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Municipio</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="municipio in municipios" :key="municipio.id">
            <td>{{municipio.id}}</td>
            <td>{{municipio.nombre}}</td> 
            <td>{{municipio.departamento.nombre}}</td> <!--acceder a objeto departamento del JSON -->
         
         
            <td>
                <v-btn :to="{name:'EditarMunicipio',params:{id:municipio.id}}" fab small color="light-blue"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn @click.stop="dialog=true" @click="id=municipio.id" fab small color="orange darken-4"><v-icon>mdi-delete</v-icon></v-btn>
            </td>

          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>



  <!-- Ventana de diaglo para eliminar registros -->
  <v-dialog v-model="dialog" max-width="350">

    <v-card>
      <v-card-title class="headline">¿Desea eliminar el registro?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=false">Cancelar</v-btn>
        <v-btn @click="confimarBorrado(id)" color="error">Aceptar</v-btn>
      </v-card-actions>
    </v-card>


  </v-dialog>


  </v-container>
</template>

<script>
let url = 'http://localhost:8000/api/municipios';
let url_delete = 'http://localhost:8000/api/municipio/desactivar/';
import axios from 'axios';
 


export default {
    name: 'ListarMunicipios',
    mounted(){
        this.obtenerMunicipios();
    },
    data(){
        return{
          dialog:false,
            municipios:{},            
        }
        
    },
    methods:{
        obtenerMunicipios(){
            axios.get(url)
            .then(response=>{
                console.log(response);
                this.municipios = response.data.municipios;
            })
            .catch((error)=>{
            
            })
        },
        confimarBorrado(id){
          axios.post(url_delete + id)
          .then((response)=>{
            console.log(response);
            this.obtenerMunicipios();
            this.dialog=false;
          })
        },

    }
}
</script>

<style>
#tabla, th{
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 200px;
}

</style>
