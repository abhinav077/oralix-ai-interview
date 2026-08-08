import arcjet from '@arcjet/next';

export function createRateLimiter({ refillRate, interval, capacity }) {
    return arcjet
        
