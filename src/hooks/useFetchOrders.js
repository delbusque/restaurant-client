import { useQuery } from 'react-query';
import axios from 'axios';

const fetchOrders = () => axios.get('/chef/get-orders')

export const useFetchOrders = () => {
    return useQuery('waiting-orders', fetchOrders,
        {
            select: data => data.data,
            refetchOnWindowFocus: false,
        })
}
