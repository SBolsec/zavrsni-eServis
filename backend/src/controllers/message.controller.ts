import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Message } from "../models";
import { createMessage, getMessage, getMessages, IMessagePayload } from '../repositories/message.repository';

@Route("messages")
@Tags("Message")
export default class FaultCategoryController {
  
  @Get("/")
  public async getMessages(): Promise<Message[]> {
    return getMessages();
  }

  @Post("/")
  public async createMessage(@Body() body: IMessagePayload): Promise<Message> {
    return createMessage(body);
  }

  @Get("/:id")
  public async getMessage(@Path() id: string): Promise<Message | null> {
    return getMessage(Number(id));
  }
}
