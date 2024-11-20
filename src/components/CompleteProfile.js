import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveProfileDetails, fetchStudentProfile } from '../api';
import ProfileForm from '../components/ProfileForm';

const CompleteProfile = () => {
    const [studentData, setStudentData] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const { srn } = useParams();
    const navigate = useNavigate();

    // Fetch student profile when the component is mounted
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchStudentProfile(srn);
                setStudentData(data);

                // Assuming profile data is part of the student data
                setProfileData(data.profile); // Adjust if your data structure differs
            } catch (error) {
                console.error('Error fetching student profile:', error);
            }
        };

        fetchProfile();
    }, [srn]);

    // Save the updated profile data
    const handleSaveProfile = async (profileData) => {
        try {
            await saveProfileDetails(profileData);
            navigate(`/student`); // Redirect back to the student page after profile is saved
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    if (!studentData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Complete Your Profile</h1>
            <ProfileForm 
                onSave={handleSaveProfile} 
                initialData={profileData} 
            />
        </div>
    );
};

export default CompleteProfile;
