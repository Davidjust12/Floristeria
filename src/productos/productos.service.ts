import { Injectable, NotFoundException } from '@nestjs/common';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
}

@Injectable()
export class ProductosService {
  private productos: Producto[] = [];
  private idCounter = 1;

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  create(data: Omit<Producto, 'id'>): Producto {
    const nuevoProducto: Producto = { id: this.idCounter++, ...data };
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  update(id: number, data: Partial<Producto>): Producto {
    const producto = this.findOne(id);
    Object.assign(producto, data);
    return producto;
  }

  remove(id: number): void {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    this.productos.splice(index, 1);
  }
}