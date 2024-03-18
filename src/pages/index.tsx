import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { push } = router;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) push('home');
    push('login');
  }, [push])
  return;
}
