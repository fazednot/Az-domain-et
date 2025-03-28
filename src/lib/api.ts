import axios from 'axios';
import { supabase } from './supabase';

const CHAPA_API_KEY = import.meta.env.VITE_CHAPA_API_KEY;
const CHAPA_API_URL = 'https://api.chapa.co/v1';

export const api = {
  // Domain operations
  async searchDomain(name: string, extension: string) {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('name', name)
      .eq('extension', extension)
      .single();

    if (error) throw error;
    return data;
  },

  async registerDomain(name: string, extension: string) {
    const { data, error } = await supabase
      .from('domains')
      .insert([{ name, extension }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Cart operations
  async addToCart(domainName: string, extension: string, price: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ domain_name: domainName, extension, price }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Payment operations
  async initiatePayment(amount: number, email: string, reference: string) {
    const response = await axios.post(
      `${CHAPA_API_URL}/transaction/initialize`,
      {
        amount,
        email,
        reference,
        callback_url: `${window.location.origin}/payment/callback`,
      },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_API_KEY}`,
        },
      }
    );
    return response.data;
  },

  // Blog operations
  async getBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Contact form
  async submitContactForm(name: string, email: string, message: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // WHOIS lookup
  async whoisLookup(domain: string) {
    // This would typically call a WHOIS API service
    // For now, we'll return mock data
    return {
      domain,
      registrar: 'Example Registrar',
      createdDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
  },
};