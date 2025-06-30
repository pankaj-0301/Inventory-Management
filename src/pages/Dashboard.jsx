import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Users, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import api from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, alertsResponse] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/alerts')
      ]);
      setStats(statsResponse.data);
      setLowStockAlerts(alertsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Total Suppliers',
      value: stats?.totalSuppliers || 0,
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Low Stock Alerts',
      value: stats?.lowStockProducts || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Inventory Value',
      value: `$${(stats?.inventoryValue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your inventory management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-3">
            {lowStockAlerts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No low stock alerts</p>
            ) : (
              lowStockAlerts.slice(0, 5).map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock} (Threshold: {product.lowStockThreshold})
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                    Low Stock
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {stats?.recentTransactions?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent transactions</p>
            ) : (
              stats?.recentTransactions?.map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.product?.name}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.type === 'purchase' ? 'Purchase' : 'Sale'} - {transaction.quantity} units
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${transaction.totalValue}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.type === 'purchase' 
                        ? 'text-green-800 bg-green-100' 
                        : 'text-blue-800 bg-blue-100'
                    }`}>
                      {transaction.type === 'purchase' ? (
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="inline h-3 w-3 mr-1 transform rotate-180" />
                      )}
                      {transaction.type}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;