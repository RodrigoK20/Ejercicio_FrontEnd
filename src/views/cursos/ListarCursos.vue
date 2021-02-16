<template>
  <v-container id="ListarCursos" fluid tag="section">
   
      <v-btn to="/cursos/crear" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn>

    <base-material-card icon="mdi-clipboard-text"  title="Lista de Cursos" class="px-5 py-3" id="lista">
      <v-simple-table fixed-header class="elevation-3" id="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Horas Curso</th>
            <th>Fecha_Inicio</th>
            <th>Fecha_Fin</th>
            <th>Numero Participantes</th>
            <th>Costo $</th>
          </tr>
        </thead>

        <tbody>
 
        <tr v-for="curso in cursos" :key="curso.id">
            <td>{{curso.id}}</td>
            <td>{{curso.nombre}}</td> 
            <td>{{curso.horas_curso}}</td>
            <td>{{curso.fecha_inicio_date}}</td>
            <td>{{curso.fecha_fin_date}}</td>
            <td>{{curso.numero_participantes}}</td>
            <td>${{curso.costo}}</td>
         
  
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

let url = 'http://localhost:8000/api/cursos';

export default{
 name: 'ListarCursos',
    mounted(){
        this.obtenerCursos();
    },
    data(){
        return{
            cursos:{},            
        }
    
    },
 methods:{
        obtenerCursos(){
            this.axios.get(url)
            .then(response=>{
                console.log(response);
                this.cursos = response.data;
            })
            .catch((error)=>{
            
            })
        },
     

    }
}


</script>

<style>


</style>
