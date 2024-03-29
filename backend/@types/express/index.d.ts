import { User } from "../../src/models";

declare global {
  namespace Express {
    interface Request {
      currentUser: User
    }
  }
}