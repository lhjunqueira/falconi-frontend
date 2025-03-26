import { NgModule } from '@angular/core';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeContainerComponent],
  imports: [CommonModule],
  exports: [HomeContainerComponent],
})
export class HomeModule {}
