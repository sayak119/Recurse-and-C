import {WelcomeComponent} from './welcome/welcome.component';
import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {VisualizerComponent} from './visualizer/visualizer.component'

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'viz',
        component: VisualizerComponent
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      {
        path: '',
        redirectTo: 'welcome'
      }
    ]
  }
]
