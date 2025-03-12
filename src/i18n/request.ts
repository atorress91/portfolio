import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  // Asegurarnos de que inicie en español si no hay cookie
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value ?? 'es';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'America/Costa_Rica'
  };
});