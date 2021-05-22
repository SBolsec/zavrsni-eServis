import { Get, Route, Tags, Post, Body, Path, Query } from "tsoa";
import { Message } from "../models";
import {
  createMessage,
  getMessage,
  getMessages,
  getUserMessages,
  getContacts,
  getContactById,
  readMessage,
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

      // delete receiver info from all messages
      let receiver = message.receiver;
      delete message.receiver;

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
          receiver: receiver,
          messages: [message],
        });
      }
    }

    data.reverse();

    return data;
  }

  @Get("/contacts")
  public async getContacts(
    @Query() id: number,
    @Query() name: string
  ): Promise<any[]> {
    let contacts: any = await getContacts(id, name);

    // add picture if there is none
    contacts.forEach((c: any) => {
      c.profilePicture = {
        url: c.profilepictureurl
          ? c.profilepictureurl
          : "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
      };
      delete c.profilepictureurl;
    });

    return contacts;
  }

  @Get("/contacts/:id")
  public async getContactById(@Path() id: number): Promise<any> {
    let contact: any = await getContactById(id);
  
    if (contact != null && contact.length !== 0) {
      contact = contact[0];
    }
    // add picture if there is none
    contact.profilePicture = {
      url: contact.profilepictureurl
        ? contact.profilepictureurl
        : "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    };
    delete contact.profilepictureurl;

    return contact;
  }

  public async readMessage(messageId: number, receiverId: number) {
    readMessage(messageId, receiverId);
  }
}
