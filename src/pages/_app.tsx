import { useEffect } from "react";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import GlobalStyles from "@/styles/GlobalStyles";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Function to check if the route is protected
    const isProtectedRoutes = () => {
      const publicPaths = ['/login', '/signup']; // Public paths where authentication is not required
      return !publicPaths.includes(router.pathname);
    };

    

    const handleRouteChange = () => {
      const token = localStorage.getItem('token');
      const isProtectedRoute = ['/login', '/signup'].includes(router.pathname);
      
      // Only redirect if there's no token, it's a protected route, and we're not already on the home page
      if (token && isProtectedRoute) {
        const returnPath = localStorage.getItem('returnPath');

        if (!returnPath && router.asPath! == '/login') {
          localStorage.setItem('returnPath', router.asPath);
        }

        router.push('/home')
      } else if (!token && isProtectedRoutes() && !isProtectedRoute) {
        router.push('/login')
      }
    };

    // Call once on mount and then on every route change
    handleRouteChange();
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
