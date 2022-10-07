import { useEffect } from "react";

import useSmsPermissions from "./useSmsPermissions";

function useSmsListener() {
  const { hasSmsPermissions, requestSmsPermissions } = useSmsPermissions();
  useEffect(() => {
    // let subscription: any;
    async function registerSmsListener() {
      try {
        console.log("here");
        // subscription = SmsListener.addListener((message: any) => {
        //   console.info(message);
        // });
      } catch (error) {
        console.error(error);
      }
    }
    if (hasSmsPermissions) {
      registerSmsListener();
      return () => {
        // subscription.remove();
      };
    }
  }, [hasSmsPermissions]);
  return { hasSmsPermissions, requestSmsPermissions };
}

export default useSmsListener;
