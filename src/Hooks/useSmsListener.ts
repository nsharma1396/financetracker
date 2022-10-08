import { SmsHandler, addListener } from "@/modules/SmsHandler";
import { useEffect, useRef } from "react";

import useSmsPermissions from "./useSmsPermissions";

function useSmsListener() {
  const { hasSmsPermissions, requestSmsPermissions } = useSmsPermissions();
  const receiverRegistered = useRef(false);

  useEffect(() => {
    if (hasSmsPermissions && !receiverRegistered.current) {
      addListener(console.log.bind(null, "NEW MESSAGE"));
    }
  }, [hasSmsPermissions]);

  const fetchAllMessages = async (): Promise<void> => {
    const messages = await SmsHandler.getAllMessages();
    console.log(messages);
  };

  return { hasSmsPermissions, requestSmsPermissions, fetchAllMessages };
}

export default useSmsListener;
