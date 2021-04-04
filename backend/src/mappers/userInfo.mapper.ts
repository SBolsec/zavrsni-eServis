import PictureController from "../controllers/picture.controller";
import { IUserInfo } from "../interfaces";
import { User } from "../models";

export const userToUserInfo = async (user: User): Promise<IUserInfo> => {
  // postavi url do slike profila
  let profilePictureSet = false;
  let profilePictureURL =
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png";
  if (user.profilePictureId) {
    const pictureController = new PictureController();
    const picture = await pictureController.getPicture(
      user.profilePictureId.toString()
    );
    profilePictureSet = true;
    profilePictureURL = picture!.url;
  }

  const payload: IUserInfo = {
    id: user.id,
    roleId: user.roleId,
    email: user.email,
    tokenVersion: user.tokenVersion,
    profilePictureURL,
    profilePictureSet,
  };

  return payload;
};
