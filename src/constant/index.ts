export const SUPPORTED_GATEWAY = {
  IPG: 'ipg',
};

export const APP_MSG = {
  UNSUPPORTED_GATEWAY: `We only support the following gateways currently: ${Object.values(SUPPORTED_GATEWAY).toString()}`,
  INVALID_PAYLOAD:
    'Insufficient or malformed payload: check your header and body',
  STRATEGY_NOT_FOUND: "couldn't determine strategy",
};

export const FALL_BACK_PORT = 3000;

export const apiEntryPoint = 'gateway';

export const SECRET_PATHS = {
  IPG: 'gatewaySecretkeys.ipg',
};
