import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [

         // Departamento
         {
          name: 'ListarDepartamentos',
          path: '/departamentos',
          component: () => import('@/views/departamentos/ListarDepartamentos'),
        },

         // Crear Departamento
         {
          name: 'CrearDepartamento',
          path: '/departamentos/crear',
          component: () => import('@/views/departamentos/CrearDepartamento'),
        },

        
         // Editar Departamento
         {
          name: 'EditarDepartamento',
          path: '/departamentos/editar',
          component: () => import('@/views/departamentos/EditarDepartamento'),
        },

         // Municipios
         {
          name: 'ListarMunicipios',
          path: '/municipios',
          component: () => import('@/views/municipios/ListarMunicipios'),
        },

        //Crear Municipios
         {
          name: 'CrearMunicipio',
          path: '/municipios/crear',
          component: () => import('@/views/municipios/CrearMunicipio'),
        },

        //Editar Municipios
         {
          name: 'EditarMunicipio',
          path: '/municipios/editar',
          component: () => import('@/views/municipios/EditarMunicipio'),
        },

        //Listar Cursos
        {
          name: 'ListarCursos',
          path: '/cursos',
          component: () => import('@/views/cursos/ListarCursos'),
        },

         //Agregar Cursos
         {
          name: 'CrearCurso',
          path: '/cursos/crear',
          component: () => import('@/views/cursos/AgregarCurso'),
        },
       

        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
  ],
})
