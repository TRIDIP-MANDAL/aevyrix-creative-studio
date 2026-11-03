import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { lovable } from '@/integrations/lovable';
import { supabase } from '@/integrations/supabase/client';
import hero from '@/assets/hero-robot.jpg';
import '@lovable.dev/cloud-auth-js/styles.css';

export const Route=createFileRoute('/auth')({head:()=>({meta:[{title:'Admin Sign In — Aevyrix Creation Hub'},{name:'description',content:'Secure access to the Aevyrix agency workspace.'},{property:'og:title',content:'Aevyrix Admin Sign In'},{property:'og:description',content:'Secure agency workspace access.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex'}]}),component:Auth});
function Auth(){
  const navigate=useNavigate();const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  useEffect(()=>{supabase.auth.getUser().then(({data})=>{if(data.user)navigate({to:'/admin'});});},[navigate]);
  async function signIn(provider:'google'|'lovable'){
    setBusy(true);setError('');
    try{const result=await lovable.auth.signInWithOAuth(provider,{redirect_uri:`${window.location.origin}/auth`});if(result.error)throw result.error;if(!result.redirected)await navigate({to:'/admin'});}catch(e){setError(e instanceof Error?e.message:'Sign-in failed. Please try again.');}finally{setBusy(false);}
  }
  return <section className="relative flex min-h-[80svh] items-center overflow-hidden px-5 pb-20 pt-32"><img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20"/><div className="relative mx-auto w-full max-w-md"><ShieldCheck className="h-9 w-9 text-cyan"/><p className="eyebrow mt-5">Agency workspace</p><h1 className="mt-3 text-4xl font-bold">Aevyrix Admin</h1><p className="mt-4 text-muted-foreground">Sign in with your approved administrator account.</p><div className="mt-8 grid gap-3"><Button variant="outline" size="lg" disabled={busy} onClick={()=>signIn('google')}>Sign in with Google</Button><Button className="lovable-auth-button" disabled={busy} onClick={()=>signIn('lovable')}>Sign in with Lovable</Button></div>{error&&<p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}</div></section>;
}