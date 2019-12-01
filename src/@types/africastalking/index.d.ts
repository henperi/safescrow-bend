/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'africastalking' {
  function def(data: { apiKey: string; username: string }): Methods;
  namespace def {} // This is a hack to allow ES6 wildcard imports
  export = def;
}

interface AfricaTalking {
  (data: { apiKey: string; username: string }): Methods;
}

interface Methods {
  SMS: SMS;
}

interface SMS {
  send: (data: { to: string[]; from?: string; enque: boolean; message: string }) => Promise<any>;
}
