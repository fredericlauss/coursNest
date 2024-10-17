import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Créer un nouveau produit
  @Post()
  async createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
  ) {
    return this.productService.createProduct(name, price, quantity);
  }

  // Récupérer tous les produits
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // Récupérer un produit par son ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  // Mettre à jour un produit par son ID
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
  ) {
    return this.productService.updateProduct(id, name, price, quantity);
  }

  // Supprimer un produit par son ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
