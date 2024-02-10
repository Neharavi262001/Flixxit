import { fetchContent } from '../utils/tmdb';
import React, { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading('Loading ....');
            setContent(null);
            setError(null);

            try {
                const response = await fetchContent(url);
                setContent(response);
                setLoading(null);
            } catch (err) {
                setError('Something went wrong');
                setLoading(null);
            }
        };

        fetchData();
    }, [url]);

    return { content, error, loading };
};

export default useFetch;
