import React, { useEffect, useState } from 'react';
import { fetchAlumniProfiles } from '../api'; // Assuming you already have this API call
import '../style/ConnectionsPage.css';

const ConnectionsPage = () => {
    const [alumniList, setAlumniList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the alumni profiles
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const alumni = await fetchAlumniProfiles();
                setAlumniList(alumni);
            } catch (error) {
                console.error('Error fetching alumni profiles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="connections-page">
            <h2>Alumni Connections</h2>
            <div className="connections-list">
                {alumniList.length === 0 ? (
                    <p>No alumni profiles available. Please check back later.</p>
                ) : (
                    alumniList.map((alumnus, index) => (
                        <div className="alumni-profile" key={index}>
                            <div className="alumni-info">
                                <h3>{alumnus.A_Name}</h3>
                                <p><strong>Company:</strong> {alumnus.company}</p>
                                <p><strong>Job Role:</strong> {alumnus.Jobrole}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConnectionsPage;
