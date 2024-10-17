import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private httpService: HttpService, // Injecter HttpService pour faire des appels HTTP
  ) {}

  async createOrder(productId: string, quantity: number): Promise<Order> {
    // Vérifier le produit et la quantité
    const productResponse = await this.httpService
      .get(`http://localhost:3000/products/${productId}`)
      .toPromise();

    const product = productResponse.data;

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (product.quantity < quantity) {
      throw new HttpException('Insufficient quantity', HttpStatus.BAD_REQUEST);
    }

    // Créer la commande
    const newOrder = new this.orderModel({ productId, quantity });
    const order = await newOrder.save();

    // Mettre à jour la quantité du produit
    await this.httpService
      .patch(`http://localhost:3000/products/${productId}/quantity`, {
        newQuantity: product.quantity - quantity,
      })
      .toPromise();

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('productId').exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate('productId').exec();
  }

  async updateOrder(id: string, quantity: number): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, { quantity }, { new: true }).exec();
  }

  async deleteOrder(id: string): Promise<any> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
