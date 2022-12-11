import { useEffect, useState } from "react";
import {
  PERMISSIONS,
  RESULTS,
  requestMultiple,
  checkMultiple,
  PermissionStatus,
} from "react-native-permissions";

const { READ_SMS, RECEIVE_SMS } = PERMISSIONS.ANDROID;

const checkPermissionState = (
  permissionState: Record<
    typeof READ_SMS | typeof RECEIVE_SMS,
    PermissionStatus
  >
) =>
  permissionState[READ_SMS] === RESULTS.GRANTED &&
  permissionState[RECEIVE_SMS] === RESULTS.GRANTED;

const requestSmsPermissions = async () => {
  try {
    const grantedReadSMS = await requestMultiple([READ_SMS, RECEIVE_SMS]);
    return checkPermissionState(grantedReadSMS);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const checkSmsPermissions = async () => {
  const permissionState = await checkMultiple([READ_SMS, RECEIVE_SMS]);
  const hasPermission = checkPermissionState(permissionState);
  return hasPermission;
};

function useSmsPermissions() {
  const [hasSmsPermissions, toggleSmsPermissions] = useState(false);

  const requestPermissions = async () => {
    if (!hasSmsPermissions) {
      const hasPermission = await requestSmsPermissions();
      toggleSmsPermissions(hasPermission);
    }
  };

  useEffect(() => {
    async function updatePermissions() {
      let hasPermission = await checkSmsPermissions();
      if (!hasPermission) {
        hasPermission = await requestSmsPermissions();
      }
      toggleSmsPermissions(hasPermission);
    }
    updatePermissions();
  }, []);

  return {
    hasSmsPermissions,
    requestSmsPermissions: requestPermissions,
  };
}

export default useSmsPermissions;
