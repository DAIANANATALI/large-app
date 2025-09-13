/* eslint-disable react/display-name */

export const composeProviders = (...providers: React.ComponentType<{ children: React.ReactNode }>[]) =>
  providers.reduce(
    (AccumulatedProviders, CurrentProvider) =>
      ({ children }: { children: React.ReactNode }) => (
        <AccumulatedProviders>
          <CurrentProvider>{children}</CurrentProvider>
        </AccumulatedProviders>
      ),
    ({ children }: { children: React.ReactNode }) => <>{children}</>
  );
