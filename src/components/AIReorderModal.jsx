import React, { useState } from 'react';
import { X, Brain, Loader } from 'lucide-react';
import api from '../utils/api';

const AIReorderModal = ({ product, onClose }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const response = await api.post('/ai/reorder-suggestions', {
        productId: product._id
      });
      setSuggestion(response.data);
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
      alert('Failed to get AI suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getSuggestion();
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full m-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">AI Reorder Suggestion</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="h-8 w-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Getting AI recommendation...</span>
            </div>
          ) : suggestion ? (
            <div className="space-y-4">
              {/* Product Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{suggestion.product.name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Current Stock:</span>
                    <span className="ml-2 font-medium">{suggestion.product.currentStock}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Threshold:</span>
                    <span className="ml-2 font-medium">{suggestion.product.threshold}</span>
                  </div>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-purple-900">AI Recommendation</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(suggestion.suggestion.urgency)}`}>
                    {suggestion.suggestion.urgency} priority
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-2xl font-bold text-purple-900">
                    {suggestion.suggestion.recommendedQuantity} units
                  </p>
                  <p className="text-sm text-purple-700">Recommended reorder quantity</p>
                </div>

                <div className="text-sm text-purple-800">
                  <p className="font-medium mb-1">Analysis:</p>
                  <p>{suggestion.suggestion.reasoning}</p>
                </div>
              </div>

              {/* Sales Data */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Sales Insights</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <span>Recent Transactions:</span>
                    <span className="ml-2 font-medium">{suggestion.salesData.recentTransactions}</span>
                  </div>
                  <div>
                    <span>Avg Monthly Sales:</span>
                    <span className="ml-2 font-medium">{suggestion.salesData.avgMonthlySales}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    // In a real app, you might want to create a purchase transaction
                    alert(`Consider ordering ${suggestion.suggestion.recommendedQuantity} units of ${product.name}`);
                    onClose();
                  }}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Apply Suggestion
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Failed to get AI suggestion. Please try again.</p>
              <button
                onClick={getSuggestion}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIReorderModal;