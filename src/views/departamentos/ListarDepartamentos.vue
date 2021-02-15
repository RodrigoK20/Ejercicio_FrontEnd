<template>
  <v-container id="ListarDepartamentos" fluid tag="section">
   
      <v-btn to="/departamentos/crear" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn>

    <base-material-card icon="mdi-clipboard-text"  title="Lista de Departamentos" class="px-5 py-3" id="lista">
      <v-simple-table fixed-header class="elevation-3" id="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="departamento in departamentos" :key="departamento.id">
            <td>{{departamento.id}}</td>
            <td>{{departamento.nombre}}</td>
            <td>{{departamento.estado}}</td>
            <td>
                <v-btn :to="{name:'EditarDepartamento',params:{id:departamento.id}}" fab small color="light-blue"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn @click.stop="dialog=true" @click="id=departamento.id" fab small color="orange darken-4"><v-icon>mdi-delete</v-icon></v-btn>
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
let url = 'http://localhost:8000/api/departamentos';
let url_delete = 'http://localhost:8000/api/departamento/delete/';
import axios from 'axios';
 


export default {
    name: 'ListarDepartamentos',
    mounted(){
        this.obtenerDepartamentos();
    },
    data(){
        return{
          dialog:false,
            departamentos:null
        }
        
    },
    methods:{
        obtenerDepartamentos(){
            axios.get(url)
            .then(response=>{
                this.departamentos = response.data;
            })
            .catch((error)=>{
            
            })
        },
        confimarBorrado(id){
          axios.delete(url_delete + id)
          .then((response)=>{
            console.log(response);
            this.obtenerDepartamentos();
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
