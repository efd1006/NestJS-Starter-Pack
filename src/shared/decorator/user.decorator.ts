import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  console.log(req)
  return data ? req.user[data] : req.user;
});
