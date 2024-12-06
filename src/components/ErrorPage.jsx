import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
