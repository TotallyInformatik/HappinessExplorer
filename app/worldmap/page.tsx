import dynamic from 'next/dynamic';

export default function Page() {
  
  // Write code here
  const Map = dynamic(() => import('../../components/Map'), { ssr: false });  
  return <>
    <Map />
  </>
}