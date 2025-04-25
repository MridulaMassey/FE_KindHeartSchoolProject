import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About = () => {
    return(
        
        <div className="min-h-screen bg-white text-gray-800 p-8">
            {/* <Header isLoggedIn={true} userType="student" userName="praftest" /> */}
            <div className="max-w4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>

                <p className="text-lg mb4">
                 Welcome to Kind Hearts Online Learning! Our platform is dedicated to creating an engaging and safe learning environment for children.
                </p>

                <p>
                Our goal is to connect student, teacher and parents through interactive educational tools like assignments, games, chat and performanc tracking.
                </p>

                <p>
                    Thanks for being part of our learning community 💖. 
                </p>
            </div>
        </div>

    )
};

export default About;