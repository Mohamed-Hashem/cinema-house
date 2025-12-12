import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosters } from "./../../Redux/Actions/Actions";
import { getBackdropUrl } from "../../utils/imageUtils";
import { ImageGallery } from "../shared";

const MovieShow = ({ poster }) => {
    const dispatch = useDispatch();
    const allPosters = useSelector((state) => state.posters);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (poster?.id) {
            dispatch(fetchPosters("movie", poster.id, "images"));
            setLoading(true);
        }

        return () => {
            setLoading(false);
        };
    }, [poster?.id, dispatch]);

    if (!poster?.id || !loading || !allPosters?.length) return null;

    return (
        <ImageGallery
            images={allPosters}
            title={poster.name || poster.title}
            getImageUrl={getBackdropUrl}
            aspectRatio="16/9"
            itemsPerView={{ 0: 1, 576: 2, 992: 3, 1400: 4 }}
        />
    );
};

export default MovieShow;
