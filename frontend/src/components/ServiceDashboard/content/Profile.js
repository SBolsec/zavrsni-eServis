import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import ShowProfileInfo from './profile/ShowProfileInfo';
import EditProfileInfo from './profile/EditProfileInfo';
import AddFaultCategories from './profile/AddFaultCategories';
import { Grid } from '@material-ui/core';

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);

  const enableEdit = () => {
    setEditProfile(true);
  }

  const disableEdit = () => {
    setEditProfile(false);
  }

  return (
    <Container fluid>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          {!editProfile ?
            <ShowProfileInfo enableEdit={enableEdit} />
            :
            <EditProfileInfo disableEdit={disableEdit} />}
        </Grid>
        <Grid item xs={12} md={6}>
          <AddFaultCategories />
        </Grid>
      </Grid>
          
        

          
    </Container>
  );
}

export default Profile;