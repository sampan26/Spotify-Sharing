import SpotifyAPI from '../../utils/SpotifyAPI';

export default {
    getPlaylists: async token => {
        try {
            const { data } = await SpotifyAPI.getUserPlaylists(token, 20);

            if (data && data.items[0]) {
                const playlists = [...data.items].map(playlists => {
                    if (!playlists.image[0])
                    playlists.images.push({
                        url: '/images/icons/playlistr-icon.png'
                    });

                    return playlists;
                });

                return playlists;
            } else return [];
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    verifySpotifyActive: async token => {
		try {
			const { data } = await SpotifyAPI.getUserQueueData(token);

			if (data && data.is_playing) return true;
			else return false;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
};