import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NavbarComponent} from './shared/navbar/navbar.component'
import {MainComponent} from './main.component'
import {WelcomeComponent} from './welcome/welcome.component'
import {RouterModule} from '@angular/router'
import {routes} from './main.routes'
import {VisualizerComponent} from './visualizer/visualizer.component'

import { AceEditorModule } from 'ng2-ace-editor';
import {MatFormFieldModule, MatSliderModule} from '@angular/material'
import {FormsModule} from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AceEditorModule,
    MatSliderModule,
    MatFormFieldModule
  ],
  declarations: [NavbarComponent, MainComponent, WelcomeComponent, VisualizerComponent],
  exports: [
    NavbarComponent
  ]
})
export class MainModule {
}
