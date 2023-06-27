import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase'; // Assuming you have the necessary Firebase configuration

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isMember, setIsMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDoc = await db.collection('users').doc(userId).get();
        const { member } = userDoc.data();
        setIsMember(member);
      } catch (error) {
        console.log('Error retrieving user membership:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkMembership();
  }, []);

  if (isLoading) {
    // Optional: Render a loading indicator while checking membership
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) => (isMember ? <Component {...props} /> : navigate('/home'))}
    />
  );
};

export default ProtectedRoute;
