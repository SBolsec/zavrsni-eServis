import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Message } from "../models";
import {
  createMessage,
  getMessage,
  getMessages,
  getUserMessages,
  IMessagePayload,
} from "../repositories/message.repository";
import PersonController from "./person.controller";
import ServiceController from "./service.controller";

@Route("messages")
@Tags("Message")
export default class MessageController {
  @Get("/")
  public async getMessages(): Promise<Message[]> {
    return getMessages();
  }

  @Post("/")
  public async createMessage(@Body() body: IMessagePayload): Promise<Message> {
    return createMessage(body);
  }

  @Get("/id/:id")
  public async getMessage(@Path() id: string): Promise<Message | null> {
    return getMessage(Number(id));
  }

  @Get("/user/:id")
  public async getUserMessages(@Path() id: string): Promise<any> {
    const messages: any = await getUserMessages(Number(id));

    const personController = new PersonController();
    const serviceController = new ServiceController();

    let data: any[] = [];
    for (let message of messages) {
      let receiverId =
        message.receiverId === Number(id)
          ? message.senderId
          : message.receiverId;

      // add name and picture of receiver
      let person = await personController.getPersonByUserId(
        receiverId.toString()
      );
      if (person) {
        message.receiver = {
          id: receiverId,
          name: person.firstName + " " + person.lastName,
          profilePicture: person.profilePicture,
        };
      } else {
        let service = await serviceController.getServiceByUserId(
          receiverId.toString()
        );
        message.receiver = {
          id: receiverId,
          name: service.name,
          profilePicture: service.profilePicture,
        };
      }

      // group messages by receivers
      let foundReceiver = false;
      data.forEach((e) => {
        if (e.receiver.id === receiverId) {
          foundReceiver = true;
          e.messages.push(message);
        }
      });
      if (!foundReceiver) {
        data.push({
          receiver: message.receiver,
          messages: [message],
        });
      }
    }

    return data;
  }
}
