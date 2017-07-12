export const isLoading = (state) => state.application.loading;
export const getUser = (state) => state.application.user;
export const isAdmin = (state) => state.application.user && state.application.user.is_admin === 1;
