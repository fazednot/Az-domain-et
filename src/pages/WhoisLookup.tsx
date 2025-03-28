import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { api } from '../lib/api';

const whoisSchema = z.object({
  domain: z.string().min(1, 'Domain name is required'),
});

type WhoisFormData = z.infer<typeof whoisSchema>;

export default function WhoisLookup() {
  const [whoisData, setWhoisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<WhoisFormData>({
    resolver: zodResolver(whoisSchema),
  });

  const onSubmit = async (data: WhoisFormData) => {
    try {
      setIsLoading(true);
      const result = await api.whoisLookup(data.domain);
      setWhoisData(result);
    } catch (error) {
      console.error('WHOIS lookup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            WHOIS Lookup
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Get detailed information about any domain name
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  {...register('domain')}
                  placeholder="Enter domain name (e.g., example.com)"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
                {errors.domain && (
                  <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isLoading ? (
                  'Searching...'
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>

          {whoisData && (
            <motion.div
              className="mt-8 bg-gray-50 rounded-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                WHOIS Results for {whoisData.domain}
              </h2>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Registrar</dt>
                  <dd className="mt-1 text-sm text-gray-900">{whoisData.registrar}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Creation Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(whoisData.createdDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(whoisData.expiryDate).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}