import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Domain Search',
    description: 'Find your perfect domain name with our powerful search tool.',
  },
  {
    name: 'Domain Transfer',
    description: 'Transfer your domains to us for better management and pricing.',
  },
  {
    name: 'Domain Privacy',
    description: 'Protect your personal information with our domain privacy service.',
  },
  {
    name: 'Expert Support',
    description: '24/7 support from our team of domain experts.',
  },
];

const testimonials = [
  {
    content: "AZ Technologies has revolutionized how we manage our domains. Their platform is intuitive and their support is outstanding.",
    author: "Sarah Johnson",
    role: "CTO, TechStart Inc."
  },
  {
    content: "The best domain management platform I've ever used. Everything is streamlined and efficient.",
    author: "Michael Chen",
    role: "Founder, Digital Solutions"
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <motion.div
            className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Your Perfect Domain Name
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Secure your online presence with our wide selection of domain names. Easy search, instant registration, and comprehensive management tools.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <div className="flex-1 min-w-0">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="domain"
                    id="domain"
                    className="block w-full rounded-md border-0 py-4 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    placeholder="Search for your domain name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-primary-500 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-500">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Domain Management
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From registration to renewal, we provide all the tools you need to manage your domains effectively.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Testimonial section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-500">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Businesses Worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mt-20 lg:max-w-none lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-between bg-white p-8 shadow-lg ring-1 ring-gray-200 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <blockquote className="text-lg text-gray-900">
                "{testimonial.content}"
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}