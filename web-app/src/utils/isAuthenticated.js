const isAuthenticated = (bool) => {
	const token = window.localStorage.getItem('jwt.token');
    return (token !== undefined && token !== null);
};

export default isAuthenticated;