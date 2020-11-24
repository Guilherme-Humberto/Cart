import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import ShowCase from './pages/ShowCase'

export const Routes = createAppContainer(
    createSwitchNavigator({
        ShowCase
    })
)