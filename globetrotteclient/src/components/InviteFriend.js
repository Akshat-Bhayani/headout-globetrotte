import React from 'react';

const InviteFriend = ({ friendUser, setFriendUser, shareInvite }) => {
    return (
        <div className='inviteFriend'>
            <div className='inviteFriendInput'>
                <input 
                    type='text' 
                    placeholder='Enter unique username' 
                    onChange={(e) => setFriendUser(e.target.value)} 
                    value={friendUser} 
                />
            </div>
            <button onClick={shareInvite}>Invite a friend</button>
        </div>
    );
};

export default InviteFriend; 