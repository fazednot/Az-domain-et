import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Globe, ShoppingCart, CreditCard, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Overview() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [domains, orders] = await Promise.all([
        supabase.from('domains').select('*', { count: 'exact' }),
        supabase.from('orders').select('*', { count: 'exact' }),
      ]);

      return {
        totalDomains: domains.count || 0,
        totalOrders: orders.count || 0,
      };
    },
  });

  const cards = [
    { name: 'Total Domains', value: stats?.totalDomains || 0, icon: Globe },
    { name: 'Active Orders', value: stats?.totalOrders || 0, icon: ShoppingCart },
    { name: 'Monthly Spending', value: '$0.00', icon: CreditCard },
    { name: 'Next Renewal', value: '30 days', icon: Clock },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor your domains and account activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.name}
              className="bg-white overflow-hidden rounded-lg border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {card.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-4 bg-white shadow rounded-lg">
          <div className="p-4 text-sm text-gray-500 text-center">
            No recent activity to display
          </div>
        </div>
      </div>
    </div>
  );
}