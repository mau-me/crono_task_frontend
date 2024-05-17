import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType } from 'react';
import api from '../utils/api';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuth = (props: P) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
            } else {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                api.get('/todos')
                    .then(() => {
                        setLoading(false);
                    })
                    .catch(() => {
                        localStorage.removeItem('token');
                        router.push('/');
                    });
            }
        }, [router]);

        if (loading) {
            return <p>Loading...</p>;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuth;
};

export default withAuth;
