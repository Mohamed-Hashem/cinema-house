import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { getProfileUrl } from "../../utils/imageUtils";
import { ImageGallery } from "../shared";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const ActorShow = ({ poster }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    const fetchImages = useCallback(async (posterId) => {
        if (!posterId) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/person/${posterId}/images?api_key=${TMDB_API_KEY}`
            );
            if (isMountedRef.current && res.data.profiles.length > 0) {
                setLoading(true);
                setImages(res.data.profiles);
            }
        } catch (err) {
            console.error("Error fetching actor images:", err);
            if (isMountedRef.current) {
                setImages([]);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        fetchImages(poster?.id);

        return () => {
            isMountedRef.current = false;
        };
    }, [poster?.id, fetchImages]);

    if (!poster?.id || !loading || !images?.length) return null;

    return (
        <ImageGallery
            images={images}
            title={poster.name || poster.title}
            getImageUrl={getProfileUrl}
            aspectRatio="2/3"
            itemsPerView={{ 0: 2, 576: 3, 992: 4, 1400: 5 }}
        />
    );
};

export default ActorShow;
