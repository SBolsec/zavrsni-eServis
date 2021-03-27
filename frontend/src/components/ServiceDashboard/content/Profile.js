import React, {  useState } from 'react'
import Container from 'react-bootstrap/Container';
import ShowProfileInfo from './profile/ShowProfileInfo';
import EditProfileInfo from './profile/EditProfileInfo';

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);

  const enableEdit = () => {
    setEditProfile(true);
  }

  const disableEdit = () => {
    setEditProfile(false);
  }

  return (
    <Container>
      {!editProfile ? 
        <ShowProfileInfo enableEdit={enableEdit} /> 
        : 
        <EditProfileInfo disableEdit={disableEdit} />}
    </Container>
  );
}
 
export default Profile;