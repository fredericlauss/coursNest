import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async createProduct(name: string, price: number, quantity: number): Promise<Product> {
    const newProduct = new this.productModel({ name, price, quantity });
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async updateProduct(id: string, name: string, price: number, quantity: number): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, { name, price, quantity }, { new: true }).exec();
  }

  async deleteProduct(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
