function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
