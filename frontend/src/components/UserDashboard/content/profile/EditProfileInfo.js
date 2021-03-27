import React from 'react';

const EditProfileInfo = ({disableEdit}) => {
    return (
        <div>
            Edit profile

            <button onClick={() => disableEdit()}>
                Press me
            </button>
        </div>
    );
}
 
export default EditProfileInfo;