export default {
	BASE_URL: buildBaseUrl(),
	JWT_STORAGE_KEY: "packinglist.jwt",
	USER_STORAGE_KEY: "packinglist.user"
}

function buildBaseUrl() {
	return 'http://localhost:8080';
}
