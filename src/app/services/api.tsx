import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://medback.site/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (data: any) => {
  return apiClient.post('/login', data);
};

export const logout = (token: string) => {
  return apiClient.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (data: any, token: string) => {
  return apiClient.post('/admin/create-user', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDashboardSummary = (token: string) => {
  return apiClient.get('/admin/admin-dashboard-summary', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Fertilizer API
export const getFertilizers = (token: string) => {
    return apiClient.get('/admin/fertilizers', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getFertilizerDetails = (id: number, token: string) => {
    return apiClient.get(`/admin/fertilizers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addFertilizer = (data: FormData, token: string) => {
    return apiClient.post('/admin/add-fertilizers', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateFertilizer = (id: number, data: FormData, token: string) => {
    return apiClient.post(`/admin/fertilizers/edit/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteFertilizer = (id: number, token: string) => {
    return apiClient.delete(`/admin/fertilizers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Shop Owner API
export const getShopProfile = (token: string) => {
    return apiClient.get('/shop_owner/shop-profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const setupShopProfile = (data: FormData, token: string) => {
    return apiClient.post('/shop_owner/setup-shop-profile', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const editShopProfile = (data: FormData, token: string) => {
    return apiClient.post('/shop_owner/edit-shop-profile', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getShopDashboardSummary = (token: string) => {
    return apiClient.get('/shop_owner/shop-dashboard-summary', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Shop Inventory API
export const getPlatformFertilizers = () => {
    return apiClient.get('/fertilizers');
};

export const getFertilizerWithShops = (id: number) => {
    return apiClient.get(`/fertilizers/${id}`);
};

export const getShopInventory = (token: string) => {
    return apiClient.get('/shop_owner/inventory', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getShopInventoryItem = (id: number, token: string) => {
    return apiClient.get(`/shop_owner/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addShopInventory = (data: any, token: string) => {
    return apiClient.post('/shop_owner/inventory', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateShopInventory = (id: number, data: any, token: string) => {
    return apiClient.post(`/shop_owner/inventory/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteShopInventory = (id: number, token: string) => {
    return apiClient.delete(`/shop_owner/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Sales API
export const createSale = (data: any, token: string) => {
    return apiClient.post('/shop_owner/sales', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const searchSale = (receiptNo: string, token: string) => {
    return apiClient.get(`/shop_owner/sales/search?receipt_no=${receiptNo}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getSales = (token: string, page: number = 1) => {
    return apiClient.get(`/shop_owner/sales?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Admin Shop Control API
export const getShops = (token: string) => {
    return apiClient.get('/admin/shops', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const toggleShopStatus = (id: number, status: string, token: string) => {
    return apiClient.patch(`/admin/shops/${id}/toggle-status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Reports API
export const getFertilizerStockSummary = (token: string) => {
    return apiClient.get('/admin/report-fertilizer-stock-summary', {
        headers: { Authorization: `Bearer ${token}` },
    });
};


export default apiClient;
