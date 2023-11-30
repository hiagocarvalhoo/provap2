
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'

import ListaCarrosAsyncStorage from '../screens/ListaCarrosAsyncStorage/ListaCarros'
import ListaAviaoAsyncStorage from '../screens/ListaAviaoAsyncStorage/ListaAviao'
import ListaMotoAsyncStorage from '../screens/ListaMotoAsyncStorage/ListaMoto'
import ListaBikeAsyncStorage from '../screens/ListaBikeAsyncStorage/ListaBike'
import StackPessoasFormularioAltoNivel from '../screens/PessoasFormularioAltoNivel/StackPessoasFormularioAltoNivel'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='ListaCarrosAsyncStorage'>

            <Drawer.Screen name="CarrosAsyncStorage" component={ListaCarrosAsyncStorage} />
            <Drawer.Screen name="AviaoAsyncStorage" component={ListaAviaoAsyncStorage} />
            <Drawer.Screen name="MotoAsyncStorage" component={ListaMotoAsyncStorage} />
            <Drawer.Screen name="BikeAsyncStorage" component={ListaBikeAsyncStorage} />
            <Drawer.Screen name="FormularioAltoNivel" component={StackPessoasFormularioAltoNivel} />

        </Drawer.Navigator>

    )
}