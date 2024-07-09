import dynamic from "next/dynamic";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const DynamicContextWrapper = dynamic(
  () => import("../context/ContextWrapper"),
  { ssr: false },
);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main>
      <DynamicContextWrapper {...pageProps}>
        <Component {...pageProps} />
      </DynamicContextWrapper>
    </main>
  );
};

export default api.withTRPC(MyApp);
