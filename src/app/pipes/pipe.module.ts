import { ImagenPipePipe } from './imagen-pipe.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ImagenPipePipe],
  exports: [ImagenPipePipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
