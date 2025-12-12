import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { getBackdropUrl } from "../../utils/imageUtils";
import { ImageGallery } from "../shared";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SeriesShow = ({ poster }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    const fetchImages = useCallback(async (posterId) => {
        if (!posterId) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${posterId}/images?api_key=${TMDB_API_KEY}`
            );
            if (isMountedRef.current && res.data.backdrops.length > 0) {
                setImages(res.data.backdrops);
                setLoading(true);
            }
        } catch (err) {
            console.error("Error fetching series images:", err);
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
            getImageUrl={getBackdropUrl}
            aspectRatio="16/9"
            itemsPerView={{ 0: 1, 576: 2, 992: 3, 1400: 4 }}
        />
    );
};

export default SeriesShow;
