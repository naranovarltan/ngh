import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PreloaderComponent} from './components/preloader/preloader.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    PreloaderComponent],
  declarations: [PreloaderComponent]
})
export class SharedModule {
}
