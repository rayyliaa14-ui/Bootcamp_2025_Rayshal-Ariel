import axios from "./axios";

export const getPopularPhotos = async (page = 1) => {
    const response = await axios.get("/photos", {
        params: {
            page: page,
            per_page: 12,
            order_by: "popular",
        },
    });
    return {
        items: response.data,
        hasMore: response.data.length > 0,
    };
};

export const searchPhotos = async (keyword, page = 1) => {
    const response = await axios.get("/search/photos", {
        params: {
            query: keyword,
            page: page,
            per_page: 12,
        },
    });
    return {
        items: response.data.results,
        hasMore: response.data.results.length > 0,
    };
};
