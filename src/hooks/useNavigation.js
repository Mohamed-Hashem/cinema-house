import { useCallback, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { generatePath } from "../utils/routes";

const useNavigation = () => {
    const history = useHistory();
    const location = useLocation();
    const isNavigatingRef = useRef(false);
    const lastNavigationRef = useRef(0);

    const navigate = useCallback(
        (path, state = null, options = {}) => {
            const now = Date.now();
            const minInterval = options.minInterval || 300;

            if (isNavigatingRef.current || now - lastNavigationRef.current < minInterval) {
                return false;
            }

            if (location.pathname === path) {
                return false;
            }

            isNavigatingRef.current = true;
            lastNavigationRef.current = now;

            if (options.scrollToTop !== false) {
                window.scrollTo({ top: 0, behavior: "instant" });
            }

            if (options.replace) {
                history.replace(path, state);
            } else {
                history.push(path, state);
            }

            requestAnimationFrame(() => {
                isNavigatingRef.current = false;
            });

            return true;
        },
        [history, location.pathname]
    );

    // Convenience methods for common navigation patterns
    const goToMovie = useCallback(
        (movie) => {
            const path = generatePath.movie(movie.id);
            return navigate(path, movie);
        },
        [navigate]
    );

    const goToSeries = useCallback(
        (series) => {
            const path = generatePath.series(series.id);
            return navigate(path, series);
        },
        [navigate]
    );

    const goToActor = useCallback(
        (actor) => {
            const path = generatePath.actor(actor.id);
            return navigate(path, actor);
        },
        [navigate]
    );

    const goToSeason = useCallback(
        (seriesId, season) => {
            const path = generatePath.season(seriesId, season.season_number);
            return navigate(path, { id: seriesId, season_number: season.season_number });
        },
        [navigate]
    );

    const goToEpisode = useCallback(
        (seriesId, seasonNumber, episode) => {
            const path = generatePath.episode(seriesId, seasonNumber, episode.episode_number);
            return navigate(path, {
                ...episode,
                seriesId,
                seasonNumber,
            });
        },
        [navigate]
    );

    const goBack = useCallback(() => {
        history.goBack();
    }, [history]);

    const goHome = useCallback(() => {
        navigate("/home");
    }, [navigate]);

    return {
        navigate,
        goBack,
        goHome,
        goToMovie,
        goToSeries,
        goToActor,
        goToSeason,
        goToEpisode,
        location,
        history,
    };
};

export default useNavigation;
