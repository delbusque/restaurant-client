import { useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../config';

const fetchOrders = () => axios.get(`${baseUrl}/chef/get-orders`)

export const useFetchOrders = () => {
    return useQuery('waiting-orders', fetchOrders,
        {
            select: data => data.data,
            refetchOnWindowFocus: true,
        })
}
