export const HOST = "https://backanimals-production.up.railway.app";

export const header = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};
