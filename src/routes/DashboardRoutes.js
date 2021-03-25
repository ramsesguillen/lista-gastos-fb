import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Categoria } from '../components/gastos/Categoria'
import { Editar } from '../components/gastos/Editar'
import { ListaGastos } from '../components/gastos/ListaGastos'
import { HomeScreem } from '../components/HomeScreem'


export const DashboardRoutes = () => {

    return (
        <>

            <Switch>
                <Route exact path="/lista" component={ ListaGastos }/>
                <Route exact path="/categorias" component={ Categoria }/>
                <Route exact path="/editar/:id" component={ Editar }/>
                <Route exact path="/home" component={ HomeScreem }/>
                <Redirect to="/home"/>
            </Switch>
        </>
    )
}
