import SmsHandler from "@/modules/SmsHandler";

import useSmsPermissions from "./useSmsPermissions";

function useSmsListener() {
  const { hasSmsPermissions, requestSmsPermissions } = useSmsPermissions();
  // useEffect(() => {
  //   // let subscription: any;
  //   async function registerSmsListener() {
  //     try {
  //       console.log("here");
  //       // subscription = SmsListener.addListener((message: any) => {
  //       //   console.info(message);
  //       // });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   if (hasSmsPermissions) {
  //     registerSmsListener();
  //     return () => {
  //       // subscription.remove();
  //     };
  //   }
  // }, [hasSmsPermissions]);

  const fetchAllMessages = async (): Promise<void> => {
    const messages = await SmsHandler.getSmsName("hello");
    console.log(messages);
  };

  return { hasSmsPermissions, requestSmsPermissions, fetchAllMessages };
}

export default useSmsListener;
