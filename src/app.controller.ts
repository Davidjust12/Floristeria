import { Controller, Get } from '@nestjs/common';

@Controller('productos')
export class ProductosController {
  @Get()
  getProductos() {
    return { mensaje: 'Módulo de productos listo' };
  }
}