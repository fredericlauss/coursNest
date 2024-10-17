import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async createOrder(productId: string, quantity: number): Promise<Order> {
    const newOrder = new this.orderModel({ productId, quantity });
    return newOrder.save();
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
