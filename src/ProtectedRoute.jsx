import { Navigate } from 'react-router-dom';
import { getCookieValue } from './utils/cookiesUtils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { keepLogin } from './store/slices/auth/slices';

export default function ProtectedRoute({ children }) {

	const token = localStorage.getItem('token');

	return token ? children : <Navigate to="/auth/login" replace />;
}
