import { FALL_BACK_PORT } from '../constant';

export default () => ({
  port: parseInt(process.env.PORT as string, 10) || FALL_BACK_PORT,
  gatewaySecretkeys: {
    ipg: process.env.IPG_NOTIFICATION_SECRET_KEY,
  },
});
